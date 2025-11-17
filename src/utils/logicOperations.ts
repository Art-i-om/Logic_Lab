/**
 * Logic gate operations
 */

export const logicGateOperations = {
    AND: (input1: boolean, input2: boolean): boolean => {
        return input1 && input2;
    },

    OR: (input1: boolean, input2: boolean): boolean => {
        return input1 || input2;
    },

    NOT: (input1: boolean, _input2: boolean): boolean => {
        // NOT gate uses only first input
        return !input1;
    },

    NAND: (input1: boolean, input2: boolean): boolean => {
        return !(input1 && input2);
    },

    NOR: (input1: boolean, input2: boolean): boolean => {
        return !(input1 || input2);
    },

    XOR: (input1: boolean, input2: boolean): boolean => {
        return input1 !== input2;
    },

    XNOR: (input1: boolean, input2: boolean): boolean => {
        return input1 === input2;
    },
};

export type LogicGateType = keyof typeof logicGateOperations;

