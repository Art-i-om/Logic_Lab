import { useRef, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../dnd/ItemTypes';
import type { DragItem } from '../../interfaces/DragItem';
import type { CanvasProps } from '../../interfaces/CanvasProps';
import type { Connection } from '../../interfaces/Connection';
import GateOnCanvas from '../GateOnCanvas/GateOnCanvas';
import ConnectionLines from '../ConnectionLines/ConnectionLines';
import './Canvas.css';

const Canvas = ({ gates, setGates }: CanvasProps) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [connectingFrom, setConnectingFrom] = useState<{
        gateId: string | number;
        portType: string;
    } | null>(null);
    const [tempConnection, setTempConnection] = useState<{
        fromGateId: string | number;
        fromPort: string;
        toX: number;
        toY: number;
    } | null>(null);

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

    const handlePortClick = (gateId: string | number, portType: string) => {
        if (!connectingFrom) {
            // Start connection from output port
            if (portType === 'output') {
                setConnectingFrom({ gateId, portType });
            }
        } else {
            // Complete connection to input port
            if (portType !== 'output') {
                // Check if connecting from different gate
                if (connectingFrom.gateId !== gateId) {
                    const newConnection: Connection = {
                        id: Date.now(),
                        fromGateId: connectingFrom.gateId,
                        fromPort: 'output',
                        toGateId: gateId,
                        toPort: portType as 'input1' | 'input2' | 'input',
                    };
                    setConnections((prev) => [...prev, newConnection]);
                }
                setConnectingFrom(null);
                setTempConnection(null);
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (connectingFrom && canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setTempConnection({
                fromGateId: connectingFrom.gateId,
                fromPort: connectingFrom.portType,
                toX: x,
                toY: y,
            });
        }
    };

    const handleCanvasClick = () => {
        // Cancel connection if clicking on canvas
        if (connectingFrom) {
            setConnectingFrom(null);
            setTempConnection(null);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && connectingFrom) {
                setConnectingFrom(null);
                setTempConnection(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [connectingFrom]);

    return (
        <div
            ref={(node) => {
                canvasRef.current = node;
                drop(node);
            }}
            className="canvas"
            onMouseMove={handleMouseMove}
            onClick={handleCanvasClick}
        >
            <ConnectionLines
                connections={connections}
                gates={gates}
                tempConnection={tempConnection}
            />
            {gates.map((gate) => (
                <GateOnCanvas
                    key={gate.id}
                    id={gate.id}
                    type={gate.type}
                    x={gate.x}
                    y={gate.y}
                    moveGate={moveGate}
                    onPortClick={handlePortClick}
                />
            ))}
        </div>
    );
};

export default Canvas;

