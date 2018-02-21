export const executeSyncFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'executeSync': (cmd: ICommand.ExecuteSync) => {
      const returnObj: Runner.CommandReturn = { };
      return new Promise(resolve => {
        input.commandEngine.runNodeByName(cmd.nodeName).once('done', () => resolve(returnObj))
      });
    }
  }
}