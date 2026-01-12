export interface Connection {
    id: string | number;
    fromGateId: string | number;
    fromPort: 'output';
    toGateId: string | number;
    toPort: 'input' | 'input0' | 'input1' | 'input2' | 'input3' | 'input4' | 'input5' | 'input6' | 'input7' | string;
}

