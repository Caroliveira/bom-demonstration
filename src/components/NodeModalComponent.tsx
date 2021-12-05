import React, { useContext, useState, useEffect } from "react";
import { useStoreState, removeElements, isEdge } from "react-flow-renderer";
import { useHistory } from "react-router-dom";
import { CgTrash } from "react-icons/cg";
import { v4 as uuid } from "uuid";

import { CustomNode, MainContext, NodeContext } from "../context";
import { InputComponent, ModalComponent } from ".";
import { calculateNodesLayers } from "../utils";

const NodeModalComponent = (): JSX.Element | null => {
  const { elements, setElements } = useContext(MainContext);
  const { node, setNode, showNodeModal, setShowNodeModal } =
    useContext(NodeContext);
  const history = useHistory();
  const nodes = useStoreState((store) => store.nodes) as CustomNode[];
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

    const auxElements = removeElements(elementsToDelete, elements);
    setElements(calculateNodesLayers(auxElements));
    history.push("/diagram");
    close();
  };

  const handleUpdate = () => {
    return elements.map((element) => {
      const el = element;
      if (!isEdge(el) && el.id === node?.id) {
        el.data = { ...el.data, label: name };
        setNode(el as CustomNode);
      }
      return el;
    });
  };

  const nodeMounter = (label: string): CustomNode => {
    return {
      id: uuid(),
      type: "default",
      data: { label },
      position: { x: 0, y: 0 },
      amount: 0,
      layer: 0,
      timer: 0,
    };
  };

  const handleSave = () => {
    const duplicatedName =
      name === node?.id ? false : nodes.some(({ id }) => id === name);
    if (duplicatedName) setError("nameError");
    else {
      setElements(node ? handleUpdate() : [...elements, nodeMounter(name)]);
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
        node && {
          Icon: CgTrash,
          translationKey: "deleteItem",
          onClick: handleDelete,
        }
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
