import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from '../dnd/ItemTypes';

function GateOnCanvas({ id, type, x, y }) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.GATE,
    item: { id, type, x, y },
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
        return '/assets/or-modified.svg';
      case 'NOT':
        return '/assets/not.png';
      case 'NAND':
        return '/assets/nand.svg';
      case 'NOR':
        return '/assets/nor.svg';
      case 'XOR':
        return '/assets/xor.svg';
      case 'XNOR':
        return '/assets/xnor.svg';
      default:
        return null;
    }
  };

  const imgSrc = getImageSrc();

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {imgSrc ? (
        <img src={imgSrc} alt={`${type} gate`} style={{ width: '100px', height: '100px' }} />
      ) : (
        <div>{type}</div>
      )}
    </div>
  );
}

export default GateOnCanvas;
