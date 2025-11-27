import { useRef, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../dnd/ItemTypes';
import type { DragItem } from '../../interfaces/DragItem';
import type { CanvasProps } from '../../interfaces/CanvasProps';
import type { Connection } from '../../interfaces/Connection';
import GateOnCanvas from '../GateOnCanvas/GateOnCanvas';
import ConnectionLines from '../ConnectionLines/ConnectionLines';
import { calculateGateValues } from '../../utils/calculateCircuit';
import { createGateModel } from '../../utils/gateFactory';
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
        const initialState = type === 'START' ? false : undefined;
        const newGate = {
            id: Date.now(),
            type,
            x: x - 60,
            y: y - 30,
            state: initialState,
            value: undefined,
            logicModel: createGateModel(type, initialState),
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
            if (portType === 'output') {
                setConnectingFrom({ gateId, portType });
            }
        } else {
            if (portType !== 'output') {
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

    useEffect(() => {
        const valueMap = calculateGateValues(gates, connections);

        setGates((prev) =>
            prev.map((gate) => ({
                ...gate,
                value: valueMap.get(gate.id),
            }))
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connections, gates.length, ...gates.map(g => g.state)]);

    const handleGateStateToggle = (gateId: string | number) => {
        setGates((prev) =>
            prev.map((gate) =>
                gate.id === gateId && gate.type === 'START'
                    ? { ...gate, state: !gate.state }
                    : gate
            )
        );
    };

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
                    state={gate.state}
                    value={gate.value}
                    moveGate={moveGate}
                    onPortClick={handlePortClick}
                    onStateToggle={handleGateStateToggle}
                />
            ))}
        </div>
    );
};

export default Canvas;

