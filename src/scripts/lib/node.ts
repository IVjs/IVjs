interface VideoOptions {
  file: string;
}

interface RandomOptions {
  min: number;
  max: number;
  assignTo: string;
}

interface AssignVariableWithVar {
  assignTo: string;
  var: string;
}

interface AssignVariableWithValue  {
  assignTo: string;
  value: string | number | Array<string | number>;
}

type AssignVariableOptions =  AssignVariableWithVar | AssignVariableWithValue;


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

  public getRandom(objSettings: RandomOptions) : this {
    const command: ICommand.GetRandomNumber = { name:'getRandomNumber', min: objSettings.min, max: objSettings.max, assignTo: objSettings.assignTo };
    this.commands.push(command);
    return this;
  }

  public setVariable(objSettings: AssignVariableOptions) : this {
    if (objSettings['var'])
    {
      const command: ICommand.AssignFromVariable = { name:'assignFromVariable', varName : objSettings['var'],  assignTo: objSettings.assignTo };
      this.commands.push(command);
    }  
    else
    {
      if(objSettings['value'])
      {
        const command: ICommand.AssignVariable = { name:'assignVariable', value: objSettings['value'] , assignTo: objSettings.assignTo };
        this.commands.push(command);    
      }

    }
    return this;
  }


  public wait(time: number) : this {
    const msTime = time * 1000;
    const command: ICommand.Wait = { name:'wait', time: msTime };
    this.commands.push(command);
    return this;
  }

}
