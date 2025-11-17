export interface Gate {
    id: string | number;
    type: string;
    x: number;
    y: number;
    state?: boolean; // For START gates - user can toggle true/false
    value?: boolean; // Computed value for all gates
}