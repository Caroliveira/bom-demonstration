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

import { ProjectContext } from "../context";
import { colors } from "../utils";
import { ReactComponent as Elephant } from "../assets/images/elephant.svg";
import { DiagramToolbarComponent, EdgeModalComponent } from "../partials";
import { useDiagram } from "../hooks";

const DiagramScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const { setShowFullHeader, loadingGet } = useContext(ProjectContext);
  const { elements, setElements, setEdgeId, showMiniMap, setShowEdgeModal } =
    useDiagram();

  useEffect(() => setShowFullHeader(true), []);

  const onConnect = (params: Edge | Connection) => {
    const auxElements = addEdge({ ...params, label: 1 }, elements);
    setElements(auxElements);
  };

  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    const auxElements = updateEdge(oldEdge, newConnection, elements);
    setElements(auxElements);
  };

  const onNodeDoubleClick = (evt: React.MouseEvent, node: Node) => {
    history.push(`/node/${node.id}`);
  };

  const onEdgeDoubleClick = (evt: React.MouseEvent, edge: Edge) => {
    setEdgeId(edge.id);
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

export default DiagramScreen;
