import { CommandBuilderContext, CommandHandlerInitializer } from '../../../plugin-types';
import { ButtonCommandsBuilder, ButtonOptions } from './button-commands-builder';
import { buttonsController, IButtonSettings } from './buttons-controller';

const buttonCommands = new ButtonCommandsBuilder();

export const addButtonFactory: CommandHandlerInitializer = (input): Runner.CommandHandlerRegistrationObject => {
  const baseEl = input.settings.baseContainer as HTMLElement;

  return {
    addButton: (cmd: ICommand.AddButton) => {
      const settings: IButtonSettings = {
        onClick: () => input.commandEngine.runCommands(cmd.onClick),
        text: cmd.text,
        id: cmd.id,
      };
      buttonsController.createButton(settings, baseEl);
      return Promise.resolve({});
    },
  };
};

export interface AddAddButton {
  addButton(instructions: ButtonOptions);
}

export const addButton: AddAddButton['addButton'] = function(this: CommandBuilderContext, input: ButtonOptions): void {
  const cmd = buttonCommands.addButton(input);
  this.pushCommands(cmd);
};

export const removeButtonFactory: CommandHandlerInitializer = (input): Runner.CommandHandlerRegistrationObject => {
  const baseEl = input.settings.baseContainer as HTMLElement;

  return {
    removeButton: (cmd: ICommand.RemoveButton) => {
      buttonsController.removeButton(cmd.id);
      return Promise.resolve({});
    },
  };
};

export const removeAllButtonsFactory: CommandHandlerInitializer = (input): Runner.CommandHandlerRegistrationObject => {
  const baseEl = input.settings.baseContainer as HTMLElement;

  return {
    removeAllButtons: (cmd: ICommand.RemoveAllButtons) => {
      buttonsController.removeAllButtons();
      return Promise.resolve({});
    },
  };
};

export interface AddRemoveAllButtons {
  removeAllButtons();
}

export const removeAllButtons: AddRemoveAllButtons['removeAllButtons'] = function(this: CommandBuilderContext): void {
  const cmd = buttonCommands.removeAllButtons();
  this.pushCommands(cmd);
};
