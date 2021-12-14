import React, { useContext, useEffect, useState } from "react";
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
  ConversionEdgesComponent,
  LayersCalculationComponent,
  NodeDependenciesComponent,
} from "../partials";
import { ProjectContext } from "../context";

type RouteParams = { id: string };

const NodeScreen = ({
  match,
}: RouteComponentProps<RouteParams>): JSX.Element | null => {
  const history = useHistory();
  const { t } = useTranslation();
  const [sources, setSources] = useState<string[]>([]);
  const [targets, setTargets] = useState<string[]>([]);
  const { nodeId, setNodeId, nodes, edges, setShowNodeModal } =
    useContext(ProjectContext);

  useEffect(() => {
    const { id } = match.params;
    if (nodeId !== id) {
      const nodeExists = nodes[id];
      if (!nodeExists) history.push("/not-found");
      else {
        const sourcesId: string[] = [];
        const targetsId: string[] = [];
        Object.keys(edges).forEach((edgeId) => {
          const [source, target] = edgeId.split("-");
          if (source === id) targetsId.push(target);
          if (target === id) sourcesId.push(source);
        });
        setNodeId(id);
        setSources(sourcesId);
        setTargets(targetsId);
      }
    }
  }, [match.params.id, nodeId]);

  useEffect(() => {
    return () => setNodeId("");
  }, []);

  if (!nodeId) return null;
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
            {t("layer")} {nodes[nodeId].layer + 1}
          </span>
        </h2>
        <GiBottomRight3DArrow className="node__arrow" />
        <NodeDependenciesComponent dependencies={targets} type="target" />
      </div>

      {nodes[nodeId].layer !== 0 && (
        <AccordionComponent translationKey="layersCalculation">
          <LayersCalculationComponent />
        </AccordionComponent>
      )}
      <AccordionComponent translationKey="conversionAndEvents">
        <ConversionEdgesComponent />
      </AccordionComponent>
    </>
  );
};

export default NodeScreen;
