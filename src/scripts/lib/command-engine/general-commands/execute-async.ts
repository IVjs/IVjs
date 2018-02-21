export const executeAsyncFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'executeAsync': (cmd: ICommand.ExecuteAsync) => {
      const returnObj: Runner.CommandReturn = { };
      input.commandEngine.runNodeByName(cmd.nodeName)
      return Promise.resolve(returnObj);
    }
  }
}