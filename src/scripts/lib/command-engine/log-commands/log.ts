import { CommandRunner } from '../command-runner';

export const logFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'log': (cmd: ICommand.Log) => {
      if (cmd.value == null) {
        console.log(input.variables);
      } else {
        console.log(cmd.value)
      }
      return Promise.resolve({});
    }
  }
}