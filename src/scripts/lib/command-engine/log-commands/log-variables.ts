import { CommandRunner } from '../command-runner';

export const logVariablesFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'logVariables': (cmd: ICommand.LogVariables) => {
         console.log(input.variables);
      return Promise.resolve({});
    }
  }
}