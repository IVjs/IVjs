import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
  CommandHandlerReturn,
} from '../../../plugin-types';

export const executeAsyncFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    executeAsync: (cmd: ICommand.ExecuteAsync) => {
      const returnObj: CommandHandlerReturn = {};
      input.commandEngine.runNodeByName(cmd.nodeName);
      return Promise.resolve(returnObj);
    },
  };
};

export interface AddRunAsync {
  runAsync(nodeName: string);
}

export const runAsync: AddRunAsync['runAsync'] = function(this: CommandBuilderContext, nodeName: string): void {
  const command: ICommand.ExecuteAsync = { name: 'executeAsync', nodeName };
  this.pushCommands(command);
};
