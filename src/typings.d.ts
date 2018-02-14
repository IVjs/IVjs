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

  interface IsBetween extends Base {
    isBetween: number[];
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
    | IsBetween

}

declare namespace Runner {
  interface Class {
    status: Status;
    run(): void;
    on(evt: string, listener: Function): any; // clarify later
    once(evt: string, listener: Function): any;
  }

  interface ConstructorInput {
    commands: Runner.Command[],
    targetFunctions: Runner.TargetFunctionObject
  }

  interface Command {
    name: string;
    [x: string]: any;
  }

  interface CommandReturn {
    value: any;
    commands?: Command[];
  }

  interface TargetFunctionObject {
    [name: string]: TargetFunction
  }

  type TargetFunction = (cmd: Command) => Promise<CommandReturn>

  type Status = 'waiting' | 'running' | 'done' | 'ready';
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

interface IvNode {
  name: string
  getCommands(): ICommand.AnyCommand[]
}

declare namespace CommandEngine {
  interface Class {
    registerTargetFunction(tf: TargetFunctionFactory): void;
    run(): void;
  }

  interface ctor {
    settings: IV.Settings;
    nodes: IvNode[];
    variables: { [x: string]: any }
    commandRunnerClass: {
      new(obj: Runner.ConstructorInput): Runner.Class
    }
  }

  interface TargetFunctionFactoryInput {
    settings: ctor['settings'];
    nodes: ctor['nodes'];
    variables: ctor['variables'];
  }

  type TargetFunctionFactory = (input: TargetFunctionFactoryInput) => Runner.TargetFunctionObject;

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
    operation: string;
    value: number;
    assignTo: string;
  }

  type GetRandomNumber = {
    name: 'getRandomNumber';
    min: number;
    max: number;
    assignTo: string;
  }
}

declare namespace IV {
  interface Settings {
    baseContainer: object;
    baseVideoUrl: string;
  }

  interface Variables {
    [x: string]: any;
  }
}
 