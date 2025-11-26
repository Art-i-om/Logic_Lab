import {BaseLogical} from "./BaseLogical.ts";

export class OrLogical extends BaseLogical{
    output(): boolean {
        return this.inputs.some(input => input.getInput());
    }
}