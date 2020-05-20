import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  InitializerState,
  CommandHandlerRegistrationObject,
  CommandHandlerReturn,
} from '../../../plugin-types';

export const saveStateFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    saveState: (cmd: ICommand.SaveState) => {
      input.settings.stateVariables.forEach(variable => {
        localStorage[variable] = input.variables[variable];
      });
      return Promise.resolve({});
    },
  };
};

export interface AddSaveState {
  saveState();
}

export const saveState: AddSaveState['saveState'] = function(this: CommandBuilderContext) {
  const command: ICommand.SaveState = {
    name: 'saveState',
  };
  this.pushCommands(command);
};

export const loadStateFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    loadState: (cmd: ICommand.LoadState) => {
      input.settings.stateVariables.forEach(variable => {
        if (localStorage[variable]) {
          // tslint:disable-next-line:prefer-conditional-expression
          if (isNumeric(localStorage[variable])) {
            input.variables[variable] = parseFloat(localStorage[variable]);
          } else {
            input.variables[variable] = localStorage[variable];
          }
        }
      });
      return Promise.resolve({});
    },
  };
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export interface AddLoadState {
  loadState();
}

export const loadState: AddLoadState['loadState'] = function(this: CommandBuilderContext) {
  const command: ICommand.LoadState = {
    name: 'loadState',
  };
  this.pushCommands(command);
};

export const clearStateFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    clearState: (cmd: ICommand.ClearState) => {
      localStorage.clear();
      return Promise.resolve({});
    },
  };
};

export interface AddClearState {
  clearState();
}

export const clearState: AddClearState['clearState'] = function(this: CommandBuilderContext) {
  const command: ICommand.ClearState = {
    name: 'clearState',
  };
  this.pushCommands(command);
};
