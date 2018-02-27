export const executeJsFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'executeJs': (cmd: ICommand.ExecuteJs) => {
      return Promise.resolve(cmd.func()).then(() => ({}));
    }
  }
}
