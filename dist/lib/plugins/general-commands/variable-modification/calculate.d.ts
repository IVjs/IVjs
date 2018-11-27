interface CalculateBase {
    var: string;
    storeIn?: string;
}
declare type CalcInstructions = CalculateBase & Partial<{
    add: number | string;
    subtract: number | string;
    multiply: number | string;
    divide: number | string;
    remainderAfterDivideBy: number | string;
    roundDownAfterDivideBy: number | string;
    roundUpAfterDivideBy: number | string;
    roundAfterDivideBy: number | string;
    round: any;
    roundUp: any;
    roundDown: any;
}>;
export declare const calculateFactory: CommandEngine.TargetFunctionFactory;
export declare function doCalculate(given: CommandEngine.TargetFunctionFactoryInput, cmd: ICommand.Calculate): Runner.CommandReturn;
export interface AddCalculate {
    calculate(instructions: CalcInstructions): any;
}
export declare const calculate: AddCalculate['calculate'];
export {};
