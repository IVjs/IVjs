interface VideoOptions {
  file: string;
  loop: boolean;
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

  public videoPlay(urlOrOptions: PlayVideoInput) : this {
    const inputArray = [].concat(urlOrOptions)
    const vidObjects = inputArray.map(vs => this.createVideoObj(vs))
    vidObjects.forEach(obj => this.commands.push(obj))
    return this;
  }

  private createVideoObj(vs: VideoOptions | string): ICommand.PlayVideo {
    if (typeof vs === 'object') {
      return this.getVideoObjFromOptionsObj(vs);
    } else {
      return {
        file: vs,
        name: 'playVideo'
      } as ICommand.PlayVideo;
    }
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
    for(let prop in inputMap) {
      const incomingKey = prop;
      const outgoingKey = inputMap[prop];
      if (inputObj[incomingKey]) {
        finalObj[outgoingKey] = inputObj[incomingKey];
      }
    }
    return finalObj;
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
