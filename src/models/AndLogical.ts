import {BaseLogical} from "./BaseLogical.ts";

export class AndLogical extends BaseLogical{
    output(): boolean {
        return this.inputs.every(input => input.getInput());
    }
}