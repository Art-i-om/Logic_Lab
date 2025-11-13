import {useEffect, useRef} from "react";
import {useDrag} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";
import {ItemTypes} from "../../dnd/ItemTypes.ts";
import LogicGateIcon from "../../Gates/LogicGateIcon.tsx";
import type {GateOnCanvasProps} from "../../interfaces/GateOnCanvasProps.ts";
import "./GateOnCanvas.css";

function GateOnCanvas({ id, type, x, y, onPortClick }: GateOnCanvasProps) {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.GATE,
        item: { id, type, x, y },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [preview]);

    useEffect(() => {
        drag(ref);
    }, [drag]);

    const handlePortClick = (e: React.MouseEvent, portType: string) => {
        e.stopPropagation();
        if (onPortClick) {
            onPortClick(id, portType);
        }
    };

    const renderPorts = () => {
        if (type === 'START') {
            // START gate: only output port
            return (
                <div
                    className="port port-output"
                    style={{ right: '-6px', top: '24px' }}
                    onClick={(e) => handlePortClick(e, 'output')}
                />
            );
        } else if (type === 'END') {
            // END gate: only input port
            return (
                <div
                    className="port port-input"
                    style={{ left: '-6px', top: '24px' }}
                    onClick={(e) => handlePortClick(e, 'input')}
                />
            );
        } else {
            // Regular gates: two inputs and one output
            return (
                <>
                    <div
                        className="port port-input"
                        style={{ left: '-6px', top: '14px' }}
                        onClick={(e) => handlePortClick(e, 'input1')}
                    />
                    <div
                        className="port port-input"
                        style={{ left: '-6px', top: '34px' }}
                        onClick={(e) => handlePortClick(e, 'input2')}
                    />
                    <div
                        className="port port-output"
                        style={{ right: '-6px', top: '24px' }}
                        onClick={(e) => handlePortClick(e, 'output')}
                    />
                </>
            );
        }
    };

    return (
        <div
            ref={ref}
            className="gate-on-canvas"
            style={{
                left: x,
                top: y,
                opacity: isDragging ? 0 : 1,
            }}
        >
            {type ? (
                <>
                    <LogicGateIcon label={type}/>
                    {renderPorts()}
                </>
            ) : null}
        </div>
    )
}

export default GateOnCanvas;