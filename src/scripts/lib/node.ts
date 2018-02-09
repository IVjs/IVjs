import { PlayVideoInput, playVideoCommandBuilder } from './nodeBuilders/playVideoCommandBuilder';

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

export class Node {
  private addingToCondition = false;

  private commands: ICommand.AnyCommand[] = [];


  constructor( public name: string ) { }

  public videoPlay(urlOrOptions: PlayVideoInput) : this {
    const videoCommands = playVideoCommandBuilder.createCommandsFromInput(urlOrOptions)
    videoCommands.forEach(obj => this.commands.push(obj))
    return this;
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
