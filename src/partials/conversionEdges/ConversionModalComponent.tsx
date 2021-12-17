import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CgTrash } from "react-icons/cg";
import { FiAlertTriangle, FiDelete } from "react-icons/fi";
import { v4 as uuid } from "uuid";
import __ from "lodash";

import { ConversionInputComponent, ConversionItemComponent } from ".";
import {
  IconButtonComponent,
  InputComponent,
  ModalComponent,
} from "../../components";
import { ConversionEdge, ProjectContext } from "../../context";
import { colors } from "../../utils";

type ConversionModalProps = {
  id: string;
  show: boolean;
  closeModal: () => void;
};

const ceDefault: ConversionEdge = { label: "", sources: {}, targets: {} };

const ConversionModalComponent = ({
  id,
  show,
  closeModal,
}: ConversionModalProps): JSX.Element => {
  const { t } = useTranslation();
  const { conversionEdges, setConversionEdges } = useContext(ProjectContext);
  const [conversionEdge, setConversionEdge] = useState(ceDefault);
  const [label, setLabel] = useState<string>();
  const [error, setError] = useState("");

  useEffect(() => {
    const ce = JSON.parse(JSON.stringify(conversionEdges[id] || ceDefault));
    setConversionEdge(ce);
    setLabel(ce.label);
  }, [id]);

  const close = () => {
    setLabel("");
    setError("");
    setConversionEdge(JSON.parse(JSON.stringify(ceDefault)));
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

  const hasErrors = () => {
    const { sources, targets } = conversionEdge;
    const sourcesLength = Object.keys(sources).length;
    const targetsLength = Object.keys(targets).length;
    let hasError = "";
    if (!sourcesLength || !targetsLength) hasError = "emptyDependencies";
    else if (targetsLength <= 1) hasError = "regularConnection";
    else {
      const isDuplicated = Object.values(conversionEdges).find(
        ({ label: _, ...deps }) => __.isEqual(deps, { sources, targets })
      );
      if (isDuplicated) hasError = "alreadyExists";
    }
    if (!hasError) return false;
    setError(hasError);
    return true;
  };

  const handleSave = () => {
    if (!hasErrors()) {
      const auxEdges = { ...conversionEdges };
      const ce = { ...conversionEdge, label };
      auxEdges[id || uuid()] = ce;
      setConversionEdges(auxEdges);
      close();
    }
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

  const deleteDependency = (type: "sources" | "targets", nodeId: string) => {
    const deleteDep = () => {
      const auxCe = { ...conversionEdge };
      delete auxCe[type][id];
      setConversionEdge(auxCe);
    };

    return (
      <IconButtonComponent
        Icon={FiDelete}
        translationKey="deleteItem"
        onClick={deleteDep}
        style={{ background: "none", border: "none", height: 16 }}
        iconProps={{
          style: { color: colors.error, width: 16, height: 16 },
        }}
      />
    );
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
      <ConversionItemComponent
        context="modal"
        conversionEdge={conversionEdge}
        renderIcon={deleteDependency}
      />
      {!!error && (
        <span className="input__error">
          <FiAlertTriangle style={{ marginRight: 8 }} />
          {t(error)}
        </span>
      )}
    </ModalComponent>
  );
};

export default ConversionModalComponent;
