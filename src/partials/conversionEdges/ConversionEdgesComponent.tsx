import React, { useContext, useMemo, useState } from "react";
import { ConversionItemComponent, ConversionModalComponent } from ".";
import { ButtonComponent } from "../../components";
import { ProjectContext } from "../../context";
import { colors } from "../../utils";

const ConversionEdgesComponent = (): JSX.Element => {
  const { nodeId, conversionEdges } = useContext(ProjectContext);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const closeModal = () => {
    setId("");
    setShowModal(false);
  };

  const ceList = useMemo(() => {
    return Object.values(conversionEdges).filter(({ sources, targets }) => {
      const inSources = sources[nodeId];
      const inTargets = targets[nodeId];
      return !!inSources || !!inTargets;
    });
  }, [nodeId, conversionEdges]);

  return (
    <div style={{ color: colors.primary }}>
      <ButtonComponent
        outlined
        translationKey="createConversion"
        className="ce__button"
        onClick={() => setShowModal(true)}
      />
      <div className="ce__list">
        {ceList.map((ce) => (
          <ConversionItemComponent key={ce.label} conversionEdge={ce} />
        ))}
      </div>
      <ConversionModalComponent
        id={id}
        show={showModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ConversionEdgesComponent;
