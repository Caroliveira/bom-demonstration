import { useContext, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import ReactFlow, {
  addEdge,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  updateEdge,
} from 'react-flow-renderer';

import { DiagramToolbarComponent } from '../components';
import { CustomNodeType, MainContext } from '../context';

const DiagramScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    elements, setElements, setNode, showMiniMap, setShowNodeModal,
  } = useContext(MainContext);

  const onConnect = (params: Edge | Connection) => {
    setElements(addEdge({ ...params, label: 1 }, elements));
  };

  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    setElements(updateEdge(oldEdge, newConnection, elements));
  };

  const onNodeDoubleClick = (evt: MouseEvent, node: Node) => {
    setNode(node as CustomNodeType);
    setShowNodeModal(true);
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
          onNodeDoubleClick={onNodeDoubleClick}
        >
          <Controls />
          {showMiniMap && <MiniMap nodeColor="black" maskColor="#000A" />}
        </ReactFlow>
      </div>
    </div>
  );
};

export default DiagramScreen;
