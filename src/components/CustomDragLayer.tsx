import LogicGateIcon from "../Gates/LogicGateIcon.tsx";
import {ItemTypes} from "../dnd/ItemTypes.ts";
import {useDragLayer} from 'react-dnd';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

function getItemStyles(currentOffset) {
    if (!currentOffset) {
        return { display: 'none' };
    }
    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}

function CustomDragLayer() {
    const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging || itemType !== ItemTypes.GATE) {
        return null;
    }

    return (
        <div style={layerStyles}>
            <div style={getItemStyles(currentOffset)}>
                <div style = {{pointerEvents: 'none'}}>
                    {item ? (<LogicGateIcon label={item.type}/>) :
                        (<div style={{ pointerEvents: 'none' }}>{item.type}</div>)}
                </div>
            </div>
        </div>
    );
}

export default CustomDragLayer;