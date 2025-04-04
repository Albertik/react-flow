import { useCallback, useEffect, useState } from "react";
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
import DeploymentInstructions from "./DeploymentInstructions";

export default function App() {
  // State to track whether to show fallback data
  const [useFallback, setUseFallback] = useState(false);
  const [showDeploymentInstructions, setShowDeploymentInstructions] =
    useState(false);

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

  if (showDeploymentInstructions) {
    return <DeploymentInstructions />;
  }

  if (error && !useFallback) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <h3>Error loading data:</h3>
        <p>{error}</p>
        <p>The following URLs were attempted:</p>
        <ul>
          <li>
            <code>
              {window.location.origin + import.meta.env.BASE_URL + "data.json"}
            </code>
          </li>
          <li>
            <code>{import.meta.env.BASE_URL + "data.json"}</code>
          </li>
        </ul>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            onClick={() => setShowDeploymentInstructions(true)}
            style={{
              padding: "8px 16px",
              background: "#4285f4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Show Deployment Instructions
          </button>
          <button
            onClick={() => setUseFallback(true)}
            style={{
              padding: "8px 16px",
              background: "#34a853",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Use Demo Data (Coming Soon)
          </button>
        </div>
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
