import React, { useContext, useEffect } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { GiBottomRight3DArrow } from "react-icons/gi";
import { useStoreState } from "react-flow-renderer";

import {
  AccordionComponent,
  IconButtonComponent,
  LayersCalculationComponent,
  NodeDependenciesComponent,
  ScreensHeaderComponent,
} from "../components";
import { NodeContext } from "../context";

type RouteParams = { id: string };

const NodeScreen = ({
  match,
}: RouteComponentProps<RouteParams>): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setShowNodeModal, node, setNode, layer, sources, targets, nodeById } =
    useContext(NodeContext);
  const nodes = useStoreState((store) => store.nodes);

  useEffect(() => {
    const { id } = match.params;
    if (!node || node.id !== id) {
      const nodeExists = nodeById(id);
      if (nodeExists) setNode(nodeExists);
      else history.push("/not-found");
    }
  }, [match.params.id, node]);

  useEffect(() => {
    return () => setNode(undefined);
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
          {node?.data.label}
          <span className="node__layer">
            {t("layer")} {layer + 1}
          </span>
        </h2>
        <GiBottomRight3DArrow className="node__arrow" />
        <NodeDependenciesComponent dependencies={targets} type="target" />
      </div>

      {/* TO DO: think of better name */}
      {layer !== 0 && (
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

export default NodeScreen;
