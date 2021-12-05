import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import ReactFlow, {
  addEdge,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  updateEdge,
} from "react-flow-renderer";

import { DiagramToolbarComponent } from "../components";
import { MainContext } from "../context";
import { calculateNodesLayers } from "../utils";

const DiagramScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    elements,
    setElements,
    setEdge,
    showMiniMap,
    setShowEdgeModal,
    setShowFullHeader,
  } = useContext(MainContext);

  useEffect(() => setShowFullHeader(true), []);

  const onConnect = (params: Edge | Connection) => {
    const auxElements = addEdge({ ...params, label: 1 }, elements);
    setElements(calculateNodesLayers(auxElements));
  };

  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    const auxElements = updateEdge(oldEdge, newConnection, elements);
    setElements(calculateNodesLayers(auxElements));
  };

  const onNodeDoubleClick = (evt: React.MouseEvent, node: Node) => {
    history.push(`/node/${node.id}`);
  };

  const onEdgeDoubleClick = (evt: React.MouseEvent, edge: Edge) => {
    setEdge(edge);
    setShowEdgeModal(true);
  };

  return (
    <>
      <DiagramToolbarComponent />
      <div className="diagram__graph">
        {!elements.length && (
          <span className="diagram__alert">{t("noData")}</span>
        )}
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
        >
          <Controls />
          {showMiniMap && <MiniMap nodeColor="black" maskColor="#000A" />}
        </ReactFlow>
      </div>
    </>
  );
};

export default DiagramScreen;
