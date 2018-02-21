import { CommandRunner } from '../command-runner';

export const logFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'log': (cmd: ICommand.Log) => {
         console.log(input.variables);
      return Promise.resolve({});
    }
  }
}