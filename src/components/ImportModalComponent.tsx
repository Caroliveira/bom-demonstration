import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFileAlt } from 'react-icons/fa';
import { ButtonComponent } from '.';

const ImportModalComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();

  const handleClick = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result;
        console.log(result);
      };
      reader.readAsText(file);
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
    <div className="modal__background">
      <div className="modal" role="dialog">
        <h2 className="modal__title">{t('importTitle')}</h2>
        <p className="modal__text">{t('importEspecification')}: <pre className="modal__text--pre">{'{ "source", "target", "value" }'}</pre></p>

        <input id="file-input" type="file" style={{ display: 'none' }} onChange={handleInputChange} />
        <p className="modal__file-name"><FaFileAlt className="modal__file-icon" />{file?.name || t('noFileSelected')}</p>
        <div className="modal__buttons">
          <ButtonComponent translationKey="cancel" style={{ marginRight: 30 }} />
          <ButtonComponent outlined translationKey={file ? 'save' : 'import'} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default ImportModalComponent;
