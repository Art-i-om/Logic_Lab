import {useEffect, useRef} from "react";
import {useDrag} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";
import {ItemTypes} from "../../dnd/ItemTypes.ts";
import LogicGateIcon from "../../Gates/LogicGateIcon.tsx";
import type {GateOnCanvasProps} from "../../interfaces/GateOnCanvasProps.ts";
import "./GateOnCanvas.css";

function GateOnCanvas({ id, type, x, y }: GateOnCanvasProps) {
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
                <LogicGateIcon label={type}/>
            ) : null}
        </div>
    )
}

export default GateOnCanvas;