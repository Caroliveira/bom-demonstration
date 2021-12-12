import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaMap, FaRegMap } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { CgMoveDown, CgMoveRight } from "react-icons/cg";

import { ButtonComponent, IconButtonComponent } from "../components";
import { ProjectContext } from "../context";
import { useDiagram } from "../hooks";

const layout = {
  TB: { Icon: CgMoveDown, label: "Vertical" },
  LR: { Icon: CgMoveRight, label: "Horizontal" },
};

const DiagramToolbarComponent = (): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const [direction, setDirection] = useState<"TB" | "LR">("TB");
  const { elements, adjustLayout, showMiniMap, setShowMiniMap } = useDiagram();
  const { setShowNodeModal } = useContext(ProjectContext);

  const onDirectionChange = () => {
    const newDirection = direction === "TB" ? "LR" : "TB";
    adjustLayout(newDirection);
  };

  return (
    <div className="toolbar">
      <div className="toolbar--centered">
        <IconButtonComponent
          Icon={showMiniMap ? FaMap : FaRegMap}
          translationKey={showMiniMap ? "hideMap" : "showMap"}
          onClick={() => setShowMiniMap(!showMiniMap)}
          style={{ padding: 10 }}
          className="mr-2"
        />
        <IconButtonComponent
          disabled={!elements.length}
          Icon={layout[direction].Icon}
          label={t("layoutFormat", { layout: layout[direction].label })}
          onClick={onDirectionChange}
          className="mr-2"
        />
      </div>
      <div className="toolbar--centered">
        <ButtonComponent
          outlined
          translationKey="simulate"
          className="toolbar__button"
          onClick={() => history.push("/simulator")}
        />
        <IconButtonComponent
          Icon={FiPlus}
          translationKey="addNode"
          onClick={() => setShowNodeModal(true)}
          className="mr-2"
        />
      </div>
    </div>
  );
};

export default DiagramToolbarComponent;
