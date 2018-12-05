interface Definitions {
  [s: string]: (...args: any[]) => any;
}
declare class Definitions {
  getRandomNumberCommand: () => ICommand.GetRandomNumber;
  playVideoCommand: () => ICommand.PlayVideo;
  assignVariableCommand: () => ICommand.AssignVariable;
  assignFromVariableCommand: () => ICommand.AssignFromVariable;
  addButtonCommand: () => ICommand.AddButton;
  addDragItemCommand: () => ICommand.AddDragItem;
  addDragTargetCommand: () => ICommand.AddDragTarget;
  addDragTargetInput: () => import('../lib/plugins/dom-commands/drag-and-drop/add-drag-target').AddDragTargetSettings;
  addDragItemInput: () => import('../lib/plugins/dom-commands/drag-and-drop/add-drag-item').AddDragItemInstructions;
  removeButtonCommand: () => ICommand.RemoveButton;
  removeDragItemCommand: () => ICommand.RemoveDragItem;
  removeDragTargetCommand: () => ICommand.RemoveDragTarget;
  removeAllButtonsCommand: () => ICommand.RemoveAllButtons;
  targetCommand: () => ICommand.Target;
  switchCommand: () => ICommand.Switch;
  stopExecutionCommand: () => ICommand.StopExecution;
  pauseExecutionCommand: () => ICommand.PauseExecution;
  goToNodeCommand: () => ICommand.GoToNode;
  executeAsyncCommand: () => ICommand.ExecuteAsync;
  executeSyncCommand: () => ICommand.ExecuteSync;
  executeJsCommand: () => ICommand.ExecuteJs;
  waitCommand: () => ICommand.Wait;
  timeoutCommand: () => ICommand.Timeout;
  goToCommand_usingNode: () => ICommand.GoToNodeCommand;
  goToCommand_usingTarget: () => ICommand.GoToNodeCommand;
  ivSettings: () => IV.Settings;
  calculateCommand: () => ICommand.Calculate;
  audioVolumeCommand: () => ICommand.AudioVolume;
  audioSourceCommand: () => ICommand.AudioSource;
  node: () => BaseNode;
  targetFunctionFactoryInput: () => CommandEngine.TargetFunctionFactoryInput;
  commandEngine: () => CommandEngine.Class;
  commandRunner: () => Runner.Class;
}
declare type FactoryMap<T extends Definitions = Definitions> = { [P in keyof T]: ReturnType<T[P]> };
export declare function getNewId(): number;
export declare function getLastId(): number;
export declare function resetIds(): void;
export declare function create<T extends keyof Definitions>(
  faketory: T,
  overrides?: Partial<FactoryMap[T]>,
): FactoryMap[T];
export default create;
