import { PluginRegistration } from '../../plugin-types';
import { IvNode } from '../../node';

export const logFactory: CommandEngine.CommandHandlerInitializer = (input): Runner.CommandHandlerRegistrationObject => {
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

const log: AddLog['log'] = function(this: IvNode, anything: any): void {
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
