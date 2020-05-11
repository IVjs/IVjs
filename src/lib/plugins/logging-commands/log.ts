import {
  PluginRegistration,
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../plugin-types';

export const logFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    log: (cmd: ICommand.Log) => {
      if (input.variables.isLogging) {
        if (cmd.value == null) {
          console.log(input.variables);
        } else {
          console.log(cmd.value);
        }
      }
      return Promise.resolve({});
    },
  };
};

export const logEnableFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    logEnable: (cmd: ICommand.LogEnable) => {
      input.variables.isLogging = true;
      return Promise.resolve({});
    },
  };
};

export const logDisableFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    logDisable: (cmd: ICommand.LogDisable) => {
      input.variables.isLogging = false;
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

interface AddLogEnable {
  logEnable(input: any);
}

const logEnable: AddLogEnable['logEnable'] = function(this: CommandBuilderContext, anything: any): void {
  const command: ICommand.LogEnable = {
    name: 'logEnable',
  };
  this.pushCommands(command);
};

interface AddLogDisable {
  logDisable(input: any);
}

const logDisable: AddLogDisable['logDisable'] = function(this: CommandBuilderContext, anything: any): void {
  const command: ICommand.LogDisable = {
    name: 'logDisable',
  };
  this.pushCommands(command);
};

export const logPlugin: PluginRegistration = {
  nodeExtension: { log, logEnable, logDisable },
  commandHandlerInitializers: [logFactory, logEnableFactory, logDisableFactory],
};

declare module '../../node' {
  interface NodeExtensions extends AddLog, AddLogEnable, AddLogDisable {} // tslint:disable-line no-empty-interface
}
