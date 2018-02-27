import { buttonsController, IButtonSettings } from './buttons-controller';

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

export const removeAllButtonsFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  const baseEl = input.settings.baseContainer as HTMLElement;

  return {'removeAllButtons': (cmd: ICommand.RemoveAllButtons) => {
    buttonsController.removeAllButtons();
    return Promise.resolve({});
  }}
}
