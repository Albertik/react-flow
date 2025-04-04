import { useEffect, useState } from "react";
import type { NodeTypes, Edge } from "@xyflow/react";

import { PositionLoggerNode } from "./PositionLoggerNode";
import { ExecutionNode } from "./ExecutionNode";
import { AppNode } from "./types";
import { parseExecutionData } from "../utils/dataParser";

// Default nodes for initial rendering
export const initialNodes: AppNode[] = [
  {
    id: "loading",
    type: "default",
    position: { x: 200, y: 200 },
    data: { label: "Loading execution data..." },
  },
];

// Empty edges array for initial rendering
export const initialEdges: Edge[] = [];

// Helper to get base URL for assets
const getBaseUrl = () => {
  // In development, use root path
  if (import.meta.env.DEV) {
    return "";
  }
  // In production, use the configured base path from vite.config.ts
  return import.meta.env.BASE_URL || "";
};

// Hook to load the execution data from the JSON file
export const useExecutionData = () => {
  const [nodes, setNodes] = useState<AppNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = getBaseUrl();
        const response = await fetch(`${baseUrl}/data.json`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        const { nodes: parsedNodes, edges: parsedEdges } =
          parseExecutionData(data);

        setNodes(parsedNodes);
        setEdges(parsedEdges);
        setLoading(false);
      } catch (err) {
        console.error("Error loading execution data:", err);
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { nodes, edges, loading, error };
};

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  execution: ExecutionNode,
} satisfies NodeTypes;
