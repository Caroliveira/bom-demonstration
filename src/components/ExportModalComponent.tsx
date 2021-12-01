import React, { useState, useMemo, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useStoreState } from "react-flow-renderer";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import { v4 as uuid } from "uuid";

import { nodeById } from "../utils";
import { MainContext } from "../context";
import { ButtonComponent, ModalComponent } from ".";
import { createEdges, updateEdges } from "../api";

export type EdgesToSaveType = {
  source: string;
  target: string;
  value: string;
}[];

const ExportModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const { showExportModal, setShowExportModal } = useContext(MainContext);

  const [error, setError] = useState("");
  const [id, setId] = useState(() => localStorage.getItem("id") || "");

  const edgesToSave = useMemo(() => {
    return edges.map((edge) => {
      const source = nodeById(nodes, edge.source)?.data.label;
      const target = nodeById(nodes, edge.target)?.data.label;
      return { source, target, value: edge.label as string };
    });
  }, [edges]);

  const generateID = async () => {
    try {
      if (id) await updateEdges(id, edgesToSave);
      else {
        const generated = uuid();
        await createEdges(generated, edgesToSave);
        setId(generated);
        localStorage.setItem("id", generated);
      }
    } catch (err: any) {
      setError(`error${err?.response?.error}`);
    }
  };

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

  const exportCSVFile = () => {
    const data = edgesToSave
      .map((edge) => `${edge.source},${edge.target},${edge.value}\n`)
      .join("");
    generateFile(data, "csv");
  };

  const exportJSONFile = () => {
    const data = JSON.stringify(edgesToSave);
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
        <ButtonComponent translationKey="generateId" onClick={generateID} />
        <ButtonComponent
          label={t("export", { file: "CSV" })}
          onClick={exportCSVFile}
        />
        <ButtonComponent
          label={t("export", { file: "JSON" })}
          onClick={exportJSONFile}
        />
      </div>
    </ModalComponent>
  );
};

export default ExportModalComponent;
