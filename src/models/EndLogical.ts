import {BaseLogical} from "./BaseLogical.ts";
import type {Input} from "../interfaces/Input.ts";

export class EndLogical extends BaseLogical{
    constructor(input: Input) {
        super([input]);
    }

    output(): boolean {
        return this.inputs.length > 0 ? this.inputs[0].getInput() : false;
    }
}