import { IvNode } from '../../../node';
import { ButtonCommandsBuilder, ButtonOptions } from '../../../node-builders/button-commands-builder';
import { buttonsController, IButtonSettings } from './buttons-controller';

const buttonCommands = new ButtonCommandsBuilder();

export const addButtonFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  const baseEl = input.settings.baseContainer as HTMLElement;

  return {'addButton': (cmd: ICommand.AddButton) => {
    const settings: IButtonSettings = {
      onClick: () => input.commandEngine.runCommands(cmd.onClick),
      text: cmd.text,
      id: cmd.id,
    };
    buttonsController.createButton(settings, baseEl)
    return Promise.resolve({});
  }}
}

export function addButton(this: IvNode, input: ButtonOptions): void {
  const cmd = buttonCommands.addButton(input);
  this.pushCommands(cmd);
}

export const removeButtonFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  const baseEl = input.settings.baseContainer as HTMLElement;

  return {'removeButton': (cmd: ICommand.RemoveButton) => {
    buttonsController.removeButton(cmd.id)
    return Promise.resolve({});
  }}
}

export const removeAllButtonsFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  const baseEl = input.settings.baseContainer as HTMLElement;

  return {'removeAllButtons': (cmd: ICommand.RemoveAllButtons) => {
    buttonsController.removeAllButtons();
    return Promise.resolve({});
  }}
}

export function removeAllButtons(this: IvNode): void {
  const cmd = buttonCommands.removeAllButtons();
  this.pushCommands(cmd);
}
