import { IvNode } from '../../../node';

export const stopExecutionFactory: CommandEngine.CommandHandlerInitializer = (input): Runner.TargetFunctionObject => {
  return {
    stopExecution: (cmd: ICommand.StopExecution) => {
      const returnObj: Runner.CommandReturn = {
        requests: ['exit'],
      };
      return Promise.resolve(returnObj);
    },
  };
};

export const pauseExecutionFactory: CommandEngine.CommandHandlerInitializer = (input): Runner.TargetFunctionObject => {
  return {
    pauseExecution: (cmd: ICommand.PauseExecution) => {
      const returnObj: Runner.CommandReturn = {
        requests: ['pause'],
      };
      return Promise.resolve(returnObj);
    },
  };
};

export interface AddStopExecution {
  endAllNodes();
}

export const stopExecution: AddStopExecution['endAllNodes'] = function(this: IvNode): void {
  const commandStop: ICommand.StopExecution = { name: 'stopExecution' };
  this.pushCommands(commandStop);
};
