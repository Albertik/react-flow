import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "./flow.css";

import { nodeTypes, useExecutionData } from "./nodes";
import { edgeTypes } from "./edges";

export default function App() {
  // Load execution data
  const {
    nodes: initialNodes,
    edges: initialEdges,
    loading,
    error,
  } = useExecutionData();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when data is loaded
  useEffect(() => {
    if (!loading) {
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [loading, initialNodes, initialEdges, setNodes, setEdges]);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  if (error) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <h3>Error loading data:</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
