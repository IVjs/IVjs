import { IvNode } from '../../node';

export const executeJsFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'executeJs': async (cmd: ICommand.ExecuteJs) => {
      await Promise.resolve(cmd.func());
      return ({});
    }
  }
}

type AnyArgsReturnVoid = (...args: any[]) => void

export const jsRegistration = {
  apiName: 'js',
  fn(this: IvNode, func: AnyArgsReturnVoid) {
    this.pushCommands({name: 'executeJs', func});
  }
}

declare module '../../node' {
  interface NodeExtensions {
    js: AnyArgsReturnVoid
  }
}