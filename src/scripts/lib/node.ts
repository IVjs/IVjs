interface VideoOptions {
  file: string;
}

type PlayVideoInput = (string | VideoOptions) | Array<string | VideoOptions>;

export class Node {
  private addingToCondition = false;

  public conditions: any[] = [];
  public buttons: any[] = [];
  public url: string = null;
  public next: string = null;
  private commands: ICommand.AnyCommand[] = [];

  public condition: any = {
    url: null,
    next: null,
    buttons: []
  }

  constructor( public name: string ) { }

  public playVideo(url: PlayVideoInput) {
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

  public nextNode(node) {
    if(this.addingToCondition) {
      this.condition.next = node;
    } else {
      this.next = node;
    }
    return this;
  }

  public addButton(buttonObj) {
    if(this.addingToCondition) {
      this.condition.buttons.push(buttonObj);
    } else {
      this.buttons.push(buttonObj);
    }
    return this;
  }

  if(conditionText) {
    // if condition needs to be added
    if(this.addingToCondition) {
      this.conditions.push(this.condition);
    } else {
      this.addingToCondition = true;
    }

    // reset condition
    this.condition = {};
    this.condition.buttons = new Array();
    this.condition.type = 'if';
    this.condition.statement = conditionText;
    return this;
  }

  else() {
    this.conditions.push(this.condition);
    this.condition = new Object();
    this.condition.type = 'else';
    return this;
  }

  endIf() {
    this.conditions.push(this.condition);
    this.addingToCondition = false;
    return this;
  }
}
