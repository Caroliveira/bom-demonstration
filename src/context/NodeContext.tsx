import React, { useState, useEffect, useContext } from "react";
import { ProjectContext } from ".";

type NodeContextType = {
  nodeId: string;
  setNodeId: (node: string) => void;
  sources: string[];
  targets: string[];
};

type NodeContextProviderProps = { children: React.ReactChild };

export const NodeContext = React.createContext({} as NodeContextType);

export const NodeContextProvider = ({
  children,
}: NodeContextProviderProps): JSX.Element => {
  const [nodeId, setNodeId] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [targets, setTargets] = useState<string[]>([]);
  const { edges } = useContext(ProjectContext);

  useEffect(() => {
    if (nodeId) {
      const sourcesId: string[] = [];
      const targetsId: string[] = [];
      Object.keys(edges).forEach((edgeId) => {
        const [source, target] = edgeId.split("-");
        if (source === nodeId) targetsId.push(target);
        if (target === nodeId) sourcesId.push(source);
      });
      setSources(sourcesId);
      setTargets(targetsId);
    }
  }, [nodeId]);

  return (
    <NodeContext.Provider
      value={{
        nodeId,
        setNodeId,
        sources,
        targets,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
