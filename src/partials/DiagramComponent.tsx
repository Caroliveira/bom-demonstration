import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import ReactFlow, {
  Connection,
  Controls,
  Edge,
  MiniMap,
} from "react-flow-renderer";

import { useTranslation } from "react-i18next";
import { ProjectContext, DiagramContext } from "../context";

const DiagramComponent = (): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const { edges, setEdges } = useContext(ProjectContext);
  const { elements, setEdgeId, showMiniMap } = useContext(DiagramContext);

  const onConnect = (params: Edge | Connection) => {
    const updatedEdges = { ...edges };
    updatedEdges[`${params.source}-${params.target}`] = 1;
    setEdges(updatedEdges);
  };

  const onEdgeUpdate = (oldEdge: Edge, { source, target }: Connection) => {
    const updatedEdges = { ...edges };
    delete updatedEdges[oldEdge.id];
    updatedEdges[`${source}-${target}`] = parseInt(oldEdge.label as string, 10);
    setEdges(updatedEdges);
  };

  if (!elements.length)
    return (
      <span className="diagram__alert diagram__alert--background">
        {t("noData")}
      </span>
    );

  return (
    <ReactFlow
      elements={elements}
      onConnect={onConnect}
      onEdgeUpdate={onEdgeUpdate}
      onNodeDoubleClick={(_, { id }) => history.push(`/node/${id}`)}
      onEdgeDoubleClick={(_, { id }) => setEdgeId(id)}
    >
      <Controls />
      {showMiniMap && <MiniMap nodeColor="black" maskColor="#000A" />}
    </ReactFlow>
  );
};

export default DiagramComponent;
