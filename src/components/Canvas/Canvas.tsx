import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../dnd/ItemTypes';
import type { DragItem } from '../../interfaces/DragItem';
import type { CanvasProps } from '../../interfaces/CanvasProps';
import GateOnCanvas from '../GateOnCanvas/GateOnCanvas';
import './Canvas.css';

const Canvas = ({ gates, setGates }: CanvasProps) => {
    const canvasRef = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.GATE,
        drop: (item: DragItem, monitor) => {
            const offset = monitor.getClientOffset();
            if (!offset || !canvasRef.current) return;

            const canvasRect = canvasRef.current.getBoundingClientRect();
            const x = offset.x - canvasRect.left;
            const y = offset.y - canvasRect.top;

            if (item.id !== undefined) {
                moveGate(item.id, x, y);
            } else {
                addGate(item.type, x, y);
            }
        },
    }));

    const addGate = (type: string, x: number, y: number) => {
        const newGate = {
            id: Date.now(),
            type,
            x: x - 60,
            y: y - 30
        };
        setGates((prev) => [...prev, newGate]);
    };

    const moveGate = (id: string | number, newX: number, newY: number) => {
        setGates((prev) =>
            prev.map((gate) =>
                gate.id === id
                    ? { ...gate, x: newX - 60, y: newY - 30 }
                    : gate
            )
        );
    };

    return (
        <div ref={(node) => {
            canvasRef.current = node;
            drop(node);
        }} className="canvas">
            {gates.map((gate) => (
                <GateOnCanvas
                    key={gate.id}
                    id={gate.id}
                    type={gate.type}
                    x={gate.x}
                    y={gate.y}
                    moveGate={moveGate}
                />
            ))}
        </div>
    );
};

export default Canvas;

