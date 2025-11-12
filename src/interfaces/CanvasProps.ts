import type {Gate} from "./Gate.ts";
import React from 'react';

export interface CanvasProps {
    gates: Gate[];
    setGates: React.Dispatch<React.SetStateAction<Gate[]>>;
}