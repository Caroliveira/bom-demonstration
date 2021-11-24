// import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import ReactFlow, { Elements } from 'react-flow-renderer';
import { DiagramToolbarComponent } from '../components';
import { Context } from '../context';

const DiagramScreen = (): JSX.Element => {
// const { t } = useTranslation();
  const { links, nodes } = useContext(Context);

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
