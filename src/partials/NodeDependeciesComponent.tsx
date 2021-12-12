import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ButtonComponent } from "../components";
import { ProjectContext } from "../context";

type NodeDependenciesProps = {
  dependencies: string[];
  type: "source" | "target";
};

const NodeDependenciesComponent = ({
  dependencies,
  type,
}: NodeDependenciesProps): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const { nodes } = useContext(ProjectContext);

  if (!dependencies.length) {
    return (
      <p className="node__dependencies-empty">
        {t("noItems", { type: t(type) })}
      </p>
    );
  }

  return (
    <ul className="node__dependencies-list">
      {dependencies.map((id) => (
        <li className="node__dependencies-item" key={id}>
          <ButtonComponent
            outlined
            label={nodes[id].label}
            onClick={() => history.push(`/node/${id}`)}
          />
        </li>
      ))}
    </ul>
  );
};

export default NodeDependenciesComponent;
