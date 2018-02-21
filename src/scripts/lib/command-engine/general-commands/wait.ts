export const waitFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'wait': (cmd: ICommand.Wait) => {
      const returnObj: Runner.CommandReturn = { };
      
      return new Promise(resolve => {
        setTimeout(() => resolve(returnObj), cmd.time)
      });
    }
  }
}