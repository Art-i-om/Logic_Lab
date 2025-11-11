import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from '../dnd/ItemTypes';
import './DraggableGate.css';

const DraggableGate = ({ type }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.GATE,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const getImageSrc = () => {
    switch (type) {
      case 'AND':
        return '/assets/and.png';
      case 'OR':
        return '/assets/or.png';
      case 'NOT':
        return '/assets/not.png';
      case 'NAND':
        return '/assets/nand.png';
      case 'NOR':
        return '/assets/nor.png';
      case 'XOR':
        return '/assets/xor.png';
      case 'XNOR':
        return '/assets/xnor.png';
      default:
        return null;
    }
  };

  const imgSrc = getImageSrc();

  return (
    <div
      ref={drag}
      className="draggable-gate"
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      {imgSrc && <img src={imgSrc} alt={`${type} gate`} />}
      <div className="gate-label">{type}</div>
    </div>
  );
};

export default DraggableGate;
