import type { Edge, EdgeTypes } from "@xyflow/react";
import DataFlowEdge from "./DataFlowEdge";

// Empty initial edges, actual edges will be loaded from data
export const initialEdges: Edge[] = [];

export const edgeTypes = {
  // Use the custom DataFlowEdge for all edges
  dataFlow: DataFlowEdge,
} satisfies EdgeTypes;
