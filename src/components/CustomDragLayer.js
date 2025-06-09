import React from 'react';
import { useDragLayer } from 'react-dnd';
import { ItemTypes } from '../dnd/ItemTypes';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return { display: 'none' };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const getImageSrc = (type) => {
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

function CustomDragLayer() {
  const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || itemType !== ItemTypes.GATE) {
    return null;
  }

  const imgSrc = getImageSrc(item.type);

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(currentOffset)}>
        {imgSrc ? (
          <img src={imgSrc} alt={`${item.type} gate`} style={{ width: '100px', height: '100px', pointerEvents: 'none' }} />
        ) : (
          <div style={{ pointerEvents: 'none' }}>{item.type}</div>
        )}
      </div>
    </div>
  );
}

export default CustomDragLayer;
