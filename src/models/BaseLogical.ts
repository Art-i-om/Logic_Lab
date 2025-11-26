import type {Input} from "../interfaces/Input.ts";

export abstract class BaseLogical {
    protected inputs: Input[];

    constructor(inputs: Input[]) {
        this.inputs = inputs;
    }

    abstract output(): boolean;

    addInput(): void {
        this.inputs.push(new class implements Input {
            getInput(): boolean {
                return false;
            }
        });
    }

    putInput(index: number, input: Input): void {
        this.inputs[index] = input;
    }
}