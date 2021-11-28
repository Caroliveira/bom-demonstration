import { useContext, useEffect } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiEdit } from 'react-icons/fi';

import { useStoreState } from 'react-flow-renderer';
import { IconButtonComponent, ScreensHeaderComponent } from '../components';
import { CustomNodeType, MainContext } from '../context';

type RouteParams = { id: string };

const NodeScreen = ({ match }: RouteComponentProps<RouteParams>): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setShowNodeModal, node, setNode } = useContext(MainContext);
  const nodes = useStoreState((store) => store.nodes);

  useEffect(() => {
    const { id } = match.params;
    const nodeExists = nodes.find((n) => n.id === id);
    if (nodeExists) setNode(nodeExists as CustomNodeType);
    else history.push('/not-found');
    return () => setNode(undefined);
  }, []);

  return (
    <div className="node">
      <ScreensHeaderComponent title={`Item: ${node?.data.label}`}>
        <IconButtonComponent
          Icon={FiEdit}
          translationKey={t('editItem')}
          onClick={() => setShowNodeModal(true)}
          style={{ padding: 8 }}
        />
      </ScreensHeaderComponent>
    </div>
  );
};

export default NodeScreen;
