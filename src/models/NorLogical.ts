import {BaseLogical} from "./BaseLogical.ts";

export class NorLogical extends BaseLogical{
    output(): boolean {
        return !this.inputs.some(input => input.getInput());
    }
}