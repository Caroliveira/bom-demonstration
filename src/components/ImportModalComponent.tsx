import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFileAlt } from 'react-icons/fa';
import { ButtonComponent } from '.';
import { MainContext } from '../context';
import { fileHandler, nodeToCustomNode } from '../utils';

const ImportModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const history = useHistory();
  const [file, setFile] = useState<File>();
  const { showImportModal, setShowImportModal, setElements } = useContext(MainContext);

  const closeModal = () => {
    setFile(undefined);
    setShowImportModal(false);
  };

  const handleClick = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        const { nodes, edges } = fileHandler(result, file.type) || {};
        if (nodes && edges) setElements([...nodeToCustomNode(nodes, edges), ...edges]);
      };
      reader.readAsText(file);
      closeModal();
      if (history.location.pathname !== '/diagram') history.push('/diagram');
    } else {
      const fileInput = document.getElementById('file-input');
      fileInput?.click();
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setFile(evt.target.files?.[0]);
  };

  if (!showImportModal) return null;

  return (
    <div className="modal__background">
      <form className="modal" role="dialog" onSubmit={handleClick}>
        <h2 className="modal__title">{t('importTitle')}</h2>
        <p className="modal__text">{t('importEspecification')}:</p> <pre className="modal__text--pre">{'{ "source", "target", "value" }'}</pre>

        <input id="file-input" type="file" style={{ display: 'none' }} onChange={handleInputChange} />
        <p className="modal__file-name">
          <FaFileAlt className="modal__file-icon" />
          {file?.name || t('noFileSelected')}
        </p>

        <div className="modal__buttons">
          <ButtonComponent translationKey="cancel" className="modal__cancel-button" onClick={closeModal} />
          <ButtonComponent outlined translationKey={file ? 'save' : 'import'} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ImportModalComponent;
