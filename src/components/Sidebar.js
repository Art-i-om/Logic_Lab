// components/Sidebar.js
import DraggableGate from './DraggableGate';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dnd/ItemTypes';
import './Sidebar.css';

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
    <div ref={drop} className="sidebar">
      <h3>Logic Gates</h3>
      <DraggableGate type="AND" />
      <DraggableGate type="OR" />
      <DraggableGate type="NOT" />
    </div>
  );
};

export default Sidebar;
