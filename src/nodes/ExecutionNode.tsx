import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import "../flow.css";

// Define a simpler interface for our component to avoid type issues
interface ExecutionNodeProps {
  data: {
    label: string;
    routineName: string;
    executionId: number;
    completedState: string;
    inputs: { count: number; types: string[] };
    outputs: { count: number; types: string[] };
  };
  id: string;
  selected: boolean;
  type?: string;
}

const ExecutionNodeComponent = ({ data }: ExecutionNodeProps) => {
  const statusClass =
    data.completedState === "SUCCESSFULL"
      ? "node-success"
      : data.completedState === "FAILED"
      ? "node-failed"
      : "node-unknown";

  const borderColor =
    data.completedState === "SUCCESSFULL"
      ? "#28a745"
      : data.completedState === "FAILED"
      ? "#dc3545"
      : "#ffc107";

  return (
    <div
      className="execution-node"
      style={{ border: `2px solid ${borderColor}` }}
    >
      <Handle type="target" position={Position.Top} />

      <div className="node-title">{data.routineName || "Unknown Routine"}</div>

      <div className="node-id">ID: {data.executionId}</div>

      <div className="node-status">
        Status: <span className={statusClass}>{data.completedState}</span>
      </div>

      <div className="node-data">
        <div className="data-instances">
          <span className="data-label">Inputs:</span>
          {data.inputs.count}
          {data.inputs.types.length > 0 && (
            <span className="data-type"> ({data.inputs.types.join(", ")})</span>
          )}
        </div>
        <div className="data-instances">
          <span className="data-label">Outputs:</span>
          {data.outputs.count}
          {data.outputs.types.length > 0 && (
            <span className="data-type">
              {" "}
              ({data.outputs.types.join(", ")})
            </span>
          )}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

ExecutionNodeComponent.displayName = "ExecutionNode";

// Export with memo and cast to avoid type issues
export const ExecutionNode = memo(ExecutionNodeComponent) as any;
