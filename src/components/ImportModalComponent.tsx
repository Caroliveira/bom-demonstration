import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFileAlt } from "react-icons/fa";

import { fileHandler } from "../utils";
import { MainContext } from "../context";
import { InputComponent, ModalComponent, SelectInputComponent } from ".";
import { getEdges } from "../services";
import { useServices } from "../hooks";

const ImportModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const history = useHistory();
  const { getProject } = useServices();
  const { showImportModal, setShowImportModal, adjustLayout } =
    useContext(MainContext);

  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState<File>();

  const closeModal = () => {
    setId("");
    setType("");
    setError("");
    setFile(undefined);
    setShowImportModal(false);
  };

  const handleIdClick = async () => {
    const status = await getProject(id);
    if (status === 200) closeModal();
    else setError(`error${status}`);
  };

  const handleIdChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setId(evt.target.value);
    setError("");
  };

  const handleFileClick = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        const model = fileHandler(result, file.type);
        if (model) adjustLayout({ els: [...model.nodes, ...model.edges] });
      };
      reader.readAsText(file);
      closeModal();
      if (history.location.pathname !== "/diagram") history.push("/diagram");
    } else {
      const fileInput = document.getElementById("file-input");
      fileInput?.click();
    }
  };

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setFile(evt.target.files?.[0]);
  };

  if (!type) {
    return (
      <ModalComponent show={showImportModal} title="importTypeTitle">
        <SelectInputComponent
          hideLabel
          value={type}
          translationKey={t("importTypeTitle")}
          onChange={(evt) => setType(evt.target.value)}
        >
          <option value="" disabled>
            {t("choose")}
          </option>
          <option value="file">{t("file")}</option>
          <option value="id">{t("id")}</option>
        </SelectInputComponent>
      </ModalComponent>
    );
  }

  if (type === "id") {
    return (
      <ModalComponent
        show={showImportModal}
        title="importIdTitle"
        onSubmit={handleIdClick}
        secondaryButton={{ translationKey: "cancel", onClick: closeModal }}
        submitButton={{ translationKey: "loadProject" }}
      >
        <InputComponent
          translationKey={t("id")}
          error={error}
          value={id}
          onChange={handleIdChange}
        />
      </ModalComponent>
    );
  }

  return (
    <ModalComponent
      show={showImportModal}
      title="importFileTitle"
      onSubmit={handleFileClick}
      secondaryButton={{ translationKey: "cancel", onClick: closeModal }}
      submitButton={{ translationKey: file ? "save" : "loadProject" }}
    >
      <p className="modal__text modal__text--inline">
        {t("importEspecification")}:
      </p>
      <pre className="modal__text--inline">
        {'{ "source", "target", "value" }'}
      </pre>

      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <p className="modal__file-name">
        <FaFileAlt className="modal__file-icon" />
        {file?.name || t("noFileSelected")}
      </p>
    </ModalComponent>
  );
};

export default ImportModalComponent;
