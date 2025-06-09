// components/Sidebar.js
import DraggableGate from './DraggableGate';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dnd/ItemTypes';

const Sidebar = ({ onGateRemove }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.GATE,
    drop: (item) => {
      if (item.id && onGateRemove) {
        onGateRemove(item.id);
      }
    },
  }));

  return (
    <div
      ref={drop}
      style={{
        width: '200px',
        height: '100vh',
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10
      }}
    >
      <h3>Logic Gates</h3>
      <DraggableGate type="AND" />
      <DraggableGate type="OR" />
      <DraggableGate type="NOT" />
    </div>
  );
};

export default Sidebar;
