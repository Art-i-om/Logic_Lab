import {ItemTypes} from "../dnd/ItemTypes.ts";
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import LogicGateIcon from "../Gates/LogicGateIcon.tsx";

const DraggableGate = ({ type }) => {
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

    return (
        <div
            ref={drag}
            className="draggable-gate"
            style={{ opacity: isDragging ? 0 : 1 }}
        >
            <LogicGateIcon label={type}/>
        </div>
    )
}

export default DraggableGate;