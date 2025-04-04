import type { Node, BuiltInNode } from "@xyflow/react";

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;

export type ExecutionNodeData = {
  label: string;
  routineName: string;
  executionId: number;
  completedState: string;
  inputs: { count: number; types: string[] };
  outputs: { count: number; types: string[] };
};

export type ExecutionNode = Node<ExecutionNodeData, "execution">;

export type AppNode = BuiltInNode | PositionLoggerNode | ExecutionNode;
