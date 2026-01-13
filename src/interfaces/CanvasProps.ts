import type {Gate} from "./Gate.ts";
import React from 'react';
import type {Connection} from "./Connection.ts";

export interface CanvasProps {
    gates: Gate[];
    setGates: React.Dispatch<React.SetStateAction<Gate[]>>;
    connections: Connection[];
    setConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
}