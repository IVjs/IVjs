declare namespace SwitchDo {
  interface Base {
    varName: string;
    commands: ICommand.AnyCommand[]
  }

  interface Is extends Base {
    is: string | number | boolean;
  }

  interface IsGreaterThan extends Base {
    isGreaterThan: number;
  }

  interface IsLessThan extends Base {
    isLessThan: number;
  }

  interface IsGreaterThanOrEqualTo extends Base {
    isGreaterThanOrEqualTo: number;
  }

  interface IsLessThanOrEqualTo extends Base {
    isLessThanOrEqualTo: number;
  }

  type Any =
      Is
    | IsGreaterThan
    | IsLessThan
    | IsGreaterThanOrEqualTo
    | IsLessThanOrEqualTo

}

declare namespace GoToCommandBuilder {
  interface Base {
    name: 'goToCommand';
  }

  interface AsNode extends Base {
    nodeName: string;
  }

  interface AsTarget extends Base {
    target: string;
  }
}



declare namespace ICommand {
  type AnyCommand = 
      PlayVideo
    | Target
    | AssignVariable
    | AssignFromVariable
    | Switch
    | StopExecution
    | PauseExecution
    | GoToNode
    | ExecuteAsync
    | ExecuteSync
    | Wait
    | Timeout
    | GoToCommand
    | Calculate
    | GetRandomNumber
    | ClearVideo
  ;
    
  
  interface AssignVariable {
    name: 'assignVariable';
    assignTo: string;
    value: string | number | Array<string | number>
  }

  interface AssignFromVariable {
    name: 'assignFromVariable';
    assignTo: string;
    varName: string;
  }

  interface PlayVideo {
    name: 'playVideo';
    file: string;
    loop?: boolean | number;
    onComplete?: AnyCommand[];
  }


  interface ClearVideo {
    name: 'clearVideo';
  }

  interface Target {
    name: 'target';
    keyName: string;
  }

  interface Switch {
    name: 'switch';
    do: SwitchDo.Any[];
    defaultCommands: AnyCommand[];
  }

  interface StopExecution {
    name: 'stopExecution';
  }

  interface PauseExecution {
    name: 'pauseExecution';
  }

  interface GoToNode {
    name: 'goToNode';
    nodeName: string;
  }

  interface ExecuteAsync {
    name: 'executeAsync';
    nodeName: string;
  }

  interface ExecuteSync {
    name: 'executeSync';
    nodeName: string;
  }

  interface Wait {
    name: 'wait';
    time: number;
  }

  interface Timeout {
    name: 'timeout';
    time: number;
    commands: AnyCommand[];
  }

  type GoToCommand = GoToCommandBuilder.AsNode | GoToCommandBuilder.AsTarget;

  interface Calculate {
    name: 'calculate';
    varName: string;
    operation: 'add' | 'subtract' | 'multiply' | 'divide';
    assignTo: string;
  }

  type GetRandomNumber = {
    name: 'getRandomNumber';
    min: number;
    max: number;
    assignTo: string;
  }

}