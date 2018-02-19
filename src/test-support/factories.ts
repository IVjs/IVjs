class Definitions {
  getRandomNumberCommand = (): ICommand.GetRandomNumber => ({
    name: 'getRandomNumber',
    min: 1,
    max: 100,
    assignTo: 'myFavoriteVar',
  })

  playVideoCommand = (): ICommand.PlayVideo => ({
    name: 'playVideo',
    file: 'anyvideo.mp4',
  })

  assignVariableCommand = (): ICommand.AssignVariable => ({
    name: 'assignVariable',
    assignTo: 'count',
    value: 3,
  })

  assignFromVariableCommand = (): ICommand.AssignFromVariable => ({
    name: 'assignFromVariable',
    assignTo: 'count',
    varName: 'someVarName',
  })

  targetCommand = (): ICommand.Target => ({
    name: 'target',
    keyName: 'nameOfThisTarget',
  })

  switchCommand = (): ICommand.Switch => ({
    name: 'switch',
    do: [],
    defaultCommands: [],
  })

  stopExecutionCommand = (): ICommand.StopExecution => ({
    name: 'stopExecution',
  })

  pauseExecutionCommand = (): ICommand.PauseExecution => ({
    name: 'pauseExecution',
  })

  goToNodeCommand = (): ICommand.GoToNode => ({
    name: 'goToNode',
    nodeName: 'someNodeName',
  })

  executeAsyncCommand = (): ICommand.ExecuteAsync => ({
    name: 'executeAsync',
    nodeName: 'someNodeName',
  })

  executeSyncCommand = (): ICommand.ExecuteSync => ({
    name: 'executeSync',
    nodeName: 'someNodeName',
  })

  waitCommand = (): ICommand.Wait => ({
    name: 'wait',
    time: 1000,
  })

  timeoutCommand = (): ICommand.Timeout => ({
    name: 'timeout',
    time: 1000,
    commands: [],
  })

  goToCommand = (): ICommand.GoToCommand => this.goToCommand_usingNode();

  goToCommand_usingNode = (): ICommand.GoToCommand => ({
    name: 'goToCommand',
    nodeName: 'someNode',
  })

  goToCommand_usingTarget = (): ICommand.GoToCommand => ({
    name: 'goToCommand',
    target: 'someTarget',
  })

  ivSettings = (): IV.Settings => ({
    baseContainer: document.getElementById('IV-view'),
    baseVideoUrl: '',
  })

  calculateCommand = (): ICommand.Calculate => ({
    name: 'calculate',
    varName: 'someVarName',
    operation: 'add',
    value: 1,
    assignTo: 'someOtherVarName',
  })

  audioVolumeCommand = (): ICommand.AudioVolume => ({
    name: 'audioVolume',
    target: 'BG',
    volume: 1,
  })

  audioSourceCommand = (): ICommand.AudioSource => ({
    name: 'audioSource',
    target: 'BG',
    do: 'play',
  })

  node = (): IvNode => ({
    name: 'anyNodeName',
    
    getCommands() {
      return this.commands;
    },
    
    commands: [] as ICommand.AnyCommand[]
  }) as IvNode
}
const definitions = new Definitions();

interface FactoryMap {
  getRandomNumberCommand: ICommand.GetRandomNumber;
  playVideoCommand: ICommand.PlayVideo;
  assignVariableCommand: ICommand.AssignVariable;
  assignFromVariableCommand: ICommand.AssignFromVariable;
  targetCommand: ICommand.Target;
  switchCommand: ICommand.Switch;
  stopExecutionCommand: ICommand.StopExecution;
  pauseExecutionCommand: ICommand.PauseExecution;
  goToNodeCommand: ICommand.GoToNode;
  executeAsyncCommand: ICommand.ExecuteAsync;
  executeSyncCommand: ICommand.ExecuteSync;
  waitCommand: ICommand.Wait;
  timeoutCommand: ICommand.Timeout;
  goToCommand: ICommand.GoToCommand;
  goToCommand_usingNode: ICommand.GoToCommand;
  goToCommand_usingTarget: ICommand.GoToCommand;
  calculateCommand: ICommand.Calculate;
  ivSettings: IV.Settings;
  audioVolumeCommand: ICommand.AudioVolume;
  audioSourceCommand: ICommand.AudioSource;
  node: IvNode;
}

let incrementor = 1;
function getNewId() {
  return incrementor++;
}

function getFaketory<T extends keyof Definitions>(faketory: T) {
  if (definitions[faketory] === undefined) {
    throw new Error(`Test factory \`create('${faketory}')\` failed. There is no factory called "${faketory}"`);
  }
  return definitions[faketory]();
}

export function create<T extends keyof Definitions>(faketory: T, overrides?: Partial<FactoryMap[T]>): FactoryMap[T] {
  let obj = getFaketory(faketory);
  overrides = overrides || {};
  Object.assign(obj, overrides);
  return obj;
}

export default create;