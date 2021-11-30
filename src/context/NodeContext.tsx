import React, { useState, useEffect, ReactChild } from "react";
import { Node, useStoreState } from "react-flow-renderer";
import { nodeById } from "../utils";

type NodeContextType = {
  node?: Node;
  setNode: (node?: Node) => void;
  sources: Node[];
  targets: Node[];
  showNodeModal: boolean;
  setShowNodeModal: (show: boolean) => void;
};

type NodeContextProviderType = { children: ReactChild };

export const NodeContext = React.createContext({} as NodeContextType);

export const NodeContextProvider = ({
  children,
}: NodeContextProviderType): JSX.Element => {
  const [node, setNode] = useState<Node>();
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
    }
  }, [node]);

  return (
    <NodeContext.Provider
      value={{
        node,
        setNode,
        sources,
        targets,
        showNodeModal,
        setShowNodeModal,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
