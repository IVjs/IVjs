interface VideoSettings {
  url: string;
  // loop: boolean; // TODO: implement
  goToNode: string;
  runSync: string;
  runAsync: string;
  js: (...args) => any;
}

type VideoOptions = Partial<VideoSettings>;

export type PlayVideoInput = string | VideoOptions;

export class VideoCommandsBuilder {
  public playVideo(...input: PlayVideoInput[]): ICommand.PlayVideo[] {
    if (Array.isArray(input[0])) {
      return this.handleDepricatedArrayInput(input[0] as PlayVideoInput[]);
    } else {
      return this.handleArrayInput(input);
    }
  }

  public clearVideo(time?: number): Array<ICommand.Wait | ICommand.ClearVideo> {
    const commands = [];

    if (time) {
      const msTime = time * 1000;
      const command: ICommand.Wait = { name: 'wait', time: msTime };
      commands.push(command);
    }

    const clearVideoCommand: ICommand.ClearVideo = { name: 'clearVideo' };
    commands.push(clearVideoCommand);

    return commands;
  }

  private handleDepricatedArrayInput(array: PlayVideoInput[]) {
    console.warn(
      'Passing an array to playVideo is deprecated. Just pass values as individual arguments. (Remove the `[` and `]` from the method call.)',
    );
    return this.playVideo(...array);
  }

  private handleArrayInput(input: Array<string | VideoOptions>): ICommand.PlayVideo[] {
    const singleCommand = input
      .map(objOrStr => this.guaranteedOptionsObject(objOrStr))
      .reduce(this.mergeMissingUrlsReducer, [])
      .map(vo => this.createPlayCommandFromOptions(vo))
      .reduceRight(this.reduceOnCompleteIntoPrevious, null);

    return [singleCommand];
  }

  private mergeMissingUrlsReducer(a: VideoOptions[], current: VideoOptions): VideoOptions[] {
    if (current.url) {
      a.push(current);
    } else {
      const lastObj = a[a.length - 1];
      if (!lastObj) {
        throw new Error(
          'Previous object does not exist. This error can occur if the first object passed to `playVideo` does not contain a url.',
        );
      }
      Object.assign(lastObj, current);
    }
    return a;
  }

  private reduceOnCompleteIntoPrevious(a: ICommand.PlayVideo | null, command: ICommand.PlayVideo) {
    if (!a) {
      return command;
    }
    command.onComplete = command.onComplete || [];
    command.onComplete.push(a);
    return command;
  }

  private guaranteedOptionsObject(singleInput: PlayVideoInput): VideoOptions {
    if (typeof singleInput === 'object') {
      return singleInput;
    } else {
      return { url: singleInput };
    }
  }

  private createPlayCommandFromOptions(obj: VideoOptions) {
    const addedProps = { name: 'playVideo' as 'playVideo' };
    const remappedProps = { file: obj.url };
    const commandProps = this.commandOptionsToCommands(obj);
    const finalObj: ICommand.PlayVideo = { ...addedProps, ...remappedProps, ...commandProps };
    return finalObj;
  }

  private commandOptionsToCommands(inputObj: VideoOptions): Partial<ICommand.PlayVideo> {
    let onComplete: ICommand.AnyCommand[] = [];
    function addCommands(commands: ICommand.AnyCommand | ICommand.AnyCommand[]) {
      onComplete = onComplete.concat(commands);
    }

    if (inputObj.runAsync) {
      addCommands({
        name: 'executeAsync',
        nodeName: inputObj.runAsync,
      });
    }
    if (inputObj.js) {
      addCommands({
        name: 'executeJs',
        func: inputObj.js,
      });
    }
    if (inputObj.runSync) {
      addCommands({
        name: 'executeSync',
        nodeName: inputObj.runSync,
      });
    }
    if (inputObj.goToNode) {
      addCommands([{ name: 'goToNode', nodeName: inputObj.goToNode }, { name: 'stopExecution' }]);
    }

    return onComplete.length > 0 ? { onComplete } : {};
  }
}
