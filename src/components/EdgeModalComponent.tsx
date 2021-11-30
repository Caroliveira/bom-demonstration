import React, { useContext, useState, useEffect } from "react";
import { removeElements, Edge, useStoreState } from "react-flow-renderer";
import { useTranslation } from "react-i18next";

import { InputComponent, ModalComponent } from ".";
import { MainContext } from "../context";
import { nodeById } from "../utils";

const EdgeModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { elements, edge, adjustLayout, showEdgeModal, closeEdgeModal } =
    useContext(MainContext);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);

  const [currentEdge, setCurrentEdge] = useState<Edge>();
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (edge) {
      const fullEdge = edges.find(({ id }) => id === edge?.id);
      if (fullEdge) {
        setSource(nodeById(nodes, fullEdge.source)?.data.label);
        setTarget(nodeById(nodes, fullEdge.target)?.data.label);
        setAmount(fullEdge.label as string);
        setCurrentEdge(fullEdge);
      }
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
    const updatedElements = elements.map((element) => {
      const el = element as Edge;
      if (el.id === currentEdge.id) el.label = amount;
      return el;
    });
    adjustLayout({ els: updatedElements });
    close();
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
      submitButton={{ disabled: !amount, translationKey: "save" }}
      onSubmit={handleSave}
    >
      <p className="modal__text">
        ({t("source")}: {source}) {"->"} ({t("target")}: {target})
      </p>
      <InputComponent
        autoFocus
        translationKey="amountNeeded"
        error={error}
        value={amount}
        onChange={(evt) => setAmount(evt.target.value)}
      />
    </ModalComponent>
  );
};

export default EdgeModalComponent;
