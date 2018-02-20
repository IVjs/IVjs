import { CommandRunner } from '../commandRunner';

export const logVariablesFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'logVariables': (cmd: ICommand.LogVariables) => {
         console.log(input.variables);
      return Promise.resolve({});
    }
  }
}