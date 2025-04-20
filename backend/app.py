from flask import Flask, request, jsonify
from flask_cors import CORS 
from Bio import SeqIO
from io import StringIO
import requests

app = Flask(__name__)
CORS(app)

@app.route("/api/predict", methods=['POST'])
def predict():
    try:
        data = request.json
        sequence_fasta = data.get('sequence')
        
        if not sequence_fasta:
            return jsonify({'error': 'Missing protein sequence'}), 400

        print(f"Data received: {sequence_fasta}")

        
        fasta_io = StringIO(sequence_fasta)
        record = SeqIO.read(fasta_io, "fasta")
        sequence = str(record.seq)  

        
        if not sequence:
            return jsonify({'error': 'Failed to extract protein sequence from FASTA'}), 400

        print(f"FASTA Sequence {sequence}")

        # Default values for MHC prediction
        length = 9  # Most common for MHC-I
        mhci_allele = "HLA-A*02:01"
        mhcii_allele = "HLA-DRB1*07:01"

        # payload for MHC-I and MHC-II prediction 
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
