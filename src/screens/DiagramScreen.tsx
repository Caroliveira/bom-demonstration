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
import { calculateLayers, colors } from "../utils";
import { ReactComponent as Elephant } from "../assets/images/elephant.svg";
import { DiagramToolbarComponent, EdgeModalComponent } from "../components";

const DiagramScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const { elements, setElements, setShowFullHeader, loadingGet } =
    useContext(ProjectContext);
  const { setEdge, showMiniMap, setShowEdgeModal } = useContext(DiagramContext);

  useEffect(() => setShowFullHeader(true), []);

  const onConnect = (params: Edge | Connection) => {
    const auxElements = addEdge({ ...params, label: 1 }, elements);
    setElements(calculateLayers(auxElements));
  };

  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    const auxElements = updateEdge(oldEdge, newConnection, elements);
    setElements(calculateLayers(auxElements));
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
        {loadingGet && (
          <Elephant
            width={120}
            height={120}
            stroke={colors.alert}
            className="diagram__alert loading"
          />
        )}
        {!loadingGet && !elements.length && (
          <span className="diagram__alert diagram__alert--background">
            {t("noData")}
          </span>
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
