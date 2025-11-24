import type { ConnectionLinesProps } from "../../interfaces/ConnectionLinesProps.ts";
import './ConnectionLines.css';


const ConnectionLines = ({ connections, gates, tempConnection }: ConnectionLinesProps) => {
    const getPortPosition = (gateId: string | number, portType: string) => {
        const gate = gates.find(g => g.id === gateId);
        if (!gate) return { x: 0, y: 0 };

        const gateX = gate.x;
        const gateY = gate.y;

        if (portType === 'output') {
            return { x: gateX + 120, y: gateY + 30 };
        } else if (portType === 'input1') {
            return { x: gateX, y: gateY + 20 };
        } else if (portType === 'input2') {
            return { x: gateX, y: gateY + 40 };
        } else if (portType === 'input') {
            return { x: gateX, y: gateY + 30 };
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

