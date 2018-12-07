import { CommandBuilderContext } from '../../../plugin-types';

export const executeAsyncFactory: CommandEngine.CommandHandlerInitializer = (
  input,
): Runner.CommandHandlerRegistrationObject => {
  return {
    executeAsync: (cmd: ICommand.ExecuteAsync) => {
      const returnObj: Runner.CommandReturn = {};
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
