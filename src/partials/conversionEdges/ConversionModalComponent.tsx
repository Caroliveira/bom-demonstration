import React, { useContext, useState, useEffect } from "react";
import { CgTrash } from "react-icons/cg";
import { v4 as uuid } from "uuid";

import { ConversionInputComponent, ConversionItemComponent } from ".";
import { InputComponent, ModalComponent } from "../../components";
import { ConversionEdge, ProjectContext } from "../../context";

type ConversionModalProps = {
  id: string;
  show: boolean;
  closeModal: () => void;
};

const ceDefault = { label: "", sources: {}, targets: {} };

const ConversionModalComponent = ({
  id,
  show,
  closeModal,
}: ConversionModalProps): JSX.Element | null => {
  const { conversionEdges, setConversionEdges } = useContext(ProjectContext);
  const [label, setLabel] = useState<string>();
  const [conversionEdge, setConversionEdge] =
    useState<ConversionEdge>(ceDefault);
  const showItemComponent =
    Object.keys(conversionEdge.sources).length ||
    Object.keys(conversionEdge.targets).length;

  useEffect(() => {
    if (id) {
      const ce = conversionEdges[id];
      setConversionEdge(ce);
      setLabel(ce.label);
    }
  }, [id]);

  const close = () => {
    setLabel("");
    setConversionEdge(ceDefault);
    closeModal();
  };

  const handleDelete = () => {
    if (id) {
      const auxEdges = { ...conversionEdges };
      delete auxEdges[id];
      setConversionEdges(auxEdges);
      close();
    }
  };

  const handleSave = () => {
    const auxEdges = { ...conversionEdges };
    const ce = { ...conversionEdge, label };
    auxEdges[id || uuid()] = ce;
    setConversionEdges(auxEdges);
    close();
  };

  const addDependency = (
    nodeId: string,
    amount: number,
    type: "targets" | "sources"
  ) => {
    const ce = { ...conversionEdge };
    ce[type][nodeId] = amount;
    setConversionEdge(ce);
  };

  const deleteButton = {
    Icon: CgTrash,
    translationKey: "deleteConversion",
    onClick: handleDelete,
  };

  return (
    <ModalComponent
      show={show}
      title={id ? "editConversion" : "createConversion"}
      onSubmit={handleSave}
      submitButton={{ translationKey: "save" }}
      secondaryButton={{ translationKey: "cancel", onClick: close }}
      deleteButton={id ? deleteButton : undefined}
    >
      <InputComponent
        autoFocus
        value={label}
        onChange={(evt) => setLabel(evt.target.value)}
        translationKey="optionalEventName"
      />
      <ConversionInputComponent addDependency={addDependency} />
      {!!showItemComponent && (
        <ConversionItemComponent
          context="modal"
          conversionEdge={conversionEdge}
          updateConversionEdge={setConversionEdge}
        />
      )}
    </ModalComponent>
  );
};

export default ConversionModalComponent;
