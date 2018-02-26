interface VideoSettings {
  url: string;
  // loop: boolean; // TODO: implement
  goTo: string;
}

type VideoOptions = Partial<VideoSettings>

type GoToCommandFunction = (str: string) => [ICommand.GoToNode, ICommand.StopExecution]

export type PlayVideoInput = (string | VideoOptions);

export class VideoCommandsBuilder {
  constructor(private goToCommandFunction: GoToCommandFunction) {}

  public playVideo(...input: PlayVideoInput[]): ICommand.PlayVideo[] {
    if (Array.isArray(input[0])) {
      return this.handleDepricatedArrayInput(input[0] as PlayVideoInput[]);
    } else {
      return this.handleArrayInput(input);
    }
  }

  public clearVideo(time?: number): Array<ICommand.Wait | ICommand.ClearVideo> {
    const commands = []

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
    console.warn('Passing an array to playVideo (or the alias "videoPlay") is deprecated. Just pass values as individual arguments. (Remove the `[` and `]` from the method call.)')
    return this.playVideo(...array);
  }

  private handleArrayInput(input: Array<string | VideoOptions>): ICommand.PlayVideo[] {
    const singleCommand = input
      .map(objOrStr => this.guaranteedOptionsObject(objOrStr))
      .reduce(this.mergeMissingUrlsReducer, [])
      .map(vo => this.createPlayCommandFromOptions(vo))
      .reduceRight(this.reduceOnCompleteIntoPrevious, null)

    return [singleCommand]
  }

  private mergeMissingUrlsReducer(a: VideoOptions[], current: VideoOptions): VideoOptions[] {
    if (current.url) {
      a.push(current);
    } else {
      const lastObj = a[a.length - 1];
      if (!lastObj) {
        throw new Error('Previous object does not exist. This error can occur if the first object passed to `playVideo` does not contain a url.');
      }
      Object.assign(lastObj, current);
    }
    return a;
  }

  private reduceOnCompleteIntoPrevious(
    a: ICommand.PlayVideo | null,
    command: ICommand.PlayVideo
  ) {
    if (!a) return command;
    command.onComplete = command.onComplete || [];
    command.onComplete.push(a);
    return command;
  }

  private guaranteedOptionsObject(singleInput: PlayVideoInput): VideoOptions {
    if (typeof singleInput === 'object') {
      return singleInput;
    } else {
      return {url: singleInput};
    }
  }

  private createPlayCommandFromOptions(obj: VideoOptions) {
    const addedProps = { name: 'playVideo' };
    const remappedProps = this.mapVideoOptionsPropsToCommandProps(obj);
    const finalObj = Object.assign({}, addedProps, remappedProps) as ICommand.PlayVideo;
    return finalObj;
  }

  private mapVideoOptionsPropsToCommandProps(inputObj: VideoOptions): Partial<ICommand.PlayVideo> {
    const inputMap: {[P in keyof VideoSettings]: string} = {
      url: 'file',
      // loop: 'loop',
      goTo: 'onComplete',
    }
    const finalObj = {};
    for (let prop in inputMap) {
      const incomingKey = prop;
      const outgoingKey = inputMap[prop];
      if (inputObj[incomingKey]) {
        if (outgoingKey === 'onComplete') {
          finalObj[outgoingKey] = this.goToCommandFunction(inputObj[incomingKey]) ;
        } else {
          finalObj[outgoingKey] = inputObj[incomingKey];
        }
      }
    }
    return finalObj;
  }
}
