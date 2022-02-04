import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactFlow, {
  Connection,
  Controls,
  Edge,
  MiniMap,
} from "react-flow-renderer";

import { useTranslation } from "react-i18next";
import { FiAlertTriangle } from "react-icons/fi";
import { ProjectContext, DiagramContext } from "../context";
import { hasCicle } from "../utils";
import { ModalComponent } from "../components";

const DiagramComponent = (): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const { nodes, edges, setEdges } = useContext(ProjectContext);
  const { elements, setEdgeId, showMiniMap } = useContext(DiagramContext);

  const isBlocked = (id: string | null) => {
    if (id && nodes[id].blocked) {
      setError(`${t("blockedItem")}: ${nodes[id].label}`);
      return true;
    }
    return false;
  };

  const onConnect = (params: Edge | Connection) => {
    const { source, target } = params;
    if (isBlocked(source) || isBlocked(target)) return;
    if (hasCicle(params, edges)) setError("forbiddenCicle");
    else {
      const updatedEdges = { ...edges };
      updatedEdges[`${source}-${target}`] = 1;
      setEdges(updatedEdges);
    }
  };

  const onEdgeUpdate = ({ id, label }: Edge, newEdge: Connection) => {
    const { source, target } = newEdge;
    if (isBlocked(source) || isBlocked(target)) return;
    if (hasCicle(newEdge, edges)) setError("forbiddenCicle");
    else {
      const updatedEdges = { ...edges };
      delete updatedEdges[id];
      updatedEdges[`${source}-${target}`] = parseInt(label as string, 10);
      setEdges(updatedEdges);
    }
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

      <ModalComponent
        show={!!error}
        onSubmit={() => setError("")}
        submitButton={{ translationKey: "ok" }}
      >
        <span className="input__error input__error--big">
          <FiAlertTriangle style={{ marginRight: 8 }} />
          {t(error)}
        </span>
      </ModalComponent>
    </ReactFlow>
  );
};

export default DiagramComponent;
