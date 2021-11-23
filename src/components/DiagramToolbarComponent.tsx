import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useZoomPanHelper } from 'react-flow-renderer';
import {
  FiPlus, FiUpload, FiZoomIn, FiZoomOut,
} from 'react-icons/fi';

import { IconButtonComponent } from '.';
import { Context } from '../context';

const DiagramToolbarComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const { zoomOut, zoomIn } = useZoomPanHelper();
  const { setShowImportModal } = useContext(Context);

  return (
    <div className="toolbar">
      <div>
        <IconButtonComponent Icon={FiZoomOut} translationKey={t('zoomOut')} className="mr-2" onClick={zoomOut} />
        <IconButtonComponent Icon={FiZoomIn} translationKey={t('zoomIn')} onClick={zoomIn} />
      </div>
      <div>
        <IconButtonComponent Icon={FiPlus} translationKey={t('addNode')} className="mr-2" />
        <IconButtonComponent Icon={FiUpload} translationKey={t('import')} onClick={() => setShowImportModal(true)} />
      </div>
    </div>
  );
};

export default DiagramToolbarComponent;
