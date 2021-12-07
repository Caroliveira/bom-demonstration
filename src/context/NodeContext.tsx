import React, { useState, useEffect, ReactChild } from "react";
import { Edge, Node, useStoreState } from "react-flow-renderer";
import { nodeArrayById } from "../utils";

export type CustomNode = {
  amount: number;
  layer: number;
  timer: number;
} & Node;

type NodeContextType = {
  node?: CustomNode;
  setNode: (node?: CustomNode) => void;
  sources: CustomNode[];
  targets: CustomNode[];
};

type NodeContextProviderType = { children: ReactChild };

export const NodeContext = React.createContext({} as NodeContextType);

export const NodeContextProvider = ({
  children,
}: NodeContextProviderType): JSX.Element => {
  const [node, setNode] = useState<CustomNode>();
  const [sources, setSources] = useState<CustomNode[]>([]);
  const [targets, setTargets] = useState<CustomNode[]>([]);
  const nodes = useStoreState((store) => store.nodes) as CustomNode[];
  const edges = useStoreState((store) => store.edges);

  useEffect(() => {
    if (node) {
      const sourcesId: string[] = [];
      const targetsId: string[] = [];
      edges.forEach(({ source, target }) => {
        if (source === node.id) targetsId.push(target);
        if (target === node.id) sourcesId.push(source);
      });
      setSources(nodeArrayById(nodes, sourcesId));
      setTargets(nodeArrayById(nodes, targetsId));
    }
  }, [node]);

  return (
    <NodeContext.Provider
      value={{
        node,
        setNode,
        sources,
        targets,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
