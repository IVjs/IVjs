import {
  PluginRegistration,
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../../plugin-types';
import { chmod } from 'fs';

export const createStyleFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    createStyle: (cmd: ICommand.CreateStyle) => {
      const css = '.' + cmd.styleId + ' {' + cmd.definition + '}';
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      style.type = 'text/css';
      head.appendChild(style);
      style.innerHTML = css;
      return Promise.resolve({});
    },
  };
};

interface AddCreateStyle {
  createStyle(createStyleOptions: { styleId: string; definition: string });
}

const createStyle: AddCreateStyle['createStyle'] = function(
  this: CommandBuilderContext,
  input: { styleId: string; definition: string },
): void {
  const command: ICommand.CreateStyle = {
    name: 'createStyle',
    styleId: input.styleId,
    definition: input.definition,
  };
  this.pushCommands(command);
};

interface AddSetStyle {
  setStyle(setStyleOptions: { styleId: string; targetId: string });
}

export const setStyleFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    setStyle: (cmd: ICommand.SetStyle) => {
      console.log('setting style ' + cmd.styleId);
      const el: HTMLElement = document.getElementById(cmd.targetId);
      el.classList.add(cmd.styleId);
      return Promise.resolve({});
    },
  };
};

const setStyle: AddSetStyle['setStyle'] = function(
  this: CommandBuilderContext,
  input: { styleId: string; targetId: string },
): void {
  const command: ICommand.SetStyle = {
    name: 'setStyle',
    styleId: input.styleId,
    targetId: input.targetId,
  };
  this.pushCommands(command);
};

export const stylePlugin: PluginRegistration = {
  nodeExtension: { createStyle, setStyle },
  commandHandlerInitializers: [createStyleFactory, setStyleFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddCreateStyle, AddSetStyle {} // tslint:disable-line no-empty-interface
}
