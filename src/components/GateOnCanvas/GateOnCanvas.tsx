import {useEffect, useRef} from "react";
import {useDrag} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";
import {ItemTypes} from "../../dnd/ItemTypes.ts";
import LogicGateIcon from "../../Gates/LogicGateIcon.tsx";
import type {GateOnCanvasProps} from "../../interfaces/GateOnCanvasProps.ts";
import "./GateOnCanvas.css";

function GateOnCanvas({ id, type, x, y, state, value, inputCount = 2, onPortClick, onStateToggle, onInputCountChange }: GateOnCanvasProps) {
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
        if (type === 'START' && e.detail === 2 && onStateToggle) {
            e.stopPropagation();
            onStateToggle(id);
        }
    };

    const handleInputCountChange = (e: React.MouseEvent, delta: number) => {
        e.stopPropagation();
        if (onInputCountChange) {
            onInputCountChange(id, delta);
        }
    };

    const isMultiInputGate = () => {
        return type !== 'START' && type !== 'END' && type !== 'NOT';
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
            return (
                <div
                    className="port port-output"
                    style={{ right: '-6px', top: '24px' }}
                    onClick={(e) => handlePortClick(e, 'output')}
                />
            );
        } else if (type === 'END') {
            return (
                <div
                    className="port port-input"
                    style={{ left: '-6px', top: '24px' }}
                    onClick={(e) => handlePortClick(e, 'input')}
                />
            );
        } else if (type === 'NOT') {
            return (
                <>
                    <div
                        className="port port-input"
                        style={{ left: '-6px', top: '24px' }}
                        onClick={(e) => handlePortClick(e, 'input')}
                    />
                    <div
                        className="port port-output"
                        style={{ right: '-6px', top: '24px' }}
                        onClick={(e) => handlePortClick(e, 'output')}
                    />
                </>
            );
        } else {
            // Multi-input gates
            const count = inputCount || 2;
            const gateHeight = Math.max(60, count * 18 + 20);
            const rectHeight = gateHeight - 20;
            const spacing = rectHeight / (count + 1);

            return (
                <>
                    {/* Input ports */}
                    {Array.from({ length: count }, (_, i) => {
                        // Calculate Y position to match SVG input lines
                        const yPos = 10 + spacing * (i + 1);
                        return (
                            <div
                                key={`input${i}`}
                                className="port port-input"
                                style={{ left: '-6px', top: `${yPos - 6}px` }}
                                onClick={(e) => handlePortClick(e, `input${i}`)}
                            />
                        );
                    })}
                    {/* Output port */}
                    <div
                        className="port port-output"
                        style={{ right: '-6px', top: `${10 + rectHeight / 2 - 6}px` }}
                        onClick={(e) => handlePortClick(e, 'output')}
                    />
                </>
            );
        }
    };

    const renderInputControls = () => {
        if (!isMultiInputGate()) return null;

        const count = inputCount || 2;

        return (
            <div className="input-controls">
                <button
                    className="input-control-btn"
                    onClick={(e) => handleInputCountChange(e, -1)}
                    disabled={count <= 2}
                    title="Decrease inputs"
                >
                    −
                </button>
                <span className="input-count">{count}</span>
                <button
                    className="input-control-btn"
                    onClick={(e) => handleInputCountChange(e, 1)}
                    disabled={count >= 8}
                    title="Increase inputs"
                >
                    +
                </button>
            </div>
        );
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
                    <LogicGateIcon label={type} inputCount={inputCount}/>
                    {renderPorts()}
                    {renderStateIndicator()}
                    {renderInputControls()}
                </>
            ) : null}
        </div>
    )
}


export default GateOnCanvas;