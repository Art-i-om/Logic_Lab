import {ItemTypes} from "../../dnd/ItemTypes.ts";
import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import LogicGateIcon from "../../Gates/LogicGateIcon.tsx";
import type {DraggableGateProps} from "../../interfaces/DraggableGateProps.ts";

const DraggableGate = ({ type }: DraggableGateProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.GATE,
        item: { type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    useEffect(() => {
        drag(ref);
    }, [drag]);

    return (
        <div
            ref={ref}
            className="draggable-gate"
            style={{ opacity: isDragging ? 0.25 : 1 }}
        >
            <LogicGateIcon label={type}/>
        </div>
    )
}

export default DraggableGate;