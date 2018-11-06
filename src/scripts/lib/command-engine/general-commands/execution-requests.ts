import { IvNode } from '../../node';
import { PluginRegistration } from '../../base-iv';

export const stopExecutionFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'stopExecution': (cmd: ICommand.StopExecution) => {
      const returnObj: Runner.CommandReturn = {
        requests: ['exit'],
      };
      return Promise.resolve(returnObj);
    }
  }
}

export const pauseExecutionFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'pauseExecution': (cmd: ICommand.PauseExecution) => {
      const returnObj: Runner.CommandReturn = {
        requests: ['pause'],
      };
      return Promise.resolve(returnObj);
    }
  }
}

function stopExecution(this: IvNode) : void {
  const commandStop: ICommand.StopExecution = {name:'stopExecution'};
  this.pushCommands(commandStop);
}

export const executionRequestsRegistration: PluginRegistration = {
  apiExtensions: [{
    apiName: 'return',
    apiFn: stopExecution,
  }],
  targetFunctionFactories: [
    stopExecutionFactory,
    pauseExecutionFactory,
  ],
}

declare module '../../node' {
  interface NodeExtensions {
    return: typeof stopExecution;
  }
}
