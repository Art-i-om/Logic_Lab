import DraggableGate from "../components/DraggableGate.tsx";

const GateList = () => {
    const gateTypes = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];

    return (
        <>
            {gateTypes.map((gateType) => (
                <div key={gateType} className="gate-item">
                    <DraggableGate type={gateType} />
                </div>
            ))}
        </>
    )
}

export default GateList;