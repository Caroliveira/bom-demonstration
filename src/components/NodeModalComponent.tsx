import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonComponent } from '.';
import { MainContext } from '../context';

const NodeModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { showNodeModal, setShowNodeModal } = useContext(MainContext);

  const close = () => setShowNodeModal(false);

  if (!showNodeModal) return null;

  return (
    <div className="modal__background">
      <div className="modal" role="dialog">
        <h2 className="modal__title">{t('addNode')}</h2>

        <input id="file-input" type="file" style={{ display: 'none' }} onChange={close} />

        <div className="modal__buttons">
          <ButtonComponent translationKey="cancel" className="modal__cancel-button" onClick={close} />
          <ButtonComponent outlined translationKey="save" onClick={close} />
        </div>
      </div>
    </div>
  );
};

export default NodeModalComponent;
