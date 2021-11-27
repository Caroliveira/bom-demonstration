import { useContext, useState, useEffect } from 'react';
import { useStoreState, removeElements } from 'react-flow-renderer';

import { InputComponent } from '.';
import { CustomNodeType, MainContext } from '../context';
import ModalComponent from './ModalComponent';

const defaultNodeProps = {
  position: { x: 0, y: 0 }, available: true, amount: 0, timer: 0, layer: 0,
};

const NodeModalComponent = (): JSX.Element | null => {
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
    const nodeAlreadyExists = name === node?.id ? false : nodes.some(({ id }) => id === name);
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

  return (
    <ModalComponent
      show={showNodeModal}
      title={node ? 'editItem' : 'addItem'}
      deleteButton={node && { translationKey: 'deleteItem', onClick: handleDelete }}
      secondaryButton={{ translationKey: 'cancel', onClick: close }}
      submitButton={{ disabled: !name, translationKey: 'save' }}
      onSubmit={handleSave}
    >
      <InputComponent
        autoFocus
        translationKey="name"
        error={error}
        value={name}
        onChange={handleNameChange}
      />
    </ModalComponent>
  );
};

export default NodeModalComponent;
