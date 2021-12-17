import React, { useContext, useMemo } from "react";
import { ConversionItemComponent } from "./conversionEdges";
import { ProjectContext } from "../context";
import { colors } from "../utils";

const NodeConversionsComponent = (): JSX.Element => {
  const { nodeId, conversionEdges } = useContext(ProjectContext);

  const ceList = useMemo(() => {
    return Object.entries(conversionEdges).filter(
      ([_, { sources, targets }]) => {
        const inSources = sources[nodeId];
        const inTargets = targets[nodeId];
        return !!inSources || !!inTargets;
      }
    );
  }, [nodeId, conversionEdges]);

  return (
    <div style={{ color: colors.primary }}>
      <div className="ce__list">
        {ceList.map(([ceId]) => (
          <ConversionItemComponent key={ceId} conversionEdgeId={ceId} />
        ))}
      </div>
    </div>
  );
};

export default NodeConversionsComponent;
