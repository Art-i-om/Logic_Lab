export interface Connection {
    id: string | number;
    fromGateId: string | number;
    fromPort: 'output';
    toGateId: string | number;
    toPort: 'input1' | 'input2' | 'input';
}

