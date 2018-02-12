import { PlayVideoInput, playVideoCommandBuilder } from './nodeBuilders/playVideoCommandBuilder';

interface RandomOptions {
  min: number;
  max: number;
  storeIn: string;
}

interface CalculateOptions {
  var: string;
  operation: string;
  storeIn: string;
}

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
  private addingToCondition = false;

  private commands: ICommand.AnyCommand[] = [];

  constructor( public name: string ) { }

  public getCommands() {
    return this.commands;
  }

  public videoPlay(urlOrOptions: PlayVideoInput) : this {
    const videoCommands = playVideoCommandBuilder.createCommandsFromInput(urlOrOptions)
    videoCommands.forEach(obj => this.commands.push(obj))
    return this;
  }

  public getRandom(objSettings: RandomOptions) : this {
    const command: ICommand.GetRandomNumber = { name:'getRandomNumber', min: objSettings.min, max: objSettings.max, assignTo: objSettings.storeIn };
    this.commands.push(command);
    return this;
  }

  public setVariable(objSettings: AssignVariableOptions) : this {
    if (objSettings['var'])
    {
      const command: ICommand.AssignFromVariable = { name:'assignFromVariable', varName : objSettings['var'],  assignTo: objSettings.storeIn };
      this.commands.push(command);
    }  
    else
    {
      if(objSettings['value'])
      {
        const command: ICommand.AssignVariable = { name:'assignVariable', value: objSettings['value'] , assignTo: objSettings.storeIn };
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
      // TODO: implement error engine for unknown operation.
    }

    const command: ICommand.Calculate = { name:'calculate', varName:optionsObj.var, operation: op,value: val, assignTo: optionsObj.storeIn  };
    this.commands.push(command);
    return this;
  }

  public videoClear(time: number | null) : this {
    
    if (time)
    {
      const msTime = time * 1000;
      const command: ICommand.Wait = { name:'wait', time: msTime };
      this.commands.push(command);
    }

    const videoClearCommand: ICommand.ClearVideo = {name:'clearVideo'};
    this.commands.push(videoClearCommand);

    return this;
  }

}
