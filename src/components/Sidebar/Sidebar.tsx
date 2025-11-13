import type {SidebarProps} from "../../interfaces/SidebarProps.ts";
import type {DroppedItem} from "../../interfaces/DroppedItem.ts";
import {ItemTypes} from "../../dnd.ts";
import { useDrop } from 'react-dnd';
import { useRef } from 'react';
import './Sidebar.css';
import GateList from "../../Gates/GateList.tsx";

const Sidebar = ({ onGateRemove }: SidebarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: ItemTypes.GATE,
        drop: (item: DroppedItem) => {
            if (item.id && onGateRemove) {
                onGateRemove(item.id);
            }
        },
    }));

    drop(ref);

    return (
        <div ref={ref} className="sidebar">
            <h3>Logic Gate</h3>
            <GateList />
        </div>
    );
}

export default Sidebar;