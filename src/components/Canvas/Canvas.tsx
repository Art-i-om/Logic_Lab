import { useDrop } from 'react-dnd';
import { useRef } from 'react';
import {ItemTypes} from "../../dnd/ItemTypes.ts";
import type {CanvasProps} from "../../interfaces/CanvasProps.ts";
import type {Gate} from "../../interfaces/Gate.ts";
import type {DragItem} from "../../interfaces/DragItem.ts";
import GateOnCanvas from "../GateOnCanvas/GateOnCanvas.tsx";
import "./Canvas.css";

const Canvas: React.FC<CanvasProps> = ({ gates, setGates }) => {
    const canvasRef = useRef<HTMLDivElement>(null);

    const moveGate = (id: number | string, newX: number, newY: number) => {
        setGates((prev: Gate[]) =>
            prev.map((gate: Gate) => (gate.id === id ? {...gate, x: newX, y: newY} : gate))
        );
    };

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.GATE,
        drop: (item: DragItem, monitor) => {
            const clientOffset = monitor.getClientOffset();
            const sourceOffset = monitor.getSourceClientOffset();
            const canvasRect = canvasRef.current?.getBoundingClientRect();

            if (!clientOffset || !sourceOffset || !canvasRect) return;

            const offsetX = clientOffset.x - sourceOffset.x;
            const offsetY = clientOffset.y - sourceOffset.y;

            const x = clientOffset.x - canvasRect.left - offsetX;
            const y = clientOffset.y - canvasRect.top - offsetY;

            if (item.id) {
                moveGate(item.id, x, y);
            }
            else {
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

    drop(canvasRef);

    return (
        <div id="canvas" ref={canvasRef} className="canvas">
            {gates.map((gate) => (
                <GateOnCanvas key={gate.id} {...gate} moveGate={moveGate} />
            ))}
        </div>
    )
}

export default Canvas;