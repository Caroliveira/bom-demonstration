// import { useTranslation } from 'react-i18next';
import ReactFlow, { FlowElement, ReactFlowProvider } from 'react-flow-renderer';
import { DiagramToolbarComponent } from '../components';

const elements: FlowElement<any>[] = [
  {
    id: 'e1-2', source: '1', target: '2', animated: true,
  },
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  { id: 'e2-3', source: '2', target: '3' },
];

const DiagramScreen = (): JSX.Element => {
// const { t } = useTranslation();

  return (

    <div className="diagram">
      <ReactFlowProvider>
        <DiagramToolbarComponent />
        <div className="diagram__graph">
          <ReactFlow elements={elements} />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DiagramScreen;
