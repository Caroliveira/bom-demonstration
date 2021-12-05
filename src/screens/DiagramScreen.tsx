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

import {
  DiagramContext,
  DiagramContextProvider,
  ProjectContext,
} from "../context";
import { calculateNodesLayers, colors } from "../utils";
import { ReactComponent as Elephant } from "../assets/images/elephant.svg";
import { DiagramToolbarComponent, EdgeModalComponent } from "../components";

const DiagramScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const { elements, setElements, setShowFullHeader } =
    useContext(ProjectContext);
  const { setEdge, showMiniMap, setShowEdgeModal } = useContext(DiagramContext);

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
        {!elements && (
          <Elephant
            width={80}
            height={80}
            stroke={colors.alert}
            style={{ marginTop: 100 }}
            className="loading"
          />
        )}
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
      <EdgeModalComponent />
    </>
  );
};

const ConnectedDiagramScreen = () => (
  <DiagramContextProvider>
    <DiagramScreen />
  </DiagramContextProvider>
);

export default ConnectedDiagramScreen;
