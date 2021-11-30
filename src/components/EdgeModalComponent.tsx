import React, { useContext, useState, useEffect } from "react";
import { removeElements, Edge, useStoreState } from "react-flow-renderer";
import { useTranslation } from "react-i18next";

import { InputComponent, ModalComponent } from ".";
import { CustomNodeType, MainContext } from "../context";
import useEdgeManipulation from "../hooks/useEdgeManipulation";
import { nodeById } from "../utils";

const EdgeModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { elements, edge, adjustLayout, showEdgeModal, closeEdgeModal } =
    useContext(MainContext);
  const { handleLabelChange, handleEdgeDelete } = useEdgeManipulation();
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);

  const [currentEdge, setCurrentEdge] = useState<Edge>();
  const [source, setSource] = useState<CustomNodeType>();
  const [target, setTarget] = useState<CustomNodeType>();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (edge) {
      const fullEdge = edges.find(({ id }) => id === edge?.id) || edge;
      setSource(nodeById(nodes, fullEdge.source));
      setTarget(nodeById(nodes, fullEdge.target));
      setAmount((fullEdge.label as string) || "");
      setCurrentEdge(fullEdge);
    }
  }, [edge]);

  if (!currentEdge || !source || !target) return null;

  const close = () => {
    setError("");
    setAmount("");
    setSource(undefined);
    setTarget(undefined);
    closeEdgeModal();
  };

  const handleDelete = () => {
    handleEdgeDelete(currentEdge, source, target);
    close();
  };

  const handleSave = () => {
    handleLabelChange(currentEdge, amount);
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
        translationKey: "deleteConnection",
        onClick: handleDelete,
      }}
    >
      <p className="modal__text">
        ({t("source")}: {source.data.label}){" -> "}({t("target")}:{" "}
        {target.data.label})
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
