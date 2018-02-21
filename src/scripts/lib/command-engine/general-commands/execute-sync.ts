export const executeSyncFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'executeSync': (cmd: ICommand.ExecuteSync) => {
      const returnObj: Runner.CommandReturn = { };
      return new Promise(async (resolve) => {
        (await input.commandEngine.runNodeByName(cmd.nodeName)).once('done', () => resolve(returnObj))
      });
    }
  }
}