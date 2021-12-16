import React, { useState } from "react";
import {
  ConversionItemComponent,
  ConversionModalComponent,
} from "./conversionEdges";
import { ButtonComponent } from "../components";
import { colors } from "../utils";

const ConversionEdgesComponent = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const closeModal = () => {
    setId("");
    setShowModal(false);
  };

  return (
    <div style={{ color: colors.primary }}>
      <ButtonComponent
        outlined
        translationKey="createConversion"
        className="ce__button"
        onClick={() => setShowModal(true)}
      />
      <div className="ce__list">{/* <ConversionItemComponent /> */}</div>
      <ConversionModalComponent
        id={id}
        show={showModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ConversionEdgesComponent;
