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

type ifOptions = Partial<
    Is
  & IsGreaterThan
  & IsLessThan
  & IsGreaterThanOrEqualTo
  & IsLessThanOrEqualTo
  & IsBetween
>

export interface NodeExtensions {} // tslint:disable-line no-empty-interface

type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never;
type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;

type NodeExtended = {
  [P in keyof NodeExtensions]: ReplaceReturnType<NodeExtensions[P], IvNode>
};

export type IvNode = Node & NodeExtended

export class Node implements BaseNode {
  private commands: ICommand.AnyCommand[] = [];
  private switchDo: ICommand.Switch;
  private pushType: string = 'main';

  constructor( public name: string ) { }


  public getCommands() {
    return this.commands;
  }

  private pusher(command: ICommand.AnyCommand[] | ICommand.AnyCommand){
    if (Array.isArray(command)) { return command.forEach(c => this.pusher(c)) }
    if(this.pushType === 'condition')
    {
      this.switchDo.do[this.switchDo.do.length - 1].commands.push(command);
    }
    else if(this.pushType === 'default')
    {
      this.switchDo.defaultCommands.push(command);
    }
    else
    {
      this.commands.push(command);
    }
  }

  public pushCommands(...commands: ICommand.AnyCommand[]): void {
    this.pusher(commands);
  }

  public if(optionsObj: ifOptions): IvNode {
    // TODO: need to instantiate a new for each if.
    if (this.switchDo == null)
    {
    this.switchDo = {name: 'switch', do: [], defaultCommands: []};
    }
    this.pushType = 'condition';
      if (optionsObj.is)
      {
        this.switchDo.do.push({varName: optionsObj.var, is: optionsObj.is, commands: []});
      }
      else if (optionsObj.isGreaterThan)
      {
        this.switchDo.do.push({varName: optionsObj.var, isGreaterThan: optionsObj.isGreaterThan, commands: []});
      }
      else if (optionsObj.isLessThan)
      {
        this.switchDo.do.push({varName: optionsObj.var, isLessThan: optionsObj.isLessThan, commands: []});
      }
      else if (optionsObj.isBetween)
      {
        this.switchDo.do.push({varName: optionsObj.var, isBetween: optionsObj.isBetween, commands: []});
      }
      else if (optionsObj.isGreaterThanOrEqualTo)
      {
        this.switchDo.do.push({varName: optionsObj.var, isGreaterThanOrEqualTo: optionsObj.isGreaterThanOrEqualTo, commands: []});
      }
      else if (optionsObj.isLessThanOrEqualTo)
      {
        this.switchDo.do.push({varName: optionsObj.var, isGreaterThanOrEqualTo: optionsObj.isLessThanOrEqualTo, commands: []});
      }
    return this as any as IvNode;
  }

  public else(): IvNode {
    this.pushType = 'default';
    return this as any as IvNode;
  }

  public endIf(): IvNode {
    this.pushType = 'main';
    this.pusher(this.switchDo);
    return this as any as IvNode;
  }

  public goto(nodeName: string) : IvNode {
    const commands = this.buildGoToNodeCommandSet(nodeName);
    commands.forEach(c => this.pusher(c))
    return this as any as IvNode;
  }

  private buildGoToNodeCommandSet(nodeName: string): [
    ICommand.GoToNode,
    ICommand.StopExecution
  ] {
    return [
      { name: 'goToNode', nodeName },
      { name: 'stopExecution' }
    ];
  }

  public execute(nodeName: string) : IvNode {
    const command: ICommand.ExecuteAsync = {name:'executeAsync', nodeName};
    this.pusher(command);
    return this as any as IvNode;
  }

  public goSub(nodeName: string) : IvNode {
    const command: ICommand.ExecuteSync = {name:'executeSync', nodeName};
    this.pusher(command);
    return this as any as IvNode;
  }


  public return() : IvNode {
    const commandStop: ICommand.StopExecution = {name:'stopExecution'};
    this.pusher(commandStop);
    return this as any as IvNode;
  }

}
