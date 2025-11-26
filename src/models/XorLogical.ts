import {BaseLogical} from "./BaseLogical.ts";

export class XorLogical extends BaseLogical{
    output(): boolean {
        const trueCount = this.inputs.filter(input => input.getInput()).length;
        return trueCount % 2 === 1;
    }
}