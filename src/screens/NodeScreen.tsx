import React, { useContext, useEffect } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FiEdit } from "react-icons/fi";
import { GiBottomRight3DArrow } from "react-icons/gi";

import {
  AccordionComponent,
  IconButtonComponent,
  ScreensHeaderComponent,
} from "../components";
import {
  LayersCalculationComponent,
  NodeDependenciesComponent,
} from "../partials";
import { ProjectContext, NodeContext, NodeContextProvider } from "../context";

type RouteParams = { id: string };

const NodeScreen = ({
  match,
}: RouteComponentProps<RouteParams>): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const { nodes, setShowNodeModal } = useContext(ProjectContext);
  const { nodeId, setNodeId, sources, targets } = useContext(NodeContext);

  useEffect(() => {
    const { id } = match.params;
    if (nodeId !== id) {
      const nodeExists = nodes[id];
      if (nodeExists) setNodeId(id);
      else history.push("/not-found");
    }
  }, [match.params.id, nodeId]);

  useEffect(() => {
    return () => setNodeId("");
  }, []);

  return (
    <>
      <ScreensHeaderComponent title="Item playground">
        <IconButtonComponent
          Icon={FiEdit}
          translationKey="editItem"
          onClick={() => setShowNodeModal(true)}
          style={{ padding: 8 }}
        />
      </ScreensHeaderComponent>

      <div className="node__dependencies">
        <NodeDependenciesComponent dependencies={sources} type="source" />
        <GiBottomRight3DArrow className="node__arrow" />
        <h2 className="node__label">
          {nodes[nodeId].label}
          <span className="node__layer">
            {t("layer")} {nodeId && nodes[nodeId].layer + 1}
          </span>
        </h2>
        <GiBottomRight3DArrow className="node__arrow" />
        <NodeDependenciesComponent dependencies={targets} type="target" />
      </div>

      {/* TO DO: think of better name */}
      {nodeId && nodes[nodeId].layer !== 0 && (
        <AccordionComponent translationKey="layersCalculation">
          <LayersCalculationComponent />
        </AccordionComponent>
      )}
      {/* <AccordionComponent translationKey="convertionPlayground">
        <p>teste</p>
      </AccordionComponent>
      <AccordionComponent translationKey="compareNodes">
        <p>teste</p>
      </AccordionComponent> */}
    </>
  );
};

const ConnectedNodeScreen = (props: RouteComponentProps<RouteParams>) => (
  <NodeContextProvider>
    <NodeScreen {...props} />
  </NodeContextProvider>
);

export default ConnectedNodeScreen;
