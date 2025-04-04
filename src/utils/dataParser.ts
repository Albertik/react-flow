import { Edge } from "@xyflow/react";
import { AppNode, ExecutionNodeData } from "../nodes/types";

interface DataInstance {
  id: number;
  data_type: {
    name: string;
    version: string;
  };
  object_bucket: string;
  object_key: string;
  object_range_start: number;
  object_range_end: number;
}

interface Execution {
  routine_name: string | null;
  routine_version: number;
  completed: string | null;
  completed_state: string | null;
  defined: string | null;
  execution_id: number;
  fail_point: string | null;
  fail_reason: string | null;
  initialized: string | null;
  input_data_instances: DataInstance[];
  output_data_instances: DataInstance[];
}

// Helper to collect unique data types from instances
const getUniqueDataTypes = (instances: DataInstance[]): string[] => {
  const uniqueTypes = new Set<string>();
  instances.forEach((instance) => {
    uniqueTypes.add(instance.data_type.name);
  });
  return Array.from(uniqueTypes);
};

// Build a map of data instances to their consuming executions
const buildDataInstanceMap = (
  executions: Execution[]
): Map<number, number[]> => {
  const instanceMap = new Map<number, number[]>();

  executions.forEach((execution) => {
    execution.input_data_instances.forEach((instance) => {
      if (!instanceMap.has(instance.id)) {
        instanceMap.set(instance.id, []);
      }
      instanceMap.get(instance.id)?.push(execution.execution_id);
    });
  });

  return instanceMap;
};

export const parseExecutionData = (
  data: Execution[]
): { nodes: AppNode[]; edges: Edge[] } => {
  const dataInstanceMap = buildDataInstanceMap(data);
  const nodes: AppNode[] = [];
  const edges: Edge[] = [];

  // Create a position grid layout
  const columns = 3;
  const startX = 50;
  const startY = 50;
  const nodeWidth = 250;
  const nodeHeight = 200;

  // Create nodes for each execution
  data.forEach((execution, index) => {
    // Calculate position based on grid layout
    const row = Math.floor(index / columns);
    const col = index % columns;
    const x = startX + col * (nodeWidth + 50);
    const y = startY + row * (nodeHeight + 75);

    // Create node
    const executionNode: AppNode = {
      id: `execution-${execution.execution_id}`,
      type: "execution",
      position: { x, y },
      data: {
        label: execution.routine_name || "Unknown Routine",
        routineName: execution.routine_name || "Unknown Routine",
        executionId: execution.execution_id,
        completedState: execution.completed_state || "UNKNOWN",
        inputs: {
          count: execution.input_data_instances.length,
          types: getUniqueDataTypes(execution.input_data_instances),
        },
        outputs: {
          count: execution.output_data_instances.length,
          types: getUniqueDataTypes(execution.output_data_instances),
        },
      } as ExecutionNodeData,
    };

    nodes.push(executionNode);

    // Create edges from output instances of this execution to other executions that use them as input
    execution.output_data_instances.forEach((output) => {
      const consumingExecutions = dataInstanceMap.get(output.id) || [];
      consumingExecutions.forEach((targetExecutionId) => {
        // Don't create self-loops
        if (targetExecutionId !== execution.execution_id) {
          edges.push({
            id: `edge-${execution.execution_id}-${targetExecutionId}`,
            source: `execution-${execution.execution_id}`,
            target: `execution-${targetExecutionId}`,
            type: "dataFlow",
            animated: true,
            label: output.data_type.name,
            labelStyle: { fontSize: 10 },
          });
        }
      });
    });
  });

  return { nodes, edges };
};
