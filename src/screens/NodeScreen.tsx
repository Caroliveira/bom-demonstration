import React, { useContext, useState, useEffect } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { GiBottomRight3DArrow } from "react-icons/gi";

import { useStoreState } from "react-flow-renderer";
import {
  ButtonComponent,
  IconButtonComponent,
  ScreensHeaderComponent,
} from "../components";
import { CustomNodeType, MainContext } from "../context";

type RouteParams = { id: string };

const NodeScreen = ({
  match,
}: RouteComponentProps<RouteParams>): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setShowNodeModal, node, setNode } = useContext(MainContext);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);

  const [sources, setSources] = useState<CustomNodeType[]>([]);
  const [targets, setTargets] = useState<CustomNodeType[]>([]);

  const getNodesById = (nodesId: string[]) => {
    const nodesById: CustomNodeType[] = [];
    nodesId.forEach((id) => {
      const nodeExist = nodes.find((n) => n.id === id);
      if (nodeExist) nodesById.push(nodeExist as CustomNodeType);
    });
    return nodesById;
  };

  useEffect(() => {
    const { id } = match.params;
    const nodeExists = nodes.find((n) => n.id === id);
    if (nodeExists) setNode(nodeExists as CustomNodeType);
    else history.push("/not-found");
  }, [match.params.id]);

  useEffect(() => {
    if (node) {
      const sourcesId: string[] = [];
      const targetsId: string[] = [];
      edges.forEach(({ source, target }) => {
        if (source === node.id) targetsId.push(target);
        if (target === node.id) sourcesId.push(source);
      });
      setSources(getNodesById(sourcesId));
      setTargets(getNodesById(targetsId));
    }
  }, [node]);

  useEffect(() => {
    return () => setNode(undefined);
  }, []);

  const renderDependencies = (
    dependencies: CustomNodeType[],
    type: "source" | "target"
  ) => {
    return !dependencies.length ? (
      <p className="node__dependencies-empty">
        {t("noItems", { type: t(type) })}
      </p>
    ) : (
      <ul className="node__dependencies-list">
        {dependencies.map((dep) => (
          <li className="node__dependencies-item" key={dep.id}>
            <ButtonComponent
              outlined
              translationKey={dep.data.label}
              onClick={() => history.push(`/node/${dep.id}`)}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <ScreensHeaderComponent title="Item playground">
        <IconButtonComponent
          Icon={FiEdit}
          translationKey={t("editItem")}
          onClick={() => setShowNodeModal(true)}
          style={{ padding: 8 }}
        />
      </ScreensHeaderComponent>
      <div className="node__dependencies">
        {renderDependencies(sources, "source")}
        <GiBottomRight3DArrow className="node__arrow" />
        <p className="node__label">{node?.data.label}</p>
        <GiBottomRight3DArrow className="node__arrow" />
        {renderDependencies(targets, "target")}
      </div>
    </>
  );
};

export default NodeScreen;
