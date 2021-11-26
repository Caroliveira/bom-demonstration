import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState } from 'react-flow-renderer';

import { ButtonComponent, InputComponent } from '.';
import { CustomNodeType, MainContext } from '../context';

const defaultNodeProps = {
  position: { x: 0, y: 0 }, available: true, amount: 0, timer: 0, layer: 0,
};

const NodeModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const {
    elements, adjustLayout, showNodeModal, setShowNodeModal,
  } = useContext(MainContext);
  const nodes = useStoreState((store) => store.nodes) as CustomNodeType[];

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const close = () => {
    setName('');
    setError('');
    setShowNodeModal(false);
  };

  const handleSave = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const nodeAlreadyExists = nodes.some(({ id }) => id === name);

    if (nodeAlreadyExists || !name) setError('nameError');
    else {
      const node = { id: name, data: { label: name }, ...defaultNodeProps };
      adjustLayout({ els: [...elements, node] });
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

        <div className="modal__buttons">
          <ButtonComponent translationKey="cancel" className="modal__cancel-button" onClick={close} />
          <ButtonComponent outlined translationKey="save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default NodeModalComponent;
