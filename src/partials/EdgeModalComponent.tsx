import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CgTrash } from "react-icons/cg";

import { InputComponent, ModalComponent } from "../components";
import { Edge, ProjectContext } from "../context";
import { useDiagram } from "../hooks";

const EdgeModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { nodes, edges, setEdges } = useContext(ProjectContext);
  const { edgeId, showEdgeModal, closeEdgeModal } = useDiagram();

  const [currentEdge, setCurrentEdge] = useState<Edge>();
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (edgeId) {
      const [sourceId, targetId] = edgeId.split("-");
      setSource(nodes[sourceId].label);
      setTarget(nodes[targetId].label);
      setAmount(edges[edgeId].label);
      setCurrentEdge(edges[edgeId]);
    }
  }, [edgeId]);

  const close = () => {
    setError("");
    setAmount("");
    setSource("");
    setTarget("");
    closeEdgeModal();
  };

  if (!currentEdge) return null;

  const handleDelete = () => {
    const auxEdges = { ...edges };
    delete auxEdges[edgeId];
    setEdges(auxEdges);
    close();
  };

  const handleSave = () => {
    const auxEdges = { ...edges };
    auxEdges[edgeId].label = amount;
    setEdges(auxEdges);
    close();
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(evt.target.value);
    setError(parseInt(evt.target.value, 10) <= 0 ? "negativeValueError" : "");
  };

  return (
    <ModalComponent
      show={showEdgeModal}
      title="editConnection"
      onSubmit={handleSave}
      submitButton={{ disabled: !amount || !!error, translationKey: "save" }}
      secondaryButton={{ translationKey: "cancel", onClick: close }}
      deleteButton={{
        Icon: CgTrash,
        translationKey: "deleteConnection",
        onClick: handleDelete,
      }}
    >
      <p className="modal__text">
        ({t("source")}: {source}) {"->"} ({t("target")}: {target})
      </p>
      <InputComponent
        autoFocus
        min={1}
        type="number"
        error={error}
        value={amount}
        onChange={handleChange}
        translationKey="amountNeeded"
      />
    </ModalComponent>
  );
};

export default EdgeModalComponent;
