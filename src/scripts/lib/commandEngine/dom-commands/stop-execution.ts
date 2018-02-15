import { CommandRunner } from '../commandRunner';

export const stopExecutionFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'stopExecution': (cmd: ICommand.StopExecution) => {
      const returnObj: Runner.CommandReturn = {
        requests: ['exit'],
      };
      return Promise.resolve(returnObj);
    }
  }
}