import Heading from "../ui/Heading";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  Position,
  MarkerType,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  gap: 1.5rem;
`;

const initialNodes = [
  {
    id: "1",
    data: { label: "Protein sequence" },
    position: { x: 100, y: 110 },
    sourcePosition: Position.Right,
  },
  {
    id: "2",
    data: { label: "Epitope Prediction\nMHC-I & MHC-II" },
    position: { x: 350, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "3",
    data: { label: "Reverse Translation\n+ Codon Optimization" },
    position: { x: 550, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "4",
    data: { label: "mRNA Construction\nUTRs, Linkers, Poly-A" },
    position: { x: 750, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "5",
    data: { label: "RNAfold Prediction\nStructure" },
    position: { x: 950, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "6",
    data: { label: "Final Output\nSequence, Structure, Download" },
    position: { x: 1200, y: 100 },
    targetPosition: Position.Left,
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
  },
];

function HomePage() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const navigate = useNavigate();
  return (
    <StyledDiv>
      <Heading as="h1" className="text-center">
        An automated pipeline to design mRNA vaccine
      </Heading>
      <div class="max-w-screen-2xl mx-auto p-6">
        <p className="mb-4">
          Messenger RNA (mRNA) vaccines have revolutionized modern immunization
          strategies by providing a fast, flexible, and highly effective
          approach to disease prevention. Unlike traditional vaccines, which
          often rely on weakened or inactivated pathogens, mRNA vaccines work by
          delivering synthetic messenger RNA that encodes a viral antigen,
          prompting the body’s immune system to recognize and respond to the
          real pathogen. Their rapid development cycle and scalability have made
          them invaluable tools during pandemics and emerging infectious disease
          outbreaks.
        </p>

        <p>
          Prot2Vac is a web-based platform builds on this innovation by offering
          a fully automated pipeline for mRNA vaccine design. Starting with a
          simple protein, the tools predicts epitopes using a widely used
          database, IEDB. Next, the tool performs reverse translation,
          species-specific codon optimization, and modular antigen construction.
          It then appends key mRNA regulatory elements such as the 5′ cap, Kozak
          sequence, untranslated regions (UTRs), and a poly(A) tail. To ensure
          structural integrity and stability, the platform runs RNAfold to
          predict secondary structure, compute the minimum free energy (MFE),
          and generate a visual representation of the mRNA molecule. Users can
          analyze GC content, view the full construct, and download both the
          final sequence and a detailed report. This application simplifies
          complex bioinformatics processes into an intuitive workflow, making it
          an essential resource for researchers, educators, and developers
          involved in vaccine design and synthetic biology.
        </p>
      </div>

      <div
        style={{
          width: "100%",
          height: "225px",
          backgroundColor: "var(--color-grey-50)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
      <div className="text-center">
        <Button
          size="medium"
          variation="primary"
          className="w-1/4"
          onClick={() => navigate("/upload")}
        >
          Get started
        </Button>
      </div>
    </StyledDiv>
  );
}

export default HomePage;
