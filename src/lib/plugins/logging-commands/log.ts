import {
  PluginRegistration,
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../plugin-types';

export const logFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    log: (cmd: ICommand.Log) => {
      if (cmd.value == null) {
        console.log(input.variables);
      } else {
        console.log(cmd.value);
      }
      return Promise.resolve({});
    },
  };
};

interface AddLog {
  log(anything: any);
}

const log: AddLog['log'] = function(this: CommandBuilderContext, anything: any): void {
  const command: ICommand.Log = {
    name: 'log',
    value: anything,
  };
  this.pushCommands(command);
};

export const logPlugin: PluginRegistration = {
  nodeExtension: { log },
  commandHandlerInitializers: [logFactory],
};

declare module '../../node' {
  interface NodeExtensions extends AddLog {} // tslint:disable-line no-empty-interface
}
