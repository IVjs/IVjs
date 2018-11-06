import { IvNode } from '../../node';
import { PluginRegistration } from '../../base-iv';

export const executeAsyncFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'executeAsync': (cmd: ICommand.ExecuteAsync) => {
      const returnObj: Runner.CommandReturn = { };
      input.commandEngine.runNodeByName(cmd.nodeName)
      return Promise.resolve(returnObj);
    }
  }
}

function executeAsync(this: IvNode, nodeName: string) : void {
  const command: ICommand.ExecuteAsync = {name:'executeAsync', nodeName};
  this.pushCommands(command);
}

export const executeAsyncRegistration: PluginRegistration = {
  apiExtensions: [{
    apiName: 'execute',
    apiFn: executeAsync,
  }],
  targetFunctionFactories: [executeAsyncFactory],
};

declare module '../../node' {
  interface NodeExtensions {
    execute: typeof executeAsync;
  }
}
