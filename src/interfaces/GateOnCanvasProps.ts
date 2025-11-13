import type { Gate } from './Gate';

export interface GateOnCanvasProps extends Gate {
    moveGate: (id: number | string, newX: number, newY: number) => void;
    onPortClick?: (gateId: string | number, portType: string) => void;
}