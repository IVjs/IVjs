import { PluginRegistration } from '../../../base-iv';
import { IvNode } from '../../../node';

export const executeJsFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    executeJs: async (cmd: ICommand.ExecuteJs) => {
      await Promise.resolve(cmd.func());
      return {};
    },
  };
};

type AnyArgsReturnVoid = (...args: any[]) => void;

interface AddJs {
  js(func: AnyArgsReturnVoid);
}

const js: AddJs['js'] = function jsDefinition(this: IvNode, func: AnyArgsReturnVoid) {
  this.pushCommands({ name: 'executeJs', func });
};

export const runJsPlugin: PluginRegistration = {
  nodeExtension: { js },
  commandHandlerInitializers: [executeJsFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddJs {} // tslint:disable-line no-empty-interface
}
