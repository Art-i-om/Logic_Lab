import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dnd/ItemTypes';
import './Sidebar.css';
import {SidebarProps} from "../interfaces/SidebarProps";
import {DroppedItem} from "../interfaces/DroppedItem";
import GateList from "./GateList";

const Sidebar = ({ onGateRemove }: SidebarProps) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.GATE,
    drop: (item: DroppedItem) => {
      if (item.id && onGateRemove) {
        onGateRemove(item.id);
      }
    },
  }));

  return (
    <div ref={drop} className="sidebar">
        <h3>Logic Gate</h3>
        <GateList />
    </div>
  );
};

export default Sidebar;
