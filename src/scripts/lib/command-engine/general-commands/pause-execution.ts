export const pauseExecutionFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'pauseExecution': (cmd: ICommand.PauseExecution) => {
      const returnObj: Runner.CommandReturn = {
        requests: ['pause'],
      };
      return Promise.resolve(returnObj);
    }
  }
}