export interface GateOnCanvasProps extends Gate {
    moveGate: (id: number | string, newX: number, newY: number) => void;
}