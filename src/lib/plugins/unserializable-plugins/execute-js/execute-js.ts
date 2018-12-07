import { PluginRegistration, CommandBuilderContext } from '../../../plugin-types';

export const executeJsFactory: CommandEngine.CommandHandlerInitializer = (
  input,
): Runner.CommandHandlerRegistrationObject => {
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

const js: AddJs['js'] = function jsDefinition(this: CommandBuilderContext, func: AnyArgsReturnVoid) {
  this.pushCommands({ name: 'executeJs', func });
};

export const runJsPlugin: PluginRegistration = {
  nodeExtension: { js },
  commandHandlerInitializers: [executeJsFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddJs {} // tslint:disable-line no-empty-interface
}
