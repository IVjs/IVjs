declare namespace SwitchDo {
  interface Base {
    varName: string;
    commands: ICommand.AnyCommand[];
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

  type Any = Is | IsGreaterThan | IsLessThan | IsGreaterThanOrEqualTo | IsLessThanOrEqualTo | IsBetween;
}

declare namespace Runner {
  interface Class {
    status: Status;
    run(): Promise<Class>;
    on(evt: string, listener: Function): any; // clarify later
    once(evt: string, listener: Function): any;
  }

  interface ConstructorInput {
    commands: Runner.Command[];
    targetFunctions: Runner.CommandHandlerRegistrationObject;
    variables: IV.Variables;
  }

  interface Command {
    name: string;
    [x: string]: any;
  }

  type Request = 'exit' | 'pause';

  interface CommandReturn {
    commands?: Command[];
    requests?: Request[];
    asyncCommands?: Promise<Command[]>;
  }

  /**
   * An object whose property names correspond with the `name` value
   * of a command and whose property values are the functions that
   * should be run when that command is issued at runtime
   */
  interface CommandHandlerRegistrationObject {
    [name: string]: CommandHandler;
  }

  type CommandHandler = (cmd: Command) => Promise<CommandReturn>;

  type Status = 'waiting' | 'running' | 'done' | 'ready' | 'paused';
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

interface BaseNode {
  name: string;
  getCommands(): ICommand.AnyCommand[];
  pushCommands(...commands: ICommand.AnyCommand[]): void;
}

declare namespace CommandEngine {
  interface Class {
    registerTargetFunction(tf: CommandHandlerInitializer): void;
    run(): void;
    runNodeByName(name: string): Promise<Runner.Class>;
    runCommands(commands: ICommand.AnyCommand[]): Promise<Runner.Class>;
  }

  interface ctor {
    settings: IV.Settings;
    nodes: BaseNode[];
    variables: { [x: string]: any };
    commandRunnerClass: {
      new (obj: Runner.ConstructorInput): Runner.Class;
    };
  }

  interface InitializerState {
    settings: ctor['settings'];
    variables: ctor['variables'];
    commandEngine: Class;
  }

  type CommandHandlerInitializer = (state: InitializerState) => Runner.CommandHandlerRegistrationObject;
}

declare namespace ICommand {
  type AnyCommand =
    | PlayVideo
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
    | GoToNodeCommand
    | Calculate
    | GetRandomNumber
    | ClearVideo
    | AudioSource
    | AudioVolume
    | Log
    | ExecuteJs
    | AddDragItem
    | AddDragTarget
    | RemoveDragItem
    | RemoveDragTarget
    | AddZone
    | RemoveZone
    | AddButton
    | RemoveButton
    | RemoveAllButtons;

  interface AddButton {
    name: 'addButton';
    id: string;
    text: string;
    onClick: ICommand.AnyCommand[];
    attributes?: { name: string; value: string }[];
  }

  interface AddDragItem {
    name: 'addDragItem';
    id: string;
    imageUrl: string;
    size?: {
      width?: number;
      height?: number;
    };
  }

  interface RemoveDragItem {
    name: 'removeDragItem';
    id: string;
  }

  interface RemoveDragTarget {
    name: 'removeDragTarget';
    id: string;
  }

  interface AddDragTarget {
    name: 'addDragTarget';
    id: string;
    position: {
      x: number;
      y: number;
    };
    size: {
      width: number;
      height: number;
    };
    visible?: boolean;
    onSuccess?: {
      setVariable?: string;
      goToNode?: string;
    };
    acceptDragItems?: string[];
  }

  interface AddZone {
    name: 'addZone';
    id: string;
    position: {
      x: number;
      y: number;
    };
    size: {
      width: number;
      height: number;
    };
    visible?: boolean;
    onClick?: {
      setVariable?: string;
      goToNode?: string;
    };
  }

  interface RemoveZone {
    name: 'removeZone';
    id: string;
  }

  interface RemoveButton {
    name: 'removeButton';
    id: string;
  }

  interface RemoveAllButtons {
    name: 'removeAllButtons';
  }

  interface AssignVariable {
    name: 'assignVariable';
    assignTo: string;
    value: string | number | Array<string | number>;
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

  interface PlayVideoList {
    name: 'playVideoList';
    list: PlayVideo[];
    loop?: boolean;
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

  interface ExecuteJs {
    name: 'executeJs';
    func: () => any;
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

  type GoToNodeCommand = GoToCommandBuilder.AsNode | GoToCommandBuilder.AsTarget;

  interface Calculate {
    name: 'calculate';
    varName: string;
    operation:
      | 'add'
      | 'subtract'
      | 'multiply'
      | 'divide'
      | 'remainderAfterDivideBy'
      | 'roundDownAfterDivideBy'
      | 'roundUpAfterDivideBy'
      | 'roundAfterDivideBy'
      | 'round'
      | 'roundUp'
      | 'roundDown';
    value: number;
    assignTo: string;
  }

  interface AudioVolume {
    name: 'audioVolume';
    target: AudioSource['target'];
    volume: number; // 0-1
    time?: number;
  }

  interface AudioSource {
    name: 'audioSource';
    target: 'BG' | 'SFX';
    do: 'load' | 'play' | 'pause' | null;
    file?: string;
    loop?: boolean;
  }

  type GetRandomNumber = {
    name: 'getRandomNumber';
    min: number;
    max: number;
    assignTo: string;
  };

  type Log = {
    name: 'log';
    value: any;
  };
}

declare namespace IV {
  interface Settings {
    baseContainer: HTMLElement;
    baseVideoUrl: string;
    bgAudioUrl?: string;
    bgAudioLoop?: boolean;
  }

  interface Variables {
    [x: string]: any;
  }
}
