import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Node } from "react-flow-renderer";

import { ButtonComponent } from "../components";

type NodeDependenciesProps = {
  dependencies: Node[];
  type: "source" | "target";
};

const NodeDependenciesComponent = ({
  dependencies,
  type,
}: NodeDependenciesProps): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();

  if (!dependencies.length) {
    return (
      <p className="node__dependencies-empty">
        {t("noItems", { type: t(type) })}
      </p>
    );
  }

  return (
    <ul className="node__dependencies-list">
      {dependencies.map((dep) => (
        <li className="node__dependencies-item" key={dep.id}>
          <ButtonComponent
            outlined
            label={dep.data.label}
            onClick={() => history.push(`/node/${dep.id}`)}
          />
        </li>
      ))}
    </ul>
  );
};

export default NodeDependenciesComponent;
