interface VideoOptions {
  file: string;
}

interface RandomOptions {
  min: number;
  max: number;
  assignTo: string;
}

type PlayVideoInput = (string | VideoOptions) | Array<string | VideoOptions>;

export class Node {
  private addingToCondition = false;

  private commands: ICommand.AnyCommand[] = [];


  constructor( public name: string ) { }

  public videoPlay(url: PlayVideoInput) : this {
    const newInput = [].concat(url)
    newInput.forEach(vs => this.createVideoObj(vs))
    return this;
  }

  private createVideoObj(vs: VideoOptions | string) {
    if (typeof vs === 'object') {
      const videoObj = {name: 'playVideo'};
      const finalObj = Object.assign({}, videoObj, vs) as ICommand.PlayVideo;
      this.commands.push(finalObj);
    } else {
      this.commands.push({
        file: vs,
        name: 'playVideo'
      })
    }
  }

  private createVideoCommand(url) {
    this.commands.push({
      name: 'playVideo',
      file: url
    });
  }


  public random(objSettings: RandomOptions) : this {
    const command: ICommand.GetRandomNumber = { name:'getRandomNumber', min: objSettings.min, max: objSettings.max, assignTo: objSettings.assignTo };
    this.commands.push(command);
    return this;
  }
}
