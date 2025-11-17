import {useEffect, useRef} from "react";
import {useDrag} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";
import {ItemTypes} from "../../dnd/ItemTypes.ts";
import LogicGateIcon from "../../Gates/LogicGateIcon.tsx";
import type {GateOnCanvasProps} from "../../interfaces/GateOnCanvasProps.ts";
import "./GateOnCanvas.css";

function GateOnCanvas({ id, type, x, y, state, value, onPortClick, onStateToggle }: GateOnCanvasProps) {
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

    const handleGateClick = (e: React.MouseEvent) => {
        // Toggle START gate state on double-click
        if (type === 'START' && e.detail === 2 && onStateToggle) {
            e.stopPropagation();
            onStateToggle(id);
        }
    };

    const renderStateIndicator = () => {
        if (type === 'START') {
            return (
                <div
                    className={`state-indicator ${state ? 'state-true' : 'state-false'}`}
                    title={`Double-click to toggle. Current: ${state ? 'TRUE' : 'FALSE'}`}
                >
                    {state ? '1' : '0'}
                </div>
            );
        } else if (type === 'END') {
            return (
                <div
                    className={`value-display ${value ? 'value-true' : 'value-false'}`}
                    title={`Output: ${value ? 'TRUE' : 'FALSE'}`}
                >
                    {value ? '1' : '0'}
                </div>
            );
        } else if (value !== undefined) {
            // Show computed value for logic gates
            return (
                <div
                    className={`value-display small ${value ? 'value-true' : 'value-false'}`}
                    title={`Output: ${value ? 'TRUE' : 'FALSE'}`}
                >
                    {value ? '1' : '0'}
                </div>
            );
        }
        return null;
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
            onClick={handleGateClick}
        >
            {type ? (
                <>
                    <LogicGateIcon label={type}/>
                    {renderPorts()}
                    {renderStateIndicator()}
                </>
            ) : null}
        </div>
    )
}

export default GateOnCanvas;