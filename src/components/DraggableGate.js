// components/DraggableGate.js
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../dnd/ItemTypes';
import './DraggableGate.css';

const DraggableGate = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.GATE,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getImageSrc = () => {
    switch (type) {
      case 'AND':
        return '/assets/and.png';
      case 'OR':
        return '/assets/or-modified.svg';
      case 'NOT':
        return '/assets/not.png';
      default:
        return null;
    }
  };

  const imgSrc = getImageSrc();

  return (
    <div
      ref={drag}
      className="draggable-gate"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {imgSrc && <img src={imgSrc} alt={`${type} gate`} />}
      <div className="gate-label">{type}</div>
    </div>
  );
};

export default DraggableGate;
