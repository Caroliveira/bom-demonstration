import React, { useContext, useState, useEffect } from "react";
import { useStoreState, removeElements } from "react-flow-renderer";
import { useHistory } from "react-router-dom";

import { CustomNodeType, MainContext } from "../context";
import { InputComponent, ModalComponent } from ".";
import { nodeMounter } from "../utils";

const NodeModalComponent = (): JSX.Element | null => {
  const {
    elements,
    node,
    setNode,
    adjustLayout,
    showNodeModal,
    setShowNodeModal,
  } = useContext(MainContext);
  const history = useHistory();
  const nodes = useStoreState((store) => store.nodes) as CustomNodeType[];
  const edges = useStoreState((store) => store.edges);

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => setName(node?.data.label || ""), [node, showNodeModal]);

  const close = () => {
    setName("");
    setError("");
    setShowNodeModal(false);
  };

  const handleDelete = () => {
    if (!node) return;
    const edgesToDelete = edges.filter((edge) => {
      return edge.source === node.id || edge.target === node.id;
    });
    const elementsToDelete = [node, ...edgesToDelete];
    adjustLayout({ els: removeElements(elementsToDelete, elements) });
    history.push("/diagram");
    close();
  };

  const handleUpdate = () => {
    return elements.map((element) => {
      const el = element;
      if (el.id === node?.id) {
        el.data = { ...el.data, label: name };
        setNode(el as CustomNodeType);
      }
      return el;
    });
  };

  const handleSave = () => {
    const duplicatedName =
      name === node?.id ? false : nodes.some(({ id }) => id === name);
    if (duplicatedName) setError("nameError");
    else {
      adjustLayout({
        els: node ? handleUpdate() : [...elements, nodeMounter(name)],
      });
      close();
    }
  };

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setName(evt.target.value);
  };

  return (
    <ModalComponent
      show={showNodeModal}
      title={node ? "editItem" : "addItem"}
      deleteButton={
        node && { translationKey: "deleteItem", onClick: handleDelete }
      }
      secondaryButton={{ translationKey: "cancel", onClick: close }}
      submitButton={{ disabled: !name, translationKey: "save" }}
      onSubmit={handleSave}
    >
      <InputComponent
        autoFocus
        translationKey="name"
        error={error}
        value={name}
        onChange={handleNameChange}
      />
    </ModalComponent>
  );
};

export default NodeModalComponent;
