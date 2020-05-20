interface SoundSettings {
  url: string;
  // loop: boolean; // TODO: implement
  goToNode: string;
  runSync: string;
  runAsync: string;
  js: (...args) => any;
}

type SoundOptions = Partial<SoundSettings>;

export type PlaySoundInput = string | SoundOptions;

export class SoundCommandsBuilder {
  public playSound(...input: PlaySoundInput[]): ICommand.PlaySound[] {
    if (Array.isArray(input[0])) {
      console.log('handling array' + input[0]);
      return this.handleDepricatedArrayInput(input[0] as PlaySoundInput[]);
    } else {
      return this.handleArrayInput(input);
    }
  }

  private handleDepricatedArrayInput(array: PlaySoundInput[]) {
    console.log('playing array');
    console.warn(
      'Passing an array to playSound is deprecated. Just pass values as individual arguments. (Remove the `[` and `]` from the method call.)',
    );
    return this.playSound(...array);
  }

  private handleArrayInput(input: Array<string | SoundOptions>): ICommand.PlaySound[] {
    const singleCommand = input
      .map(objOrStr => this.guaranteedOptionsObject(objOrStr))
      .reduce(this.mergeMissingUrlsReducer, [])
      .map(vo => this.createPlayCommandFromOptions(vo))
      .reduceRight(this.reduceOnCompleteIntoPrevious, null);

    return [singleCommand];
  }

  private mergeMissingUrlsReducer(a: SoundOptions[], current: SoundOptions): SoundOptions[] {
    if (current.url) {
      a.push(current);
    } else {
      const lastObj = a[a.length - 1];
      if (!lastObj) {
        throw new Error(
          'Previous object does not exist. This error can occur if the first object passed to `playSound` does not contain a url.',
        );
      }
      Object.assign(lastObj, current);
    }
    return a;
  }

  private reduceOnCompleteIntoPrevious(a: ICommand.PlaySound | null, command: ICommand.PlaySound) {
    if (!a) {
      return command;
    }
    command.onComplete = command.onComplete || [];
    command.onComplete.push(a);
    return command;
  }

  private guaranteedOptionsObject(singleInput: PlaySoundInput): SoundOptions {
    if (typeof singleInput === 'object') {
      return singleInput;
    } else {
      return { url: singleInput };
    }
  }

  private createPlayCommandFromOptions(obj: SoundOptions) {
    const addedProps = { name: 'playSound' as 'playSound' };
    const remappedProps = { file: obj.url };
    const commandProps = this.commandOptionsToCommands(obj);
    const finalObj: ICommand.PlaySound = { ...addedProps, ...remappedProps, ...commandProps };
    return finalObj;
  }

  private commandOptionsToCommands(inputObj: SoundOptions): Partial<ICommand.PlaySound> {
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
