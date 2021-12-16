import React, { useContext, useMemo, useState } from "react";
import {
  ConversionItemComponent,
  ConversionModalComponent,
} from "./conversionEdges";
import { ButtonComponent } from "../components";
import { ProjectContext } from "../context";
import { colors } from "../utils";

const NodeConversionsComponent = (): JSX.Element => {
  const { nodeId, conversionEdges } = useContext(ProjectContext);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

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
        {ceList.map(([ceId, ce]) => (
          <ConversionItemComponent key={ce.label} conversionEdge={ce} />
        ))}
      </div>
    </div>
  );
};

export default NodeConversionsComponent;
