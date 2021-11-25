import { useContext, useState, useEffect } from 'react';
import ReactFlow from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { DiagramToolbarComponent } from '../components';
import { MainContext } from '../context';

const DiagramScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    links, nodes, setShowNodeModal, setEdgeSource,
  } = useContext(MainContext);
  const elements = [...nodes, ...links];

  const createNewNode = () => setShowNodeModal(true);

  return (
    <div className="diagram">
      <DiagramToolbarComponent />
      <div className="diagram__graph">
        {!elements.length && <span className="diagram__alert">{t('noData')}</span>}
        <ReactFlow
          elements={[...nodes, ...links]}
          onConnectStart={async (evt, { nodeId }) => setEdgeSource(nodeId || '')}
          onConnectStop={createNewNode}
        />
      </div>
    </div>
  );
};

export default DiagramScreen;
