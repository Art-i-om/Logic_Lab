import {BaseLogical} from "./BaseLogical.ts";

export class NandLogical extends BaseLogical{
    output(): boolean {
        return !this.inputs.every(input => input.getInput());
    }
}