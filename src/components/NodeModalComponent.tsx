import { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState, removeElements } from 'react-flow-renderer';
import { CgTrash } from 'react-icons/cg';

import { ButtonComponent, IconButtonComponent, InputComponent } from '.';
import { CustomNodeType, MainContext } from '../context';

const defaultNodeProps = {
  position: { x: 0, y: 0 }, available: true, amount: 0, timer: 0, layer: 0,
};

const NodeModalComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const {
    elements, node, adjustLayout, showNodeModal, closeNodeModal,
  } = useContext(MainContext);
  const nodes = useStoreState((store) => store.nodes) as CustomNodeType[];
  const edges = useStoreState((store) => store.edges);

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => setName(node?.id || ''), [node]);

  const close = () => {
    setName('');
    setError('');
    closeNodeModal();
  };

  const handleDelete = () => {
    if (!node) return;
    const edgesToDelete = edges.filter((edge) => {
      return edge.source === node.id || edge.target === node.id;
    });
    const elementsToDelete = [node, ...edgesToDelete];
    adjustLayout({ els: removeElements(elementsToDelete, elements) });
    close();
  };

  const handleSave = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const nodeAlreadyExists = name === node?.id ? false : nodes.some(({ id }) => id === name && id);

    if (nodeAlreadyExists) setError('nameError');
    else {
      const newNode = { id: name, data: { label: name }, ...defaultNodeProps };
      adjustLayout({ els: [...elements, newNode] });
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
        <div className="modal__header">
          <h2 className="modal__title">{t(node ? 'editItem' : 'addItem')}</h2>
          {node && (
            <IconButtonComponent
              Icon={CgTrash}
              translationKey="deleteItem"
              onClick={handleDelete}
              className="modal__icon"
              iconProps={{ color: '#821d1d' }}
            />
          )}
        </div>

        <InputComponent
          autoFocus
          translationKey="name"
          error={error}
          value={name}
          onChange={handleNameChange}
        />

        <div className="modal__buttons">
          <ButtonComponent
            translationKey="cancel"
            className="modal__cancel-button"
            onClick={close}
          />
          <ButtonComponent
            outlined
            disabled={!name}
            translationKey="save"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default NodeModalComponent;
