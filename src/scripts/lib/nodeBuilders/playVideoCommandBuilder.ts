interface VideoOptions {
  url: string;
  loop?: boolean;
  onComplete?: string;
}

type GoToCommandFunction = (str: string) => [ICommand.GoToNode, ICommand.StopExecution]

export type PlayVideoInput = (string | VideoOptions) | Array<string | VideoOptions>;

class PlayVideoCommandBuilder {
  private goToCommands: GoToCommandFunction;

  public createCommandsFromInput(input: PlayVideoInput, {goToCommand}: {goToCommand?: GoToCommandFunction} = {}): ICommand.PlayVideo[] {
    if (goToCommand) { this.goToCommands = goToCommand; }
    const inputArray = [].concat(input) as Array<VideoOptions | string>
    return inputArray.map(vs => this.createVideoObj(vs))
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
          finalObj[outgoingKey] = this.goToCommands(inputObj[incomingKey]) ;
        } else {
          finalObj[outgoingKey] = inputObj[incomingKey];
        }
      }
    }
    return finalObj;
  }
}

export const playVideoCommandBuilder = new PlayVideoCommandBuilder();