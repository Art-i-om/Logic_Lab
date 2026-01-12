import { BaseLogical } from '../models/BaseLogical';
import { AndLogical } from '../models/AndLogical';
import { OrLogical } from '../models/OrLogical';
import { NotLogical } from '../models/NotLogical';
import { NandLogical } from '../models/NandLogical';
import { NorLogical } from '../models/NorLogical';
import { XorLogical } from '../models/XorLogical';
import { XnorLogical } from '../models/XnorLogical';
import { StartLogical } from '../models/StartLogical';
import { EndLogical } from '../models/EndLogical';
import type { Input } from '../interfaces/Input';

export function createGateModel(type: string, initialState?: boolean, inputCount: number = 2): BaseLogical {
    const emptyInput: Input = {
        getInput: () => false
    };

    const createInputArray = (count: number): Input[] => {
        return Array.from({ length: count }, () => ({ ...emptyInput }));
    };

    switch (type) {
        case 'START':
            return new StartLogical(initialState ?? false);
        case 'END':
            return new EndLogical(emptyInput);
        case 'AND':
            return new AndLogical(createInputArray(inputCount));
        case 'OR':
            return new OrLogical(createInputArray(inputCount));
        case 'NOT':
            return new NotLogical([emptyInput]);
        case 'NAND':
            return new NandLogical(createInputArray(inputCount));
        case 'NOR':
            return new NorLogical(createInputArray(inputCount));
        case 'XOR':
            return new XorLogical(createInputArray(inputCount));
        case 'XNOR':
            return new XnorLogical(createInputArray(inputCount));
        default:
            throw new Error(`Unknown gate type: ${type}`);
    }
}

