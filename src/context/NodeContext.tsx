import React, { useState, useEffect, ReactChild } from "react";
import { Node, useStoreState } from "react-flow-renderer";

export type CustomNode = {
  amount: number;
  layer: number;
  timer: number;
} & Node;

type NodeContextType = {
  node?: CustomNode;
  setNode: (node?: CustomNode) => void;
  layer: number;
  setLayer: (layer: number) => void;
  sources: CustomNode[];
  targets: CustomNode[];
  showNodeModal: boolean;
  setShowNodeModal: (show: boolean) => void;
  nodeById: (id?: string | null) => CustomNode | undefined;
};

type NodeContextProviderType = { children: ReactChild };

export const NodeContext = React.createContext({} as NodeContextType);

export const NodeContextProvider = ({
  children,
}: NodeContextProviderType): JSX.Element => {
  const [node, setNode] = useState<CustomNode>();
  const [layer, setLayer] = useState(0);
  const [sources, setSources] = useState<CustomNode[]>([]);
  const [targets, setTargets] = useState<CustomNode[]>([]);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const nodes = useStoreState((store) => store.nodes) as CustomNode[];
  const edges = useStoreState((store) => store.edges);

  const nodeById = (id?: string | null) => {
    if (!id) return undefined;
    return nodes.find((n) => n.id === id);
  };

  const getNodesById = (nodesId: string[]) => {
    const nodesById: CustomNode[] = [];
    nodesId.forEach((id) => {
      const nodeExist = nodeById(id);
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
        layer,
        setLayer,
        sources,
        targets,
        showNodeModal,
        setShowNodeModal,
        nodeById,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
