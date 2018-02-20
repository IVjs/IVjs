import { PlayVideoInput, playVideoCommandBuilder } from './node-builders/video-play-command-builder';

interface SwitchBase {
  var: string;
}

interface Is extends SwitchBase {
  is: string | number | boolean;
}

interface IsGreaterThan extends SwitchBase {
  isGreaterThan: number;
}

interface IsLessThan extends SwitchBase {
  isLessThan: number;
}

interface IsBetween extends SwitchBase {
  isBetween: number[];
}


interface IsGreaterThanOrEqualTo extends SwitchBase {
  isGreaterThanOrEqualTo: number;
}

interface IsLessThanOrEqualTo extends SwitchBase {
  isLessThanOrEqualTo: number;
}

type ifOptions  =
    Is
  | IsGreaterThan
  | IsLessThan
  | IsGreaterThanOrEqualTo
  | IsLessThanOrEqualTo
  | IsBetween


interface RandomOptions {
  min: number;
  max: number;
  storeIn: string;
}

interface CalculateBase {
  var: string;
  storeIn: string;
}

interface CalculateAdd extends CalculateBase {
  add: number;
}

interface CalculateSubtract extends CalculateBase {
  subtract: number;
}

interface CalculateMultiply extends CalculateBase {
  multiply: number;
}

interface CalculateDivide extends CalculateBase {
  divide: number;
}

type CalculateOptions =
    CalculateAdd
  | CalculateSubtract
  | CalculateMultiply
  | CalculateDivide

interface AssignVariableWithVar {
  storeIn: string;
  var: string;
}

interface AssignVariableWithValue  {
  storeIn: string;
  value: string | number | Array<string | number>;
}



type AssignVariableOptions =  AssignVariableWithVar | AssignVariableWithValue;

export class Node implements IvNode {

  private commands: ICommand.AnyCommand[] = [];
  private switchDo: ICommand.Switch;
  private pushType: string = 'main';

  constructor( public name: string ) { }


  public getCommands() {
    return this.commands;
  }

  private pusher(command: ICommand.AnyCommand){
    if(this.pushType == 'condition')
    {
      this.switchDo.do[this.switchDo.do.length - 1].commands.push(command);
    }
    else if(this.pushType == 'default')
    {
      this.switchDo.defaultCommands.push(command);
    }
    else
    {
      this.commands.push(command);
    }
  }

  public if(optionsObj: ifOptions): this {
    //TODO: need to instantiate a new for each if.
    if (this.switchDo == null)
    {
    this.switchDo = {name: 'switch', do: [], defaultCommands: []};
    }
    this.pushType = 'condition';
      if (optionsObj['is'])
      {
        this.switchDo.do.push({varName: optionsObj.var, is: optionsObj['is'], commands: []});
      }
      else if (optionsObj['isGreaterThan'])
      {
        this.switchDo.do.push({varName: optionsObj.var, isGreaterThan: optionsObj['isGreaterThan'], commands: []});
      }
      else if (optionsObj['isLessThan'])
      {
        this.switchDo.do.push({varName: optionsObj.var, isLessThan: optionsObj['isLessThan'], commands: []});
      }  
      else if (optionsObj['isBetween'])
      {
        this.switchDo.do.push({varName: optionsObj.var, isBetween: optionsObj['isBetween'], commands: []});
      }  
      else if (optionsObj['isGreaterThanOrEqualTo'])
      {
        this.switchDo.do.push({varName: optionsObj.var, isGreaterThanOrEqualTo: optionsObj['isGreaterThanOrEqualTo'], commands: []});
      } 
      else if (optionsObj['isLessThanOrEqualTo'])
      {
        this.switchDo.do.push({varName: optionsObj.var, isGreaterThanOrEqualTo: optionsObj['isLessThanOrEqualTo'], commands: []});
      }   
    return this;
  }

  public else(): this {
    this.pushType = 'default';
    return this;
  }

  public endIf(): this {
    this.pushType = 'main';
    this.pusher(this.switchDo);
    return this;
  }

  public videoPlay(urlOrOptions: PlayVideoInput) : this {
    const videoCommands = playVideoCommandBuilder.createCommandsFromInput(urlOrOptions, {goToCommand: this.buildGoToNodeCommandSet.bind(this)})
    videoCommands.forEach(obj => this.pusher(obj))
    return this;
  }

  public getRandom(objSettings: RandomOptions) : this {
    const command: ICommand.GetRandomNumber = { name:'getRandomNumber', min: objSettings.min, max: objSettings.max, assignTo: objSettings.storeIn };
    this.pusher(command);
    return this;
  }

  public setVariable(objSettings: AssignVariableOptions) : this {
    if (objSettings['var'])
    {
      const command: ICommand.AssignFromVariable = { name:'assignFromVariable', varName : objSettings['var'],  assignTo: objSettings.storeIn };
      this.pusher(command);
    }  
    else
    {
      if(objSettings['value'])
      {
        const command: ICommand.AssignVariable = { name:'assignVariable', value: objSettings['value'] , assignTo: objSettings.storeIn };
        this.pusher(command);    
      }

    }
    return this;
  }


  public wait(time: number) : this {
    const msTime = time * 1000;
    const command: ICommand.Wait = { name:'wait', time: msTime };
    this.pusher(command);
    return this;
  }

  
  public calculate(optionsObj: CalculateOptions) : this {
    var op:string = '';
    var val:number = 0;
    if(optionsObj['add'])
    {
      op = 'add';
      val = optionsObj['add'];
    }
    else if(optionsObj['subtract'])
    {
      op = 'subtract';
      val = optionsObj['subtract'];
    }
    else if(optionsObj['multiply'])
    {
      op = 'multiply';
      val = optionsObj['multiply'];
    }
    else if(optionsObj['divide'])
    {
      op = 'divide';
      val = optionsObj['divide'];
    }
    else{
      const received = [];
      for (const prop in optionsObj) {
        if (optionsObj.hasOwnProperty(prop)) {
          received.push(`"${prop}"`);
        }
      }
      const message = `Unknown options passed into Calculate(). Was expecting "var", "storeIn" and then one of "add", "subtract", "multiply", or "delete". Received [${received.join(', ')}]`
      throw new Error(message)
    }

    const command: ICommand.Calculate = {
      name:'calculate',
      varName:optionsObj.var,
      operation: op as ICommand.Calculate['operation'],
      value: val,
      assignTo: optionsObj.storeIn
    };
    this.pusher(command);
    return this;
  }

  public goto(nodeName: string) : this { 
    const commands = this.buildGoToNodeCommandSet(nodeName);
    commands.forEach(c => this.pusher(c))
    return this;
  }

  private buildGoToNodeCommandSet(nodeName: string): [
    ICommand.GoToNode,
    ICommand.StopExecution
  ] {
    return [
      { name: 'goToNode', nodeName: nodeName },
      { name: 'stopExecution' }
    ];
  }

  public execute(nodeName: string) : this { 
    const command: ICommand.ExecuteAsync = {name:'executeAsync', nodeName: nodeName};
    this.pusher(command);
    return this;
  }

  public logVars() : this { 
    const command: ICommand.LogVariables = {name:'logVariables',};
    this.pusher(command);
    return this;
  }

  public goSub(nodeName: string) : this { 
    const command: ICommand.ExecuteSync = {name:'executeSync', nodeName: nodeName};
    this.pusher(command);
    const commandPause: ICommand.PauseExecution = {name:'pauseExecution'};
    this.pusher(commandPause);
    return this;
  }


  public return() : this { 
    const commandStop: ICommand.StopExecution = {name:'stopExecution'};
    this.pusher(commandStop);
    return this;
  }

  public bgAudio(input: 'play' | 'pause' | { load: string }) {
    const command = this.bgAudioCommand(input)
    this.pusher(command);
    return this;
  }

  private bgAudioCommand(input: 'play' | 'pause' | { load: string }): ICommand.AudioSource {
    if (typeof input === 'string') {
      return {
        name: 'audioSource',
        target: 'BG',
        do: input,
      }
    } else {
      return {
        name: 'audioSource',
        target: 'BG',
        do: 'load',
        file: input.load
      }
    }
  }

  public videoClear(time: number | null) : this {
    
    if (time)
    {
      const msTime = time * 1000;
      const command: ICommand.Wait = { name:'wait', time: msTime };
      this.pusher(command);
    }

    const videoClearCommand: ICommand.ClearVideo = {name:'clearVideo'};
    this.pusher(videoClearCommand);

    return this;
  }

}
