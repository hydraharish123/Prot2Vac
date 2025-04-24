import styled from "styled-components";
import Textarea from "../ui/Textarea";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { useSequence } from "../contexts/SequenceContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0rem 2.4rem 0rem;
`;

const StyledP = styled.p`
  font-size: 1.4rem;
`;

function Upload() {
  const navigate = useNavigate();
  const { setSequence } = useSequence();
  const [uploadData, setUploadData] = useState("");

  function handleUpload() {
    if (uploadData.trim()) {
      setSequence(uploadData);
      console.log(uploadData);
      navigate("/predict-epitope");
    } else {
      toast.error("Please paste a FASTA sequence");
    }
  }
  return (
    <StyledDiv>
      <Heading as="h2">Paste FASTA Sequence or Upload file</Heading>

      <StyledP>
        Our platform supports the upload of FASTA files for sequence analysis,
        allowing you to perform tasks such as epitope prediction, codon
        optimization, and mRNA vaccine design. To get started, either paste your
        FASTA sequence directly into the text box below or upload a FASTA file
        from your computer.
      </StyledP>

      <Textarea
        value={uploadData}
        onChange={(e) => setUploadData(e.target.value)}
        placeholder=">sp|P53601|A4_MACFA Amyloid-beta precursor protein OS=Macaca fascicularis OX=9541 GN=APP PE=2 SV=3
MLPGLALLLLAAWTARALEVPTDGNAGLLAEPQIAMFCGRLNMHMNVQNGKWDSDPSGTKTCIDTKEGILQYCQEVYPELQITNVVEANQPVTIQNWCKRGRKQCKTHPHFVIPYRCLVGEFVSDALLVPDKCKFLHQERMDVCETHLHWHTVAKETCSEKSTNLHDYGMLLPCGIDKFRGVEFVCCPLAEESDNVDSADAEEDDSDVWWGGADTDYADGSEDKVVEVAEEEEVAEVEEEEADDDEDDEDGDEVEEEAEEPYEEATERTTSIATTTTTTTESVEEVVREVCSEQAETGPCRAMISRWYFDVTEGKCAPFFYGGCGGNRNNFDTEEYCMAVCGSVMSQSLRKTTREPLTRDPVKLPTTAASTPDAVDKYLETPGDENEHAHFQKAKERLEAKHRERMSQVMREWEEAERQAKNLPKADKKAVIQHFQEKVESLEQEAANERQQLVETHMARVEAMLNDRRRLALENYITALQAVPPRPRHVFNMLKKYVRAEQKDRQHTLKHFEHVRMVDPKKAAQIRSQVMTHLRVIYERMNQSLSLLYNVPAVAEEIQDEVDELLQKEQNYSDDVLANMISEPRISYGNDALMPSLTETKTTVELLPVNGEFSLDDLQPWHSFGADSVPANTENEVEPVDARPAADRGLTTRPGSGLTNIKTEEISEVKMDAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVVIATVIVITLVMLKKKQYTSIHHGVVEVDAAVTPEERHLSKMQQNGYENPTYKFFEQMQN"
      />

      <Button size="medium" variation="primary" onClick={handleUpload}>
        Predict Epitopes
      </Button>
    </StyledDiv>
  );
}

export default Upload;
