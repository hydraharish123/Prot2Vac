from flask import Flask, request, jsonify
from flask_cors import CORS 
from Bio import SeqIO
from io import StringIO, BytesIO
import requests
import subprocess
import os
import base64
from dnachisel import DnaOptimizationProblem, reverse_translate
from dnachisel.builtin_specifications import MaximizeCAI
from Bio.Data import CodonTable
from collections import defaultdict
import re
import cairosvg

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def reverse_translate_protein(seq):
    kazusa_data = """
    UUU 17.6  UCU 15.2  UAU 12.2  UGU 10.6
    UUC 20.3  UCC 17.7  UAC 15.3  UGC 12.6
    UUA 7.7   UCA 12.2  UAA 1.0   UGA 1.6
    UUG 12.9  UCG 4.4   UAG 0.8   UGG 13.2

    CUU 13.2  CCU 17.5  CAU 10.9  CGU 4.5
    CUC 19.6  CCC 19.8  CAC 15.1  CGC 10.4
    CUA 7.2   CCA 16.9  CAA 12.3  CGA 6.2
    CUG 39.6  CCG 6.9   CAG 34.2  CGG 11.4

    AUU 16.0  ACU 13.1  AAU 17.0  AGU 12.1
    AUC 20.8  ACC 18.9  AAC 19.1  AGC 19.5
    AUA 7.5   ACA 15.1  AAA 24.4  AGA 12.2
    AUG 22.0  ACG 6.1   AAG 31.9  AGG 12.0

    GUU 11.0  GCU 18.4  GAU 21.8  GGU 10.8
    GUC 14.5  GCC 27.7  GAC 25.1  GGC 22.2
    GUA 7.1   GCA 15.8  GAA 29.0  GGA 16.5
    GUG 28.1  GCG 7.4   GAG 39.6  GGG 16.5
    """
    standard_table = CodonTable.unambiguous_rna_by_name["Standard"]
    codon_usage_table = defaultdict(dict)
    for line in kazusa_data.strip().splitlines():
        matches = re.findall(r'([AUCG]{3})\s+([\d.]+)', line)
        for rna_codon, freq in matches:
            dna_codon = rna_codon.replace("U", "T")
            aa = standard_table.forward_table.get(rna_codon, "*")
            codon_usage_table[aa][dna_codon] = float(freq)
    protein_seq = seq
    initial_dna = reverse_translate(protein_seq)
    problem = DnaOptimizationProblem(
        sequence=initial_dna,
        constraints=[],
        objectives=[MaximizeCAI(codon_usage_table=codon_usage_table)]
    )
    problem.optimize()
    optimized_dna = problem.sequence
    optimized_mrna = optimized_dna.replace("T", "U")
    return optimized_mrna

def addMRNAelements(orf):
    cap = "m7G"
    fiveUTR = "GGGAAAUUUCUUAUUGCAGCCGCCAC"
    kozakSequence = "GCCACCAUGG"
    threeUTR = "UUAUUUUAUUAAGCUAUAAA"
    polyATail = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    stopCodon = "UAA"
    final_rna = ""
    final_rna += cap + fiveUTR + kozakSequence + orf + stopCodon + threeUTR + polyATail
    return final_rna

def windows_to_wsl_path(windows_path):
    abs_path = os.path.abspath(windows_path)
    drive, path = os.path.splitdrive(abs_path)
    if not drive:
        raise ValueError(f"Invalid Windows path: {windows_path}")
    drive_letter = drive[0].lower()
    wsl_drive = f"/mnt/{drive_letter}"
    unix_style_path = path.replace('\\', '/')
    return f"{wsl_drive}{unix_style_path}"

@app.route('/api/rnafold', methods=['POST'])
def fold():
    sequence = request.json.get('sequence')
    if not sequence:
        return jsonify({'error': 'No sequence provided'}), 400

    try:
        orf_mrna = reverse_translate_protein(sequence)
        final_mrna = addMRNAelements(orf_mrna)

        upload_dir = os.path.abspath(app.config['UPLOAD_FOLDER'])
        os.makedirs(upload_dir, exist_ok=True)

        # Save input sequence
        input_path = os.path.join(upload_dir, 'input.seq')
        with open(input_path, "w") as f:
            f.write(final_mrna)

        # Run RNAfold
        rnafold_result = subprocess.run(
            ['wsl', 'RNAfold', '--noPS'],
            input=final_mrna.encode(),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            cwd=upload_dir
        )

        if rnafold_result.returncode != 0:
            return jsonify({
                'error': f"RNAfold failed: {rnafold_result.stderr.decode()}"
            }), 500

        # Parse RNAfold output
        lines = rnafold_result.stdout.decode().strip().split('\n')
        if len(lines) < 2:
            return jsonify({'error': 'Invalid RNAfold output'}), 500

        structure_line = lines[1]
        structure, mfe = structure_line.split(' (')
        mfe = mfe.replace(')', '').strip()

        # Save sequence + structure for RNAplot
        fold_path = os.path.join(upload_dir, 'rna.fold')
        with open(fold_path, 'w') as f:
            f.write(f"{final_mrna}\n{structure}")

        # Generate RNA structure visualization (SVG)
        rnaplot_result = subprocess.run(
            ['wsl', 'RNAplot', '-o', 'svg', '-i', 'rna.fold'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            cwd=upload_dir
        )

        if rnaplot_result.returncode != 0:
            return jsonify({
                'error': f"RNAplot failed: {rnaplot_result.stderr.decode()}"
            }), 500

        # Read the SVG file
        svg_path = os.path.join(upload_dir, 'rna.svg')
        print(f"SVG PATH: {svg_path}")
        if not os.path.exists(svg_path):
            return jsonify({'error': 'RNAplot did not generate SVG file'}), 500

        with open(svg_path, "r", encoding="utf-8") as svg_file:
            svg_content = svg_file.read()

        # Convert SVG to PNG using CairoSVG
        png_io = BytesIO()
        cairosvg.svg2png(bytestring=svg_content.encode("utf-8"), write_to=png_io)
        png_io.seek(0)
        encoded_img = base64.b64encode(png_io.read()).decode('utf-8')

        return jsonify({
            'sequence': final_mrna,
            'structure': structure.strip(),
            'mfe': mfe,
            'image_base64': encoded_img
        })

    except Exception as e:
        app.logger.error(f"Error in fold endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route("/api/predict", methods=['POST'])
def predict():
    try:
        data = request.json
        sequence_fasta = data.get('sequence')
        if not sequence_fasta:
            return jsonify({'error': 'Missing protein sequence'}), 400
        fasta_io = StringIO(sequence_fasta)
        record = SeqIO.read(fasta_io, "fasta")
        sequence = str(record.seq)  
        if not sequence:
            return jsonify({'error': 'Failed to extract protein sequence from FASTA'}), 400
        length = 9  # Most common for MHC-I
        mhci_allele = "HLA-A*02:01"
        mhcii_allele = "HLA-DRB1*07:01"
        mhci_payload = {
            'method': 'netmhcpan-4.0',
            'sequence_text': sequence,
            'allele': mhci_allele,
            'length': length
        }
        mhcii_payload = {
            'method': 'nn_align',
            'sequence_text': sequence,
            'allele': mhcii_allele
        }
        mhci_response = requests.post("http://tools-cluster-interface.iedb.org/tools_api/mhci/", data=mhci_payload)
        mhcii_response = requests.post("http://tools-cluster-interface.iedb.org/tools_api/mhcii/", data=mhcii_payload)
        if mhci_response.status_code != 200:
            return jsonify({'error': 'MHC-I prediction failed', 'status_code': mhci_response.status_code}), 500
        if mhcii_response.status_code != 200:
            return jsonify({'error': 'MHC-II prediction failed', 'status_code': mhcii_response.status_code}), 500
        return jsonify({
            'mhci': {
                'status': mhci_response.status_code,
                'result': mhci_response.text
            },
            'mhcii': {
                'status': mhcii_response.status_code,
                'result': mhcii_response.text
            }
        })
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Request error: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
