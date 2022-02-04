import React, { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";

import { ProjectContext } from "../context";
import { IconButtonComponent, ScreensHeaderComponent } from "../components";
import { ConversionItemComponent, ConversionModalComponent } from "../partials";

const ConversionsScreen = (): JSX.Element => {
  const { conversionEdges } = useContext(ProjectContext);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  console.log("test")
  const closeModal = () => {
    setId("");
    setShowModal(false);
  };

  const openModal = (ceId: string) => {
    setId(ceId);
    setShowModal(true);
  };

  return (
    <>
      <ScreensHeaderComponent title="conversionsAndEvents" path="simulator">
        <IconButtonComponent
          Icon={FiPlus}
          translationKey="createConversion"
          onClick={() => setShowModal(true)}
        />
      </ScreensHeaderComponent>
      <div className="ce__list">
        {Object.keys(conversionEdges).map((ceId) => (
          <ConversionItemComponent
            key={ceId}
            context="page"
            conversionEdgeId={ceId}
            onClick={() => openModal(ceId)}
          />
        ))}
      </div>
      <ConversionModalComponent
        id={id}
        show={showModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default ConversionsScreen;
