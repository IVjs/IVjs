import { CommandBuilderContext } from '../../../plugin-types';

export const executeSyncFactory: CommandEngine.CommandHandlerInitializer = (
  input,
): Runner.CommandHandlerRegistrationObject => {
  return {
    executeSync: (cmd: ICommand.ExecuteSync) => {
      const returnObj: Runner.CommandReturn = {};
      return new Promise(async resolve => {
        (await input.commandEngine.runNodeByName(cmd.nodeName)).once('done', () => resolve(returnObj));
      });
    },
  };
};

export interface AddRunSync {
  runSync(nodeName: string);
}

export const runSync: AddRunSync['runSync'] = function(this: CommandBuilderContext, nodeName: string): void {
  const command: ICommand.ExecuteSync = { name: 'executeSync', nodeName };
  this.pushCommands(command);
};
