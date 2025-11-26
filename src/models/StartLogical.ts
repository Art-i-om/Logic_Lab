import {BaseLogical} from "./BaseLogical.ts";

export class StartLogical extends BaseLogical{
    private value: boolean;

    constructor(value: boolean = false) {
        super([]);
        this.value = value;
    }

    output(): boolean {
        return this.value;
    }

    setValue(value: boolean): void {
        this.value = value;
    }
}