import { useContext } from 'react';
import ReactFlow from 'react-flow-renderer';
import { DiagramToolbarComponent } from '../components';
import { MainContext } from '../context';

const DiagramScreen = (): JSX.Element => {
  const { links, nodes } = useContext(MainContext);

  return (
    <div className="diagram">
      <DiagramToolbarComponent />
      <div className="diagram__graph">
        <ReactFlow elements={[...nodes, ...links]} />
      </div>
    </div>
  );
};

export default DiagramScreen;
