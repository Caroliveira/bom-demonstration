import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ReactFlow, {
  addEdge,
  Connection,
  Controls,
  Edge,
  MiniMap,
  updateEdge,
} from 'react-flow-renderer';

import { DiagramToolbarComponent } from '../components';
import { MainContext } from '../context';

const DiagramScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { elements, setElements, showMiniMap } = useContext(MainContext);

  const onConnect = (params: Edge | Connection) => setElements(addEdge(params, elements));
  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    setElements(updateEdge(oldEdge, newConnection, elements));
  };

  return (
    <div className="diagram">
      <DiagramToolbarComponent />
      <div className="diagram__graph">
        {!elements.length && <span className="diagram__alert">{t('noData')}</span>}
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
        >
          <Controls />
          {showMiniMap && <MiniMap nodeColor="black" maskColor="#000A" />}
        </ReactFlow>
      </div>
    </div>
  );
};

export default DiagramScreen;
