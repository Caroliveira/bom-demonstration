import React, { useContext, useState, useEffect } from "react";
import { removeElements, Edge, useStoreState } from "react-flow-renderer";
import { useTranslation } from "react-i18next";

import { InputComponent, ModalComponent } from ".";
import { MainContext } from "../context";
import useEdgeManipulation from "../hooks/useEdgeManipulation";
import { nodeById } from "../utils";

const EdgeModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { elements, edge, adjustLayout, showEdgeModal, closeEdgeModal } =
    useContext(MainContext);
  const { handleLabelChange } = useEdgeManipulation();
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);

  const [currentEdge, setCurrentEdge] = useState<Edge>();
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (edge) {
      const fullEdge = edges.find(({ id }) => id === edge?.id) || edge;
      setSource(nodeById(nodes, fullEdge.source)?.data.label);
      setTarget(nodeById(nodes, fullEdge.target)?.data.label);
      setAmount((fullEdge.label as string) || "");
      setCurrentEdge(fullEdge);
    }
  }, [edge]);

  if (!currentEdge) return null;

  const close = () => {
    setError("");
    setAmount("");
    setSource("");
    setTarget("");
    closeEdgeModal();
  };

  const handleDelete = () => {
    adjustLayout({ els: removeElements([currentEdge], elements) });
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
      deleteButton={{
        translationKey: "deleteConnection",
        onClick: handleDelete,
      }}
      secondaryButton={{ translationKey: "cancel", onClick: close }}
      submitButton={{ disabled: !amount || !!error, translationKey: "save" }}
      onSubmit={handleSave}
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
