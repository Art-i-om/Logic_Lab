// components/DraggableGate.js
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../dnd/ItemTypes';

const DraggableGate = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.GATE,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '8px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        cursor: 'grab',
        textAlign: 'center',
      }}
    >
      {type}
    </div>
  );
};

export default DraggableGate;
