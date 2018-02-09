interface VideoOptions {
  url: string;
  loop?: boolean;
}

export type PlayVideoInput = (string | VideoOptions) | Array<string | VideoOptions>;

class PlayVideoCommandBuilder {
  public createCommandsFromInput(input: PlayVideoInput): ICommand.PlayVideo[] {
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
    }
    const finalObj = {};
    for (let prop in inputMap) {
      const incomingKey = prop;
      const outgoingKey = inputMap[prop];
      if (inputObj[incomingKey]) {
        finalObj[outgoingKey] = inputObj[incomingKey];
      }
    }
    return finalObj;
  }
}

export const playVideoCommandBuilder = new PlayVideoCommandBuilder();