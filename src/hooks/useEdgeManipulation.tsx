import React, { useContext } from "react";
import {
  addEdge,
  Connection,
  Edge,
  isEdge,
  removeElements,
  useStoreState,
} from "react-flow-renderer";

import { CustomNodeType, MainContext } from "../context";
import { nodeById, removeDuplicatedNodes, updateLayers } from "../utils";

const useEdgeManipulation = () => {
  const { elements, setElements } = useContext(MainContext);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);

  const changeNodeLayerOnSourceRemoval = (
    sourceId: string,
    targetId: string
  ) => {
    let layer = 0;
    let hasSource = false;
    edges.forEach((e) => {
      if (e.target === targetId && e.source !== sourceId) {
        const sourceNode = nodeById(nodes, e.source) as CustomNodeType;
        layer = sourceNode.layer > layer ? sourceNode.layer : layer;
        hasSource = true;
      }
    });
    return hasSource ? layer + 1 : 0;
  };

  const handleEdgeDelete = (
    edge: Edge,
    source: CustomNodeType,
    target: CustomNodeType
  ) => {
    const layer = changeNodeLayerOnSourceRemoval(source.id, target.id);
    const targetNode = { ...target, layer };
    const targetNodes = updateLayers([targetNode], nodes, edges, layer + 1);
    const updatedNodes = removeDuplicatedNodes(
      [...nodes, ...targetNodes],
      (subEl, el) => subEl.layer >= el.layer,
      "id"
    );
    setElements(removeElements([edge], [...updatedNodes, ...edges]));
  };

  const handleEdgeCreation = (params: Edge | Connection) => {
    const source = nodeById(nodes, params.source) as CustomNodeType;
    const target = nodeById(nodes, params.target) as CustomNodeType;
    let updatedElements = elements;
    if (source.layer + 1 > target.layer) {
      const layer = source.layer + 1;
      const targetNode = { ...target, layer };
      const targetNodes = updateLayers([targetNode], nodes, edges, layer + 1);
      const updatedNodes = removeDuplicatedNodes(
        [...nodes, ...targetNodes],
        (subEl, el) => subEl.layer < el.layer,
        "id"
      );
      updatedElements = [...updatedNodes, ...edges];
    }
    setElements(addEdge({ ...params, label: 1 }, updatedElements));
  };

  const handleLabelChange = (edge: Edge, label: string) => {
    const updatedElements = elements.map((el) =>
      isEdge(el) && el.id === edge.id ? { ...el, label } : el
    );
    setElements(updatedElements);
  };

  return { handleLabelChange, handleEdgeDelete, handleEdgeCreation };
};

export default useEdgeManipulation;
