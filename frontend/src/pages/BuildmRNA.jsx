import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Heading from "../ui/Heading";
import React from "react";
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  Position,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import Select from "../ui/Select";
import RadioGroup from "../ui/RadioGroup";
import Button from "../ui/Button";
import { useMRNASequence } from "../contexts/MRNAsequenceContext";
import toast from "react-hot-toast";
import { useMRNAfeatures } from "../contexts/MRNAfeaturesContext";

const vaccineComponents = {
  MHCI: {
    signalPeptides: [
      // MHC-I typically doesn't use signal peptides
    ],
    spacers: [
      { label: "AAY spacer", value: "AAY" },
      { label: "KK spacer", value: "KK" },
    ],
    adjuvants: [
      { label: "PADRE", value: "AKFVAAWTLKAAA" },
      { label: "RS09", value: "APPHALS" },
      { label: "HBHA", value: "PEQPRPLVVGV" },
    ],
  },
  MHCII: {
    signalPeptides: [
      {
        label: "Tissue Plasminogen Activator (tPA)",
        value: "MDAMKRGLCCVLLLCGAVFVSPS",
      },
      { label: "Interleukin-2 (IL-2)", value: "MYRMQLLSCIALSLALVTNS" },
      { label: "GM-CSF", value: "MPSSWLLLVLALLALWGPGPG" },
    ],
    spacers: [
      { label: "GPGPG spacer", value: "GPGPG" },
      { label: "GGGS spacer", value: "GGGS" },
      { label: "EAAAK spacer", value: "EAAAK" },
    ],
    adjuvants: [
      { label: "PADRE", value: "AKFVAAWTLKAAA" },
      { label: "RS09", value: "APPHALS" },
      { label: "HBHA", value: "PEQPRPLVVGV" },
      { label: "L7/L12 Ribosomal Protein", value: "MIKKIAPQFYIKKAN" },
      { label: "HBV core antigen", value: "STLPETTVVRRRDRGR" },
    ],
  },
};
const initialNodes = [
  {
    id: "signal",
    data: { label: "Signal" },
    position: { x: 0, y: 0 },
    draggable: true,
    sourcePosition: Position.Right,
  },
  {
    id: "adjuvant",
    data: { label: "Adjuvant" },
    position: { x: 0, y: 100 },
    draggable: true,
    sourcePosition: Position.Right,
  },
  {
    id: "spacer",
    data: { label: "Spacer" },
    position: { x: 0, y: 200 },
    draggable: true,
    sourcePosition: Position.Right,
  },
  {
    id: "epitope",
    data: { label: "Epitope" },
    position: { x: 0, y: 300 },
    draggable: true,
    sourcePosition: Position.Right,
  },

  {
    id: "antigen",
    data: { label: "Antigen" },
    position: { x: 200, y: 150 },
    draggable: true,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },

  {
    id: "cap",
    data: { label: "Cap" },
    position: { x: 400, y: 40 },
    draggable: true,
    sourcePosition: Position.Right,
  },
  {
    id: "utr",
    data: { label: "5'UTR" },
    position: { x: 400, y: 100 },
    draggable: true,
    sourcePosition: Position.Right,
  },
  {
    id: "kozak",
    data: { label: "Kozak" },
    position: { x: 400, y: 190 },
    draggable: true,
    sourcePosition: Position.Right,
  },
  {
    id: "stop",
    data: { label: "Stop Codon" },
    position: { x: 400, y: 260 },
    draggable: true,
    sourcePosition: Position.Right,
  },
  {
    id: "polyA",
    data: { label: "PolyA" },
    position: { x: 400, y: 330 },
    draggable: true,
    sourcePosition: Position.Right,
  },

  {
    id: "translated",
    data: { label: "Secondary Transcript" },
    position: { x: 600, y: 150 },
    draggable: true,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "mrna",
    data: { label: "mRNA" },
    position: { x: 800, y: 150 },
    draggable: true,
    targetPosition: Position.Left,
  },
];

const initialEdges = [
  {
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
    id: "e1",
    source: "signal",
    target: "antigen",
  },
  {
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
    id: "e2",
    source: "adjuvant",
    target: "antigen",
  },
  {
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
    id: "e3",
    source: "spacer",
    target: "antigen",
  },
  {
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
    id: "e4",
    source: "epitope",
    target: "antigen",
  },
  {
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
    id: "e5",
    source: "antigen",
    target: "translated",
  },
  {
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
    id: "e6",
    source: "cap",
    target: "translated",
  },
  {
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
    id: "e7",
    source: "utr",
    target: "translated",
  },
  {
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
    id: "e8",
    source: "kozak",
    target: "translated",
  },
  {
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
    id: "e9",
    source: "stop",
    target: "translated",
  },
  {
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
    id: "e10",
    source: "polyA",
    target: "translated",
  },
  {
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
    id: "e11",
    source: "translated",
    target: "mrna",
  },
];

const StyledDiv = styled.div`
  padding: 0rem 2.4rem 6.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledAntigenBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AnitgenItem = styled.div`
  background-color: var(--color-grey-100);
  padding: 2rem 4rem;

  border-radius: 10px;
  box-shadow: var(--shadow-lg);
`;

function BuildmRNA() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const epitopes = queryParams.get("epitope");
  const type = queryParams.get("type");
  const combination = vaccineComponents[type];
  const {
    spacer,
    setSpacer,
    adjuvant,
    setAdjuvant,
    signal,
    setSignal,
    antigen,
    setAntigen,
    setEpitopeSeq,
    setEpitopeType,
  } = useMRNAfeatures();
  const [nodes, setNodes] = React.useState(initialNodes);
  const [edges, setEdges] = React.useState(initialEdges);

  const { setMRNAsequence } = useMRNASequence();
  const navigate = useNavigate();

  function handleSubmit(seq) {
    if (seq) {
      console.log(`Antigen Sequence ${seq}`);
      setMRNAsequence(seq);
      setEpitopeSeq(epitopes);
      setEpitopeType(type);
      navigate("/results");
    } else {
      toast.error("Error in building mRNA");
    }
  }

  function construct() {
    let antigenSequence = signal ? signal : "";
    if (Array.isArray(epitopes)) {
      epitopes.forEach((epitope, i) => {
        antigenSequence += epitope;
        if (i < epitopes.length - 1) antigenSequence += spacer; // Add spacer only between epitopes
      });
    } else {
      antigenSequence += epitopes; // Single epitope, no spacer needed
    }

    if (adjuvant) antigenSequence += adjuvant;

    setAntigen(antigenSequence);
  }

  const onNodesChange = React.useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = React.useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <StyledDiv>
      <Heading as="h1" className="text-center">
        Construct mRNA
      </Heading>
      <div style={{ width: "100%", height: "500px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div>
        On this page, you'll use the epitope sequence along with your selected
        adjuvants, spacers, and signal peptides to create the final antigen
        sequence. You can choose from a variety of adjuvants and spacers to
        enhance the immune response, while the signal peptide helps guide the
        antigen into the appropriate cellular compartments. Once these
        components are selected, the platform will generate the antigen
        sequence, which is a crucial step in the mRNA vaccine design process.
      </div>

      <Heading as="h2">Construct Antigen Sequence</Heading>

      <StyledAntigenBox>
        <AnitgenItem>
          <h3 className="text-center text-3xl mb-8">
            <strong>Spacer</strong>
          </h3>
          <RadioGroup
            name="spacer"
            options={combination["spacers"]}
            value={spacer}
            onChange={(e) => setSpacer(e.target.value)}
          />
        </AnitgenItem>
        <AnitgenItem>
          <h3 className="text-center text-3xl mb-8">
            <strong>Adjuvant</strong>
          </h3>
          <RadioGroup
            name="adjuvant"
            options={combination["adjuvants"]}
            value={adjuvant}
            onChange={(e) => setAdjuvant(e.target.value)}
          />
        </AnitgenItem>
        <AnitgenItem>
          <h3 className="text-center text-3xl mb-8">
            <strong>Signal Peptide</strong>
          </h3>
          {combination["signalPeptides"].length === 0 ? (
            <p>No signal peptides for {type}</p>
          ) : (
            <RadioGroup
              name="signal"
              options={combination["signalPeptides"]}
              value={signal}
              onChange={(e) => setSignal(e.target.value)}
            />
          )}
        </AnitgenItem>
        <AnitgenItem>
          <h3 className="text-center text-3xl mb-8">
            <strong>Epitope</strong>
          </h3>
          <div>
            <div className="text-center">
              <strong>{epitopes}</strong>
            </div>
          </div>
        </AnitgenItem>
      </StyledAntigenBox>

      {antigen && (
        <div className="text-center my-10">
          <p>
            <strong>{antigen}</strong>
          </p>
        </div>
      )}

      <div className="flex gap-4 w-full">
        <Button
          size="medium"
          variation="primary"
          onClick={() => construct()}
          className={antigen ? "flex-1" : "w-full"}
        >
          Generate Antigen Sequence
        </Button>
        {antigen && (
          <Button
            size="medium"
            variation="primary"
            className="flex-1"
            onClick={() => handleSubmit(antigen)}
          >
            Generate mRNA sequence
          </Button>
        )}
      </div>
    </StyledDiv>
  );
}

export default BuildmRNA;
