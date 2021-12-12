import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CgTrash } from "react-icons/cg";

import { ProjectContext, NodeContext } from "../context";
import { InputComponent, ModalComponent } from ".";
import { nodeMounter } from "../utils";

const NodeModalComponent = (): JSX.Element | null => {
  const history = useHistory();
  const { nodeId, setNodeId } = useContext(NodeContext);
  const { nodes, setNodes, edges, setEdges, showNodeModal, setShowNodeModal } =
    useContext(ProjectContext);

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => setName(nodes[nodeId]?.label || ""), [nodeId, showNodeModal]);

  const close = () => {
    setName("");
    setError("");
    setShowNodeModal(false);
  };

  const handleDelete = () => {
    if (!nodeId) return;
    const auxNodes = { ...nodes };
    const auxEdges = { ...edges };
    Object.keys(edges).forEach((edgeId) => {
      const [source, target] = edgeId.split("-");
      if (nodeId === source || nodeId === target) delete auxEdges[edgeId];
    });
    delete auxNodes[nodeId];
    setNodes(auxNodes);
    setEdges(auxEdges);
    history.push("/diagram");
    close();
  };

  const handleCreate = () => {
    const auxNodes = { ...nodes };
    const { id, ...newNode } = nodeMounter(name);
    auxNodes[id] = newNode;
    setNodes(auxNodes);
  };

  const handleUpdate = () => {
    const auxNodes = { ...nodes };
    auxNodes[nodeId].label = name;
    setNodes(auxNodes);
  };

  const handleSave = () => {
    const nameHasChanged = name !== nodes[nodeId].label;
    const duplicatedName = Object.values(nodes).some(
      ({ label }) => label === name
    );
    if (nameHasChanged && duplicatedName) setError("nameError");
    else {
      if (nodeId) handleUpdate();
      else handleCreate();
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
      title={nodeId ? "editItem" : "addItem"}
      deleteButton={
        nodeId
          ? {
              Icon: CgTrash,
              translationKey: "deleteItem",
              onClick: handleDelete,
            }
          : undefined
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
