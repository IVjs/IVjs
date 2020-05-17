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

export const testMediaFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    testMedia: (cmd: ICommand.TestMedia) => {
      input.variables[cmd.array].forEach(fileName => {
        const video = document.createElement('video');
        video.src = input.settings.baseVideoUrl + fileName;
        video.onloadedmetadata = () => {
          // console.log('Video exists: ' + fileName);
          video.remove();
        };
        video.onerror = () => {
          console.log('VIDEO MISSING: ' + fileName);
          video.remove();
        };
      });
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

interface AddTestMedia {
  testMedia(input: { array: string; extension?: string });
}

const testMedia: AddTestMedia['testMedia'] = function(
  this: CommandBuilderContext,
  input: { array: string; extension?: string },
): void {
  const command: ICommand.TestMedia = {
    name: 'testMedia',
    array: input.array,
    extension: input.extension,
  };
  this.pushCommands(command);
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
  nodeExtension: { log, logEnable, logDisable, testMedia },
  commandHandlerInitializers: [logFactory, logEnableFactory, logDisableFactory, testMediaFactory],
};

declare module '../../node' {
  interface NodeExtensions extends AddLog, AddLogEnable, AddLogDisable, AddTestMedia {} // tslint:disable-line no-empty-interface
}
