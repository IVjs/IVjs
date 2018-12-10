import { CommandHandlerInitializer, InitializerState, CommandHandlerReturn } from '../../../plugin-types';
export interface RandNumInstructions {
  min: number;
  max: number;
  storeIn: string;
}
declare type CommandObjectForGetRandom = ICommand.GetRandomNumber;
export declare const getRandomNumberFactory: CommandHandlerInitializer;
export declare function getRandomNumber(given: InitializerState, cmd: CommandObjectForGetRandom): CommandHandlerReturn;
export interface AddGetRandom {
  getRandom(instructions: RandNumInstructions): any;
}
export declare const getRandomNumberApi: AddGetRandom['getRandom'];
export {};
