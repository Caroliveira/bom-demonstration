import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useZoomPanHelper } from 'react-flow-renderer';
import {
  FiPlus, FiUpload, FiZoomIn, FiZoomOut,
} from 'react-icons/fi';

import { ButtonComponent, IconButtonComponent } from '.';
import { Context } from '../context';

const DiagramToolbarComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const { zoomOut, zoomIn } = useZoomPanHelper();
  const { setShowImportModal } = useContext(Context);
  const history = useHistory();

  return (
    <div className="toolbar">
      <div className="toolbar--centered">
        <IconButtonComponent Icon={FiZoomOut} translationKey={t('zoomOut')} className="mr-2" onClick={zoomOut} />
        <IconButtonComponent Icon={FiZoomIn} translationKey={t('zoomIn')} onClick={zoomIn} />
      </div>
      <div className="toolbar--centered">
        <ButtonComponent outlined translationKey="simulate" className="toolbar__button" onClick={() => history.push('/simulator')} />
        <IconButtonComponent Icon={FiPlus} translationKey={t('addNode')} className="mr-2" />
        <IconButtonComponent Icon={FiUpload} translationKey={t('import')} onClick={() => setShowImportModal(true)} />
      </div>
    </div>
  );
};

export default DiagramToolbarComponent;
