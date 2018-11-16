import { PluginRegistration } from '../../../base-iv';
import { IvNode } from '../../../node';

export const executeJsFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'executeJs': async (cmd: ICommand.ExecuteJs) => {
      await Promise.resolve(cmd.func());
      return ({});
    }
  }
}

type AnyArgsReturnVoid = (...args: any[]) => void

function js(this: IvNode, func: AnyArgsReturnVoid) {
  this.pushCommands({ name: 'executeJs', func });
}

export const runJsPlugin: PluginRegistration = {
  apiExtensions: [{
    apiName: 'js',
    apiFn: js,
  }],
  targetFunctionFactories: [executeJsFactory],
}

declare module '../../../node' {
  interface NodeExtensions {
    js: typeof js
  }
}