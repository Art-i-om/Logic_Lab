import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dnd/ItemTypes';
import { useState } from 'react';
import GateOnCanvas from './GateOnCanvas';

const Canvas = ({ gates, setGates }) => {
  const moveGate = (id, newX, newY) => {
    setGates((prev) =>
      prev.map((gate) => (gate.id === id ? { ...gate, x: newX, y: newY } : gate))
    );
  };

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.GATE,
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const sourceOffset = monitor.getSourceClientOffset();
      const canvas = document.getElementById('canvas');
      const canvasRect = canvas.getBoundingClientRect();

      if (!clientOffset || !sourceOffset) return;

      const offsetX = clientOffset.x - sourceOffset.x;
      const offsetY = clientOffset.y - sourceOffset.y;

      const x = clientOffset.x - canvasRect.left - offsetX;
      const y = clientOffset.y - canvasRect.top - offsetY;

      if (item.id) {
        moveGate(item.id, x, y);
      } else {
        setGates((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: item.type,
            x,
            y,
          },
        ]);
      }
    },
  }));

  return (
    <div
      id="canvas"
      ref={drop}
      style={{
        flex: 1,
        position: 'relative',
        backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        height: '100vh',
      }}
    >
      {gates.map((gate) => (
        <GateOnCanvas key={gate.id} {...gate} />
      ))}
    </div>
  );
};


export default Canvas;
