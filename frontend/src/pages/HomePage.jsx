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
} from "reactflow";
import "reactflow/dist/style.css";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  gap: 2rem;

  text-align: center;
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
      <Heading as="h1">An automated pipeline to design mRNA vaccine</Heading>
      <div>
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
        ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
        tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
        Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
        massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
        vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
        inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing
        elit.Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
        faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
        pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
        tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
        Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit
        semper vel class aptent taciti sociosqu. Ad litora torquent per conubia
        nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur
        adipiscing elit.dswefffffffffffffwefwf pretium tellus duis convallis.
        Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla
        lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
        integer nunc posuere. Ut hendrerit semper vel class aptent taciti
        sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
        Lorem ipsum dolor sit amet consectetur. Ut hendrerit semper vel class
        aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
        himenaeos. Lorem ipsum dolor sit amet consectetur. Ut hendrerit semper
        vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
        inceptos himenaeos. Lorem ipsum dolor sit amet consectetur
      </div>
      <div
        style={{
          width: "100%",
          height: "250px",
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
        />
      </div>
      <div>
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
