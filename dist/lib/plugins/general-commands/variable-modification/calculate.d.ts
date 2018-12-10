import { CommandHandlerInitializer, InitializerState, CommandHandlerReturn } from '../../../plugin-types';
interface CalculateBase {
  var: string;
  storeIn?: string;
}
declare type CalcInstructions = CalculateBase &
  Partial<{
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
export declare const calculateFactory: CommandHandlerInitializer;
export declare function doCalculate(given: InitializerState, cmd: ICommand.Calculate): CommandHandlerReturn;
export interface AddCalculate {
  calculate(instructions: CalcInstructions): any;
}
export declare const calculate: AddCalculate['calculate'];
export {};
