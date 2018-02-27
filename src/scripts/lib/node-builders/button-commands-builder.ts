export interface ButtonOptions {
  id: string;
  text: string;
  goTo?: string;
  runAsync?: string;
  remove?: boolean;
  js?: () => any,
}

export class ButtonCommandsBuilder {
  public addButton(input: ButtonOptions) {
    const { id, text } = input;
    const cmd: ICommand.AddButton = {
      name: 'addButton',
      id,
      text,
      onClick: []
    }
    return cmd;
  }
}
