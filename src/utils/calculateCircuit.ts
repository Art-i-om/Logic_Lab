import type { Gate } from '../interfaces/Gate';
import type { Connection } from '../interfaces/Connection';
import type { Input } from '../interfaces/Input';
import { StartLogical } from '../models/StartLogical';

class GateInputWrapper implements Input {
    sourceGateId: string | number;
    getGateValueFn: (gateId: string | number) => boolean;

    constructor(
        sourceGateId: string | number,
        getGateValueFn: (gateId: string | number) => boolean
    ) {
        this.sourceGateId = sourceGateId;
        this.getGateValueFn = getGateValueFn;
    }

    getInput(): boolean {
        return this.getGateValueFn(this.sourceGateId);
    }
}

export function calculateGateValues(gates: Gate[], connections: Connection[]): Map<string | number, boolean> {
    const valueMap = new Map<string | number, boolean>();
    const visited = new Set<string | number>();

    const getGateValue = (gateId: string | number): boolean => {
        if (valueMap.has(gateId)) {
            return valueMap.get(gateId)!;
        }

        if (visited.has(gateId)) {
            return false;
        }
        visited.add(gateId);

        const gate = gates.find(g => g.id === gateId);
        if (!gate || !gate.logicModel) {
            visited.delete(gateId);
            return false;
        }

        if (gate.type === 'START' && gate.logicModel instanceof StartLogical) {
            gate.logicModel.setValue(gate.state ?? false);
        }

        if (gate.type !== 'START') {
            gate.logicModel.resetInputs();
        }

        const inputConnections = connections.filter(conn => conn.toGateId === gateId);

        if (gate.type !== 'START' && inputConnections.length > 0) {
            inputConnections.forEach(conn => {
                const inputWrapper = new GateInputWrapper(conn.fromGateId, getGateValue);

                if (conn.toPort === 'input') {
                    // Single input gates (NOT, END)
                    gate.logicModel!.putInput(0, inputWrapper);
                } else if (conn.toPort.startsWith('input')) {
                    // Multi-input gates - extract index from port name (e.g., "input0", "input1", etc.)
                    const portIndex = parseInt(conn.toPort.replace('input', ''));
                    gate.logicModel!.putInput(portIndex, inputWrapper);
                }
            });
        }

        const value = gate.logicModel.output();

        valueMap.set(gateId, value);
        visited.delete(gateId);

        return value;
    };

    gates.forEach(gate => {
        getGateValue(gate.id);
    });

    return valueMap;
}


export function getEndGateResults(gates: Gate[], connections: Connection[]): Array<{ gateId: string | number; value: boolean }> {
    const valueMap = calculateGateValues(gates, connections);

    return gates
        .filter(gate => gate.type === 'END')
        .map(gate => ({
            gateId: gate.id,
            value: valueMap.get(gate.id) ?? false,
        }));
}

