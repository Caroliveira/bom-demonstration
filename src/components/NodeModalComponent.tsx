import { useContext, useState } from 'react';
import { useStoreState } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { ButtonComponent, InputComponent } from '.';
import { CustomNodeType, MainContext } from '../context';

const defaultNodeProps = {
  position: { x: 0, y: 0 }, available: true, amount: 0, timer: 0, layer: 0,
};

const NodeModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const {
    elements, setElements, adjustLayout, showNodeModal, edgeSource, resetNodeModalStates,
  } = useContext(MainContext);
  const nodes = useStoreState((store) => store.nodes) as CustomNodeType[];

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [edgeAmount, setEdgeAmount] = useState('1');

  const close = () => {
    setName('');
    setError('');
    resetNodeModalStates();
  };

  const handleSave = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const nodeAlreadyExists = nodes.some(({ id }) => id === name);

    if (nodeAlreadyExists || !name) setError('nameError');
    else {
      let edge;
      const nodeSource = nodes.find(({ id }) => id === edgeSource);
      const node = { id: name, data: { label: name }, ...defaultNodeProps };

      if (nodeSource && edgeSource) {
        node.layer = nodeSource.layer + 1;
        node.available = nodeSource.amount >= parseInt(edgeAmount, 10);
        edge = {
          id: `${edgeSource}-${name}`, source: edgeSource, target: name, label: edgeAmount,
        };
      }

      const updatedElements = edge ? [...elements, node, edge] : [...elements, node];
      adjustLayout({ els: updatedElements });
      close();
    }
  };

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setName(evt.target.value);
  };

  if (!showNodeModal) return null;

  return (
    <div className="modal__background">
      <form className="modal" role="dialog" onSubmit={handleSave}>
        <h2 className="modal__title">{t('addItem')}</h2>

        <InputComponent
          autoFocus
          translationKey="name"
          error={error}
          value={name}
          onChange={handleNameChange}
        />

        {edgeSource && (
          <InputComponent
            translationKey={t('amountOf', { node: edgeSource })}
            type="number"
            min={1}
            value={edgeAmount}
            onChange={(evt) => setEdgeAmount(evt.target.value)}
            divStyle={{ marginTop: 16 }}
          />
        )}

        <div className="modal__buttons">
          <ButtonComponent translationKey="cancel" className="modal__cancel-button" onClick={close} />
          <ButtonComponent outlined translationKey="save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default NodeModalComponent;
