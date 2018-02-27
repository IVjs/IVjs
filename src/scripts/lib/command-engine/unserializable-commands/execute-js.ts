export const executeJsFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'executeJs': (cmd: ICommand.ExecuteJs) => {
      //console.log(cmd)
      return Promise.resolve(cmd.func()).then(() => ({}));
    }
  }
}
