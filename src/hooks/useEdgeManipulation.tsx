import React, { useContext } from "react";
import {
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

  const nodeLayerOnSourceChange = (sourceId: string, targetId: string) => {
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
    const targetLayer = nodeLayerOnSourceChange(source.id, target.id);
    const targetNode = { ...target, layer: targetLayer };
    const nextLayer = targetLayer + 1;
    const targetNodes = updateLayers([targetNode], nodes, edges, nextLayer);
    const updatedNodes = removeDuplicatedNodes(
      [...nodes, ...targetNodes],
      (subEl, el) => subEl.layer >= el.layer,
      "id"
    );
    setElements(removeElements([edge], [...updatedNodes, ...edges]));
  };

  const handleLabelChange = (edge: Edge, label: string) => {
    const updatedElements = elements.map((el) =>
      isEdge(el) && el.id === edge.id ? { ...el, label } : el
    );
    setElements(updatedElements);
  };

  return { handleLabelChange, handleEdgeDelete };
};

export default useEdgeManipulation;
