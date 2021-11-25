import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonComponent, InputComponent } from '.';
import { MainContext } from '../context';

const NodeModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const {
    showNodeModal, setShowNodeModal, nodes, addNode, addLink, edgeSource, setEdgeSource,
  } = useContext(MainContext);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [edgeAmount, setEdgeAmount] = useState('1');

  const close = () => {
    setName('');
    setError('');
    setShowNodeModal(false);
    setEdgeSource('');
  };

  const handleSave = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const nodeAlreadyExists = nodes.some(({ id }) => id === name);

    if (nodeAlreadyExists || !name) setError('nameError');
    else {
      let layer = 0;
      let available = true;
      const position = { x: 0, y: 0 };
      const nodeSource = nodes.find(({ id }) => id === edgeSource);

      if (nodeSource && edgeSource) {
        layer = nodeSource.layer + 1;
        position.x = nodeSource.position.x;
        position.y = nodeSource.position.y + 150;
        available = nodeSource.amount >= parseInt(edgeAmount, 10);
        addLink({
          id: `${edgeSource}-${name}`,
          source: edgeSource,
          target: name,
          label: edgeAmount,
        });
      }

      addNode({
        id: name,
        data: { label: name },
        layer,
        position,
        available,
        amount: 0,
        timer: 0,
      });

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
