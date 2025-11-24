import type {Connection} from "./Connection.ts";
import type {Gate} from "./Gate.ts";

export interface ConnectionLinesProps {
    connections: Connection[];
    gates: Gate[];
    tempConnection?: {
        fromGateId: string | number;
        fromPort: string;
        toX: number;
        toY: number;
    } | null;
}