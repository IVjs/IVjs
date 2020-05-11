import {
  PluginRegistration,
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerReturn,
  CommandHandlerRegistrationObject,
} from '../../../plugin-types';
import { chmod } from 'fs';
import { isNullOrUndefined } from 'util';
import { resolve } from 'url';

export const createStyleFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    createStyle: (cmd: ICommand.CreateStyle) => {
      const css = '.' + cmd.styleId + ' {' + cmd.definition + '}';
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      style.type = 'text/css';
      document.body.appendChild(style);
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
      waitFor(cmd.targetId).then(() => {
        const el: HTMLElement = document.getElementById(cmd.targetId);
        el.classList.add(cmd.styleId);
      });
      return Promise.resolve({});
    },
  };
};

function waitFor(selector: string) {
  return new Promise((res, rej) => {
    waitForElementToDisplay(selector, 200);
    // tslint:disable-next-line:no-shadowed-variable
    function waitForElementToDisplay(selector, time) {
      if (document.getElementById(selector) != null) {
        res(document.querySelector(selector));
      } else {
        setTimeout(() => {
          waitForElementToDisplay(selector, time);
        }, time);
      }
    }
  });
}

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
