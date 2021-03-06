export interface ButtonOptions {
  id: string;
  text: string;
  goToNode?: string;
  runAsync?: string;
  remove?: boolean;
  js?: () => any;
}

export class ButtonCommandsBuilder {
  public addButton(input: ButtonOptions) {
    const { id, text } = input;
    const cmd: ICommand.AddButton = {
      name: 'addButton',
      id,
      text,
      onClick: this.createCommands(input),
    };
    return cmd;
  }

  public removeAllButtons(): ICommand.RemoveAllButtons {
    return {
      name: 'removeAllButtons',
    };
  }

  private createCommands(input: ButtonOptions): ICommand.AnyCommand[] {
    const { runAsync, goToNode, js, remove, id } = input;
    const commands: ICommand.AnyCommand[] = [];

    if (runAsync) {
      commands.push({
        name: 'executeAsync',
        nodeName: runAsync,
      });
    }
    if (js) {
      commands.push({
        name: 'executeJs',
        func: js,
      });
    }
    if (remove) {
      commands.push({
        name: 'removeButton',
        id,
      });
    }
    if (goToNode) {
      commands.push(
        {
          name: 'goToNode',
          nodeName: goToNode,
        },
        {
          name: 'stopExecution',
        },
      );
    }

    return commands;
  }
}
