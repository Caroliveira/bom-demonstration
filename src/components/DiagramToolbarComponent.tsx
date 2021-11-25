import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FiPlus, FiUpload } from 'react-icons/fi';
import { FaMap, FaRegMap } from 'react-icons/fa';

import { ButtonComponent, IconButtonComponent } from '.';
import { MainContext } from '../context';

const DiagramToolbarComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    setShowImportModal, setShowNodeModal, showMiniMap, setShowMiniMap,
  } = useContext(MainContext);
  const history = useHistory();

  return (
    <div className="toolbar">
      <div className="toolbar--centered">
        <IconButtonComponent
          Icon={showMiniMap ? FaMap : FaRegMap}
          translationKey={t(showMiniMap ? 'hideMap' : 'showMap')}
          onClick={() => setShowMiniMap(!showMiniMap)}
          style={{ padding: 8 }}
          className="mr-2"
        />
      </div>
      <div className="toolbar--centered">
        <ButtonComponent
          outlined
          translationKey="simulate"
          className="toolbar__button"
          onClick={() => history.push('/simulator')}
        />
        <IconButtonComponent
          Icon={FiPlus}
          translationKey={t('addNode')}
          onClick={() => setShowNodeModal(true)}
          className="mr-2"
        />
        <IconButtonComponent
          Icon={FiUpload}
          translationKey={t('import')}
          onClick={() => setShowImportModal(true)}
        />
      </div>
    </div>
  );
};

export default DiagramToolbarComponent;
