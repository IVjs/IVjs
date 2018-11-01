import { defaults } from '../scripts/lib/config';
import { createMockEngine, createMockRunner } from './mock-classes';

class Definitions {
  public getRandomNumberCommand = (): ICommand.GetRandomNumber => ({
    name: 'getRandomNumber',
    min: 1,
    max: 100,
    assignTo: 'myFavoriteVar',
  })

  public playVideoCommand = (): ICommand.PlayVideo => ({
    name: 'playVideo',
    file: 'anyvideo.mp4',
  })

  public assignVariableCommand = (): ICommand.AssignVariable => ({
    name: 'assignVariable',
    assignTo: 'count',
    value: 3,
  })

  public assignFromVariableCommand = (): ICommand.AssignFromVariable => ({
    name: 'assignFromVariable',
    assignTo: 'count',
    varName: 'someVarName',
  })

  public addButtonCommand = (): ICommand.AddButton => ({
    name: 'addButton',
    id: 'btn1',
    text: 'Click Me',
    onClick: [],
  })

  public removeButtonCommand = (): ICommand.RemoveButton => ({
    name: 'removeButton',
    id: this.addButtonCommand().id,
  })

  public removeAllButtonsCommand = (): ICommand.RemoveAllButtons => ({
    name: 'removeAllButtons',
  })

  public targetCommand = (): ICommand.Target => ({
    name: 'target',
    keyName: 'nameOfThisTarget',
  })

  public switchCommand = (): ICommand.Switch => ({
    name: 'switch',
    do: [],
    defaultCommands: [],
  })

  public stopExecutionCommand = (): ICommand.StopExecution => ({
    name: 'stopExecution',
  })

  public pauseExecutionCommand = (): ICommand.PauseExecution => ({
    name: 'pauseExecution',
  })

  public goToNodeCommand = (): ICommand.GoToNode => ({
    name: 'goToNode',
    nodeName: 'someNodeName',
  })

  public executeAsyncCommand = (): ICommand.ExecuteAsync => ({
    name: 'executeAsync',
    nodeName: 'someNodeName',
  })

  public executeSyncCommand = (): ICommand.ExecuteSync => ({
    name: 'executeSync',
    nodeName: 'someNodeName',
  })

  public executeJsCommand = (): ICommand.ExecuteJs => ({
    name: 'executeJs',
    func: jest.fn(),
  })

  public waitCommand = (): ICommand.Wait => ({
    name: 'wait',
    time: 1000,
  })

  public timeoutCommand = (): ICommand.Timeout => ({
    name: 'timeout',
    time: 1000,
    commands: [],
  })

  public goToCommand = (): ICommand.GoToCommand => this.goToCommand_usingNode();

  public goToCommand_usingNode = (): ICommand.GoToCommand => ({ // tslint:disable-line variable-name
    name: 'goToCommand',
    nodeName: 'someNode',
  })

  public goToCommand_usingTarget = (): ICommand.GoToCommand => ({ // tslint:disable-line variable-name
    name: 'goToCommand',
    target: 'someTarget',
  })

  public ivSettings = (): IV.Settings => ({
    baseContainer: document.getElementById(defaults.baseElementId),
    baseVideoUrl: '',
  })

  public calculateCommand = (): ICommand.Calculate => ({
    name: 'calculate',
    varName: 'someVarName',
    operation: 'add',
    value: 1,
    assignTo: 'someOtherVarName',
  })

  public audioVolumeCommand = (): ICommand.AudioVolume => ({
    name: 'audioVolume',
    target: 'BG',
    volume: 1,
  })

  public audioSourceCommand = (): ICommand.AudioSource => ({
    name: 'audioSource',
    target: 'BG',
    do: 'play',
  })

  public node = (): IvNode => new (class FakeNode { // tslint:disable-line
    public name = 'anyNodeName';
    private commands: ICommand.AnyCommand[] = [];

    public getCommands() {
      return this.commands;
    }
  })();

  public targetFunctionFactoryInput = (): CommandEngine.TargetFunctionFactoryInput => ({
      variables: {},
      settings: {
        baseContainer: document.getElementById(defaults.baseElementId),
        baseVideoUrl: '',
      },
      commandEngine: this.commandEngine()
  })

  public commandEngine = (): CommandEngine.Class => createMockEngine();

  public commandRunner = (): Runner.Class => createMockRunner();
}
const definitions = new Definitions();

interface FactoryMap {
  addButtonCommand: ICommand.AddButton;
  removeButtonCommand: ICommand.RemoveButton;
  removeAllButtonsCommand: ICommand.RemoveAllButtons;
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
  executeJsCommand: ICommand.ExecuteJs;
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
  targetFunctionFactoryInput: CommandEngine.TargetFunctionFactoryInput;
  commandEngine: CommandEngine.Class;
  commandRunner: Runner.Class;
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
  const obj = getFaketory(faketory);
  overrides = overrides || {};
  Object.assign(obj, overrides);
  return obj;
}

export default create;
