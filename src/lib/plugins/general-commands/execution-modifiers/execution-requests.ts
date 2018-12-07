import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
  CommandHandlerReturn,
} from '../../../plugin-types';

export const stopExecutionFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    stopExecution: (cmd: ICommand.StopExecution) => {
      const returnObj: CommandHandlerReturn = {
        requests: ['exit'],
      };
      return Promise.resolve(returnObj);
    },
  };
};

export const pauseExecutionFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    pauseExecution: (cmd: ICommand.PauseExecution) => {
      const returnObj: CommandHandlerReturn = {
        requests: ['pause'],
      };
      return Promise.resolve(returnObj);
    },
  };
};

export interface AddStopExecution {
  endAllNodes();
}

export const stopExecution: AddStopExecution['endAllNodes'] = function(this: CommandBuilderContext): void {
  const commandStop: ICommand.StopExecution = { name: 'stopExecution' };
  this.pushCommands(commandStop);
};
