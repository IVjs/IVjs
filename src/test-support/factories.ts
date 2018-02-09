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

  calculateCommand = (): ICommand.Calculate => ({
    name: 'calculate',
    varName: 'someVarName',
    operation: 'add',
    assignTo: 'someOtherVarName',
  })
}
const definitions = new Definitions();


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

export function create<T extends keyof Definitions>(faketory: T, overrides) {
  let obj = getFaketory(faketory);
  overrides = overrides || {};
  Object.assign(obj, overrides);
  return obj;
}

export default create;