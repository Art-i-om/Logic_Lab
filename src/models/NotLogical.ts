import {BaseLogical} from "./BaseLogical.ts";

export class NotLogical extends BaseLogical{
    output(): boolean {
        if (this.inputs.length !== 1) {
            throw new Error('NotLogical requires exactly one input');
        }
        return !this.inputs[0].getInput();
    }
}