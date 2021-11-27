import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFileAlt } from 'react-icons/fa';

import { fileHandler, mountElements } from '../utils';
import { MainContext } from '../context';
import ModalComponent from './ModalComponent';

const ImportModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const history = useHistory();
  const [file, setFile] = useState<File>();
  const { showImportModal, setShowImportModal, setElements } = useContext(MainContext);

  const closeModal = () => {
    setFile(undefined);
    setShowImportModal(false);
  };

  const handleClick = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        const { nodes, edges } = fileHandler(result, file.type) || {};
        if (nodes && edges) setElements(mountElements(nodes, edges));
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

  return (
    <ModalComponent
      show={showImportModal}
      title="importTitle"
      onSubmit={handleClick}
      secondaryButton={{ translationKey: 'cancel', onClick: closeModal }}
      submitButton={{ translationKey: file ? 'save' : 'import' }}
    >
      <p className="modal__text">{t('importEspecification')}:</p>
      <pre className="modal__text--pre">{'{ "source", "target", "value" }'}</pre>

      <input
        type="file"
        id="file-input"
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />
      <p className="modal__file-name">
        <FaFileAlt className="modal__file-icon" />
        {file?.name || t('noFileSelected')}
      </p>
    </ModalComponent>
  );
};

export default ImportModalComponent;
