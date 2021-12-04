import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useStoreState } from "react-flow-renderer";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaKey } from "react-icons/fa";

import { CustomNode, MainContext } from "../context";
import { ButtonComponent, ModalComponent } from ".";
import { useServices } from "../hooks";

const ExportModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { updateProject } = useServices();
  const { showExportModal, setShowExportModal, conversionEdges } =
    useContext(MainContext);
  const nodes = useStoreState((store) => store.nodes) as CustomNode[];
  const edges = useStoreState((store) => store.edges);
  const id = localStorage.getItem("bom_demonstration_id") || "";

  const update = async () => {
    const res = await updateProject({ id, nodes, edges, conversionEdges });
    console.log(res);
  };

  useEffect(() => {
    if (showExportModal) update();
  }, [showExportModal]);

  const generateFile = (data: string, type: "csv" | "json") => {
    const fileName = `bom-data.${type}`;
    const csvHeader = `data:text/csv;charset=utf-8,source,target,value\n`;
    const jsonHeader = `data:application/json;charset=utf-8,`;
    const header = type === "csv" ? csvHeader : jsonHeader;
    const content = `${header}${encodeURIComponent(data)}`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", content);
    linkElement.setAttribute("download", fileName);
    linkElement.click();
  };

  // const exportCSVFile = () => {
  //   const data = edgesToSave
  //     .map((edge) => `${edge.source},${edge.target},${edge.value}\n`)
  //     .join("");
  //   generateFile(data, "csv");
  // };

  const exportJSONFile = () => {
    const data = JSON.stringify({ id, nodes, edges });
    generateFile(data, "json");
  };

  return (
    <ModalComponent
      show={showExportModal}
      title="exportTitle"
      deleteButton={{
        Icon: AiOutlineCloseCircle,
        onClick: () => setShowExportModal(false),
      }}
    >
      {id && (
        <p className="modal__file-name">
          <FaKey className="modal__file-icon" />
          {id}
        </p>
      )}
      <iframe title="export" id="iframe" style={{ display: "none" }} />
      <div className="modal__buttons modal__buttons--row">
        {/* <ButtonComponent
          label={t("export", { file: "CSV" })}
          onClick={exportCSVFile}
        /> */}
        <ButtonComponent
          label={t("export", { file: "JSON" })}
          onClick={exportJSONFile}
        />
      </div>
    </ModalComponent>
  );
};

export default ExportModalComponent;
