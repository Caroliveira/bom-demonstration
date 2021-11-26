import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FiPlus, FiUpload } from 'react-icons/fi';
import { FaMap, FaRegMap } from 'react-icons/fa';
import { CgMoveDown, CgMoveRight } from 'react-icons/cg';

import { ButtonComponent, IconButtonComponent } from '.';
import { MainContext } from '../context';

const layout = {
  TB: { Icon: CgMoveDown, label: 'Vertical' },
  LR: { Icon: CgMoveRight, label: 'Horizontal' },
};

const DiagramToolbarComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const [direction, setDirection] = useState<'TB' | 'LR'>('TB');
  const {
    adjustLayout,
    setShowImportModal,
    setShowNodeModal,
    showMiniMap,
    setShowMiniMap,
  } = useContext(MainContext);
  const history = useHistory();

  const onDirectionChange = () => {
    const newDirection = direction === 'TB' ? 'LR' : 'TB';
    adjustLayout(newDirection);
    setDirection(newDirection);
  };

  return (
    <div className="toolbar">
      <div className="toolbar--centered">
        <IconButtonComponent
          Icon={showMiniMap ? FaMap : FaRegMap}
          translationKey={showMiniMap ? 'hideMap' : 'showMap'}
          onClick={() => setShowMiniMap(!showMiniMap)}
          style={{ padding: 10 }}
          className="mr-2"
        />
        <IconButtonComponent
          Icon={layout[direction].Icon}
          translationKey={t('layoutFormat', { layout: layout[direction].label })}
          onClick={onDirectionChange}
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
