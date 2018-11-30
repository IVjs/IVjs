import { defaults } from '../lib/config';
import { createMockEngine, createMockRunner } from './mock-classes';
import { NodeExtensions } from '../lib/node';

type FirstArgFor<F extends (...args: any[]) => any> = F extends (...args: infer A) => any ? A[0] : never;

interface Definitions {
  [s: string]: (...args: any[]) => any;
}

class Definitions {
  public getRandomNumberCommand = (): ICommand.GetRandomNumber => ({
    name: 'getRandomNumber',
    min: 1,
    max: 100,
    assignTo: 'myFavoriteVar',
  });

  public playVideoCommand = (): ICommand.PlayVideo => ({
    name: 'playVideo',
    file: 'anyvideo.mp4',
  });

  public assignVariableCommand = (): ICommand.AssignVariable => ({
    name: 'assignVariable',
    assignTo: 'count',
    value: 3,
  });

  public assignFromVariableCommand = (): ICommand.AssignFromVariable => ({
    name: 'assignFromVariable',
    assignTo: 'count',
    varName: 'someVarName',
  });

  public addButtonCommand = (): ICommand.AddButton => ({
    name: 'addButton',
    id: `btn${getNewId()}`,
    text: 'Click Me',
    onClick: [],
  });

  public addDragItemCommand = (): ICommand.AddDragItem => ({
    name: 'addDragItem',
    id: `draggable${getNewId()}`,
    imageUrl: 'someImage.png',
  });

  public addDragTargetCommand = (): ICommand.AddDragTarget => ({
    name: 'addDragTarget',
    id: `draggableTarget${getNewId()}`,
    position: { x: 0, y: 0 },
    size: { width: 20, height: 20 },
  });

  public addDragTargetInput = (): FirstArgFor<NodeExtensions['addDragTarget']> => ({
    id: `draggableTarget${getNewId()}`,
    left: 0,
    top: 0,
    width: 20,
    height: 20,
  });

  public removeButtonCommand = (): ICommand.RemoveButton => ({
    name: 'removeButton',
    id: this.addButtonCommand().id,
  });

  public removeAllButtonsCommand = (): ICommand.RemoveAllButtons => ({
    name: 'removeAllButtons',
  });

  public targetCommand = (): ICommand.Target => ({
    name: 'target',
    keyName: 'nameOfThisTarget',
  });

  public switchCommand = (): ICommand.Switch => ({
    name: 'switch',
    do: [],
    defaultCommands: [],
  });

  public stopExecutionCommand = (): ICommand.StopExecution => ({
    name: 'stopExecution',
  });

  public pauseExecutionCommand = (): ICommand.PauseExecution => ({
    name: 'pauseExecution',
  });

  public goToNodeCommand = (): ICommand.GoToNode => ({
    name: 'goToNode',
    nodeName: 'someNodeName',
  });

  public executeAsyncCommand = (): ICommand.ExecuteAsync => ({
    name: 'executeAsync',
    nodeName: 'someNodeName',
  });

  public executeSyncCommand = (): ICommand.ExecuteSync => ({
    name: 'executeSync',
    nodeName: 'someNodeName',
  });

  public executeJsCommand = (): ICommand.ExecuteJs => ({
    name: 'executeJs',
    func: jest.fn(),
  });

  public waitCommand = (): ICommand.Wait => ({
    name: 'wait',
    time: 1000,
  });

  public timeoutCommand = (): ICommand.Timeout => ({
    name: 'timeout',
    time: 1000,
    commands: [],
  });

  // tslint:disable-next-line variable-name
  public goToCommand_usingNode = (): ICommand.GoToNodeCommand => ({
    name: 'goToCommand',
    nodeName: 'someNode',
  });

  // tslint:disable-next-line variable-name
  public goToCommand_usingTarget = (): ICommand.GoToNodeCommand => ({
    name: 'goToCommand',
    target: 'someTarget',
  });

  public ivSettings = (): IV.Settings => ({
    baseContainer: document.getElementById(defaults.baseElementId),
    baseVideoUrl: '',
  });

  public calculateCommand = (): ICommand.Calculate => ({
    name: 'calculate',
    varName: 'someVarName',
    operation: 'add',
    value: 1,
    assignTo: 'someOtherVarName',
  });

  public audioVolumeCommand = (): ICommand.AudioVolume => ({
    name: 'audioVolume',
    target: 'BG',
    volume: 1,
  });

  public audioSourceCommand = (): ICommand.AudioSource => ({
    name: 'audioSource',
    target: 'BG',
    do: 'play',
  });

  public node = (): BaseNode =>
    new class FakeNode {
      // tslint:disable-line
      public name = 'anyNodeName';
      private commands: ICommand.AnyCommand[] = [];

      public getCommands() {
        return this.commands;
      }

      public pushCommands(...args) {
        this.commands.push(...args);
      }
    }();

  public targetFunctionFactoryInput = (): CommandEngine.TargetFunctionFactoryInput => ({
    variables: {},
    settings: {
      baseContainer: document.getElementById(defaults.baseElementId),
      baseVideoUrl: '',
    },
    commandEngine: this.commandEngine(),
  });

  public commandEngine = (): CommandEngine.Class => createMockEngine();

  public commandRunner = (): Runner.Class => createMockRunner();
}
const definitions = new Definitions();

type FactoryMap<T extends Definitions = Definitions> = { [P in keyof T]: ReturnType<T[P]> };

let incrementor: number;
export function getNewId() {
  return incrementor++;
}

export function resetIds() {
  incrementor = 1;
}

resetIds();

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
