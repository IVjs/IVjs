export const executeJsFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'executeJs': (cmd: ICommand.ExecuteJs) => {
      return Promise.resolve(cmd.func()).then(() => ({}));
    }
  }
}

export const jsRegistration = {
  apiName: 'js',
  fn(this: BaseNode, func: (...args: any[]) => any) {
    this.pushCommands({name: 'executeJs', func});
  }
}

declare module '../../node' {
  interface Node {
    js(...args: any[]): this
  }
}