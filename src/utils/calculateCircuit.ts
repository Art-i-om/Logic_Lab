import type { Gate } from '../interfaces/Gate';
import type { Connection } from '../interfaces/Connection';
import type { Input } from '../interfaces/Input';
import { StartLogical } from '../models/StartLogical';

// Wrapper class that implements Input interface to connect gates together
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

    // Function to recursively calculate gate values
    const getGateValue = (gateId: string | number): boolean => {
        // Return cached value if already calculated
        if (valueMap.has(gateId)) {
            return valueMap.get(gateId)!;
        }

        // Prevent infinite loops in circular dependencies
        if (visited.has(gateId)) {
            return false;
        }
        visited.add(gateId);

        const gate = gates.find(g => g.id === gateId);
        if (!gate || !gate.logicModel) {
            visited.delete(gateId);
            return false;
        }

        // Update START gate model state if changed
        if (gate.type === 'START' && gate.logicModel instanceof StartLogical) {
            gate.logicModel.setValue(gate.state ?? false);
        }

        // Set up inputs for the gate based on connections
        const inputConnections = connections.filter(conn => conn.toGateId === gateId);

        if (gate.type !== 'START' && inputConnections.length > 0) {
            // Create input wrappers for each connection
            inputConnections.forEach(conn => {
                const inputWrapper = new GateInputWrapper(conn.fromGateId, getGateValue);

                // Determine which input port to connect to
                if (conn.toPort === 'input' || conn.toPort === 'input1') {
                    gate.logicModel!.putInput(0, inputWrapper);
                } else if (conn.toPort === 'input2') {
                    gate.logicModel!.putInput(1, inputWrapper);
                }
            });
        }

        // Calculate the output using the model's output() method
        const value = gate.logicModel.output();

        valueMap.set(gateId, value);
        visited.delete(gateId);

        return value;
    };

    // Calculate values for all gates
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

