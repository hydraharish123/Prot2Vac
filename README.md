# 🧬 Prot2Vac: mRNA Vaccine Design from Human Protein Sequences
![Stars](https://img.shields.io/github/stars/hydraharish123/prot2vac?style=social)
![Forks](https://img.shields.io/github/forks/hydraharish123/prot2vac?style=social)
![Issues](https://img.shields.io/github/issues/hydraharish123/prot2vac)
![License](https://img.shields.io/github/license/hydraharish123/prot2vac)

**Prot2Vac** is an intelligent, end-to-end pipeline for designing personalized mRNA vaccines from any human protein sequence. It integrates advanced epitope prediction, codon optimization, and RNA secondary structure modeling to generate a complete, translatable mRNA vaccine candidate with key regulatory and immunological elements.

## Introduction

**Prot2Vac** bridges the gap between *in silico* immunology and synthetic vaccine development. Starting from a raw human protein sequence, it predicts immunodominant epitopes, constructs an mRNA sequence with optional signal peptides, spacers, and adjuvants, and outputs a final vaccine-ready transcript complete with UTRs, poly(A) tail, and secondary structure.

Built for rapid prototyping, Prot2Vac leverages trusted tools like IEDB’s API, Kazusa codon usage tables, and RNAfold — making it a powerful tool for vaccine researchers and developers.

## Key Features

- ✅ Predicts **MHC-I** and **MHC-II** epitopes using **pretrained IEDB deep learning models**  
- ✅ Supports **allele-specific** predictions (e.g., `HLA-A*02:01`, `HLA-DRB1*07:01`)  
- ✅ Ranks predicted epitopes by **IC50** and **percentile** values  
- ✅ Offers customization with **signal peptides**, **spacers**, and **adjuvants**  
- ✅ Appends essential **mRNA elements**: 5′ cap, 5′ UTR, Kozak sequence, 3′ UTR, poly(A) tail  
- ✅ Performs **reverse translation & codon optimization** using Kazusa tables  
- ✅ Predicts **mRNA secondary structure** and **MFE** via RNAfold  
- ✅ Outputs **full sequence summary**, dot-bracket notation, and structural visualization  

## Pipeline Overview





## 🖼️ Visuals 

1. **Prot2Vac Architecture**  
   High-level pipeline from protein to mRNA vaccine.

2. **Epitope Prediction Output**  
   Ranked MHC-I / MHC-II epitope table with IC50 and percentile.

3. **mRNA Construct Layout**  
   Labeled schematic of full mRNA transcript: cap, UTRs, spacers, epitopes, etc.

4. **RNA Secondary Structure**  
   Dot-bracket plot and folding energy.

## Technologies Used

- Python
- IEDB Tools API — MHC epitope prediction
- Kazusa Codon Usage — Reverse translation & optimization
- ViennaRNA RNAfold — RNA secondary structure prediction
- Flask for backend API and React frontend

## 📥 Input Requirements

- ✅ A protein sequence (FASTA or plain string)
- ✅ User-selected:
  - MHC Class I allele (e.g., HLA-A*02:01)
  - MHC Class II allele (e.g., HLA-DRB1*07:01)
- ✅ Optional:
  - Signal peptide (e.g., tissue-specific)
  - Adjuvants (e.g., defensins)
  - Spacers (e.g., GPGPG)

## 📤 Output

- ✅ Codon-optimized mRNA vaccine sequence
- ✅ RNA secondary structure in dot-bracket notation
- ✅ Minimum Free Energy (MFE) of the folded RNA
- ✅ Output summary:
  - Selected epitopes and MHC alleles
  - Regulatory and immunological components used
  - Full final sequence with annotations

> **Final mRNA Vaccine Construct**  
> m7G GGGAAAUUUCUUAUUGCAGCCGCCAC GCCACCAUGG [Signal] [Adjuvant] [Spacer] [Epitope] ... UAA UUAUUUUAUUAAGCUAUAAA [Poly(A)]  
> 
> MFE: -33.45 kcal/mol  
> Dot-Bracket: (((..((....))...)))...


## 🔭 Future Work

- Support multiple epitopes across alleles
- Add B-cell epitope prediction (linear & conformational)
- Add antigenicity, allergenicity, and toxicity prediction
- Allow codon optimization for other host organisms (e.g., E. coli, mouse)

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

## 🙌 Acknowledgments

- IEDB Analysis Resource – http://tools.iedb.org/
- ViennaRNA Package – https://www.tbi.univie.ac.at/RNA/
- Kazusa Codon Usage Database – https://www.kazusa.or.jp/codon/
