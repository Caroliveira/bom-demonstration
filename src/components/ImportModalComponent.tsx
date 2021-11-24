import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFileAlt } from 'react-icons/fa';
import { ButtonComponent } from '.';
import { Context } from '../context';
import { fileHandler } from '../utils';

const ImportModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();
  const {
    showImportModal, setShowImportModal, setModel,
  } = useContext(Context);

  const handleClick = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        const { nodes, links } = fileHandler(result, file.type) || {};
        if (nodes && links) setModel(nodes, links);
      };
      reader.readAsText(file);
      setShowImportModal(false);
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
      <div className="modal" role="dialog">
        <h2 className="modal__title">{t('importTitle')}</h2>
        <p className="modal__text">{t('importEspecification')}:</p> <pre className="modal__text--pre">{'{ "source", "target", "value" }'}</pre>

        <input id="file-input" type="file" style={{ display: 'none' }} onChange={handleInputChange} />
        <p className="modal__file-name"><FaFileAlt className="modal__file-icon" />{file?.name || t('noFileSelected')}</p>
        <div className="modal__buttons">
          <ButtonComponent translationKey="cancel" className="modal__cancel-button" onClick={() => setShowImportModal(false)} />
          <ButtonComponent outlined translationKey={file ? 'save' : 'import'} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default ImportModalComponent;
