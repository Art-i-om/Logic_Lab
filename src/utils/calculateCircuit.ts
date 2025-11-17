import type { Gate } from '../interfaces/Gate';
import type { Connection } from '../interfaces/Connection';
import { logicGateOperations } from './logicOperations';

/**
 * Calculate the output values for all gates based on connections
 */
export function calculateGateValues(gates: Gate[], connections: Connection[]): Map<string | number, boolean> {
    const valueMap = new Map<string | number, boolean>();
    const visited = new Set<string | number>();

    // Helper function to get inputs for a gate
    const getGateInputs = (gateId: string | number): { input1: boolean; input2: boolean } => {
        const inputConnections = connections.filter(conn => conn.toGateId === gateId);

        let input1 = false;
        let input2 = false;

        inputConnections.forEach(conn => {
            const sourceValue = getGateValue(conn.fromGateId);
            if (conn.toPort === 'input1' || conn.toPort === 'input') {
                input1 = sourceValue;
            } else if (conn.toPort === 'input2') {
                input2 = sourceValue;
            }
        });

        return { input1, input2 };
    };

    // Recursive function to calculate gate value
    const getGateValue = (gateId: string | number): boolean => {
        // Return cached value if already calculated
        if (valueMap.has(gateId)) {
            return valueMap.get(gateId)!;
        }

        // Prevent infinite loops
        if (visited.has(gateId)) {
            return false;
        }
        visited.add(gateId);

        const gate = gates.find(g => g.id === gateId);
        if (!gate) return false;

        let value = false;

        if (gate.type === 'START') {
            // START gates have user-defined state
            value = gate.state ?? false;
        } else if (gate.type === 'END') {
            // END gates just pass through the input
            const inputs = getGateInputs(gateId);
            value = inputs.input1;
        } else {
            // Logic gates compute based on inputs
            const inputs = getGateInputs(gateId);
            const operation = logicGateOperations[gate.type as keyof typeof logicGateOperations];

            if (operation) {
                value = operation(inputs.input1, inputs.input2);
            }
        }

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

/**
 * Get all END gates with their computed values
 */
export function getEndGateResults(gates: Gate[], connections: Connection[]): Array<{ gateId: string | number; value: boolean }> {
    const valueMap = calculateGateValues(gates, connections);

    return gates
        .filter(gate => gate.type === 'END')
        .map(gate => ({
            gateId: gate.id,
            value: valueMap.get(gate.id) ?? false,
        }));
}

