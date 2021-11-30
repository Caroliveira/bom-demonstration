import React, { useContext, MouseEvent } from "react";
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

const DiagramScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const { elements, setElements, setEdge, showMiniMap, setShowEdgeModal } =
    useContext(MainContext);

  const onConnect = (params: Edge | Connection) => {
    setElements(addEdge({ ...params, label: 1 }, elements));
  };

  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    console.log(oldEdge, newConnection);
    setElements(updateEdge(oldEdge, newConnection, elements));
  };

  const onNodeDoubleClick = (evt: MouseEvent, node: Node) => {
    history.push(`/node/${node.id}`);
  };

  const onEdgeDoubleClick = (evt: MouseEvent, edge: Edge) => {
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
