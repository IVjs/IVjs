export interface RandNumInstructions {
  min: number;
  max: number;
  storeIn: string;
}
export declare const getRandomNumberFactory: CommandEngine.TargetFunctionFactory;
export declare function getRandomNumber(
  given: CommandEngine.TargetFunctionFactoryInput,
  cmd: ICommand.GetRandomNumber,
): Runner.CommandReturn;
export interface AddGetRandom {
  getRandom(instructions: RandNumInstructions): any;
}
export declare const getRandomNumberApi: AddGetRandom['getRandom'];
