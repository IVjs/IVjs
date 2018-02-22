interface VideoOptions {
  url: string;
  loop?: boolean;
  onComplete?: string;
}

type GoToCommandFunction = (str: string) => [ICommand.GoToNode, ICommand.StopExecution]

export type PlayVideoInput = (string | VideoOptions) | Array<string | VideoOptions>;

export class VideoCommandsBuilder {
  constructor(private goToCommandFunction: GoToCommandFunction) {}

  public createCommandsFromInput(input: PlayVideoInput): ICommand.PlayVideo[] {
    if (Array.isArray(input)) {
      return this.handleArrayInput(input);
    } else {
      return [this.createVideoObj(input)];
    }
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
    const inputMap = {
      url: 'file',
      loop: 'loop',
      onComplete: 'onComplete',
    }
    const finalObj = {};
    for (let prop in inputMap) {
      const incomingKey = prop;
      const outgoingKey = inputMap[prop];
      if (inputObj[incomingKey]) {
        if (incomingKey === 'onComplete') {
          finalObj[outgoingKey] = this.goToCommandFunction(inputObj[incomingKey]) ;
        } else {
          finalObj[outgoingKey] = inputObj[incomingKey];
        }
      }
    }
    return finalObj;
  }
}
