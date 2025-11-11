import LogicGateIcon from "../LogicGate/LogicGateIcon";
import {DragEvent} from "react";

const GateList = () => {
    const handleDragStart = (gateType: string) => (e: DragEvent) => {
        e.dataTransfer.setData('gateType', gateType);
    }

    const gateTypes = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];

    return (
        <>
            {gateTypes.map((gateType) => (
                <div
                    key={gateType}
                    className="gate-item"
                    draggable
                    onDragStart={handleDragStart(gateType)}
                >
                    <LogicGateIcon label={gateType} />
                </div>
            ))}
        </>
    );
};

export default GateList;