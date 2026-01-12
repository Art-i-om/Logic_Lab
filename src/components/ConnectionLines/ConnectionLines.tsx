import type { ConnectionLinesProps } from "../../interfaces/ConnectionLinesProps.ts";
import './ConnectionLines.css';


const ConnectionLines = ({ connections, gates, tempConnection }: ConnectionLinesProps) => {
    const getPortPosition = (gateId: string | number, portType: string) => {
        const gate = gates.find(g => g.id === gateId);
        if (!gate) return { x: 0, y: 0 };

        const gateX = gate.x;
        const gateY = gate.y;

        // Handle output port
        if (portType === 'output') {
            if (gate.type === 'NOT') {
                // NOT gate output at y=30
                return { x: gateX + 120, y: gateY + 30 };
            } else if (gate.type === 'START' || gate.type === 'END') {
                // START/END output at y=30
                return { x: gateX + 120, y: gateY + 30 };
            } else {
                // Multi-input gates - output at center
                const count = gate.inputCount || 2;
                const gateHeight = Math.max(60, count * 18 + 20);
                const rectHeight = gateHeight - 20;
                return { x: gateX + 120, y: gateY + 10 + rectHeight / 2 };
            }
        }

        // Handle input ports
        if (portType === 'input') {
            // Single input (NOT, END)
            return { x: gateX, y: gateY + 30 };
        } else if (portType.startsWith('input')) {
            // Multi-input gates (input0, input1, input2, etc.)
            const portIndex = parseInt(portType.replace('input', ''));
            const count = gate.inputCount || 2;
            const gateHeight = Math.max(60, count * 18 + 20);
            const rectHeight = gateHeight - 20;
            const spacing = rectHeight / (count + 1);
            const yPos = 10 + spacing * (portIndex + 1);
            return { x: gateX, y: gateY + yPos };
        }

        return { x: gateX, y: gateY };
    };

    return (
        <svg className="connection-lines-svg">
            {connections.map((conn) => {
                const from = getPortPosition(conn.fromGateId, conn.fromPort);
                const to = getPortPosition(conn.toGateId, conn.toPort);

                return (
                    <line
                        key={conn.id}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke="black"
                        strokeWidth="2"
                        className="connection-line"
                    />
                );
            })}

            {tempConnection && (() => {
                const from = getPortPosition(tempConnection.fromGateId, tempConnection.fromPort);
                return (
                    <line
                        x1={from.x}
                        y1={from.y}
                        x2={tempConnection.toX}
                        y2={tempConnection.toY}
                        stroke="gray"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="temp-connection-line"
                    />
                );
            })()}
        </svg>
    );
};

export default ConnectionLines;

