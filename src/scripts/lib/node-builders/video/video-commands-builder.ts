interface VideoSettings {
  url: string;
  loop: boolean;
  goTo: string;
}

type VideoOptions = Partial<VideoSettings>

type GoToCommandFunction = (str: string) => [ICommand.GoToNode, ICommand.StopExecution]

export type PlayVideoInput = (string | VideoOptions) | Array<string | VideoOptions>;

export class VideoCommandsBuilder {
  constructor(private goToCommandFunction: GoToCommandFunction) {}

  public playVideo(input: PlayVideoInput): ICommand.PlayVideo[] {
    if (Array.isArray(input)) {
      return this.handleArrayInput(input);
    } else {
      return [this.createVideoObj(input)];
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



  private handleArrayInput(input: Array<string | VideoOptions>): ICommand.PlayVideo[] {
    const singleCommand = input.map(vs => this.createVideoObj(vs))
    .reduceRight((a: ICommand.PlayVideo, command) => {
      if (!a) return command;
      command.onComplete = [a];
      return command;
    }, null)

    return [singleCommand]
  }

  private createVideoObj(input: VideoOptions | string): ICommand.PlayVideo {
    let obj: VideoOptions;
    if (typeof input === 'string') {
      obj = { url: input };
    } else {
      obj = input;
    }
    return this.getVideoObjFromOptionsObj(obj);
  }

  private getVideoObjFromOptionsObj(obj: VideoOptions) {
    const addedProps = { name: 'playVideo' };
    const remappedProps = this.mapVideoOptionsPropsToCommandProps(obj);
    const finalObj = Object.assign({}, addedProps, remappedProps) as ICommand.PlayVideo;
    return finalObj;
  }

  private mapVideoOptionsPropsToCommandProps(inputObj: VideoOptions): Partial<ICommand.PlayVideo> {
    const inputMap: {[P in keyof VideoSettings]: string} = {
      url: 'file',
      loop: 'loop',
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
