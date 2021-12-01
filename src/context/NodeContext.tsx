import React, { useState, useEffect, ReactChild } from "react";
import { Node, useStoreState } from "react-flow-renderer";
import { CalculatedNode, useLayers } from "../hooks";
import { nodeById } from "../utils";

type NodeContextType = {
  node?: Node;
  setNode: (node?: Node) => void;
  layer: number;
  setLayer: (layer: number) => void;
  sources: Node[];
  targets: Node[];
  showNodeModal: boolean;
  setShowNodeModal: (show: boolean) => void;
  getCalculatedLayer: (layer: number) => CalculatedNode[];
};

type NodeContextProviderType = { children: ReactChild };

export const NodeContext = React.createContext({} as NodeContextType);

export const NodeContextProvider = ({
  children,
}: NodeContextProviderType): JSX.Element => {
  const { calculateNodes, getCalculatedLayer } = useLayers();
  const [node, setNode] = useState<Node>();
  const [layer, setLayer] = useState(0);
  const [sources, setSources] = useState<Node[]>([]);
  const [targets, setTargets] = useState<Node[]>([]);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);

  const getNodesById = (nodesId: string[]) => {
    const nodesById: Node[] = [];
    nodesId.forEach((id) => {
      const nodeExist = nodeById(nodes, id);
      if (nodeExist) nodesById.push(nodeExist);
    });
    return nodesById;
  };

  useEffect(() => {
    if (node) {
      const sourcesId: string[] = [];
      const targetsId: string[] = [];
      edges.forEach(({ source, target }) => {
        if (source === node.id) targetsId.push(target);
        if (target === node.id) sourcesId.push(source);
      });
      setSources(getNodesById(sourcesId));
      setTargets(getNodesById(targetsId));
      setLayer(calculateNodes(node));
    }
  }, [node]);

  return (
    <NodeContext.Provider
      value={{
        node,
        setNode,
        layer,
        setLayer,
        sources,
        targets,
        showNodeModal,
        setShowNodeModal,
        getCalculatedLayer,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
