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

export function createGateModel(type: string, initialState?: boolean): BaseLogical {
    const emptyInput: Input = {
        getInput: () => false
    };

    switch (type) {
        case 'START':
            return new StartLogical(initialState ?? false);
        case 'END':
            return new EndLogical(emptyInput);
        case 'AND':
            return new AndLogical([emptyInput, emptyInput]);
        case 'OR':
            return new OrLogical([emptyInput, emptyInput]);
        case 'NOT':
            return new NotLogical([emptyInput]);
        case 'NAND':
            return new NandLogical([emptyInput, emptyInput]);
        case 'NOR':
            return new NorLogical([emptyInput, emptyInput]);
        case 'XOR':
            return new XorLogical([emptyInput, emptyInput]);
        case 'XNOR':
            return new XnorLogical([emptyInput, emptyInput]);
        default:
            throw new Error(`Unknown gate type: ${type}`);
    }
}

