import { IvNode } from '../../node';
import { PluginRegistration } from '../../base-iv';

export const executeSyncFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'executeSync': (cmd: ICommand.ExecuteSync) => {
      const returnObj: Runner.CommandReturn = { };
      return new Promise(async (resolve) => {
        (await input.commandEngine.runNodeByName(cmd.nodeName)).once('done', () => resolve(returnObj))
      });
    }
  }
}

function executeSync(this: IvNode, nodeName: string) : void {
  const command: ICommand.ExecuteSync = {name:'executeSync', nodeName};
  this.pushCommands(command);
}

export const executeSyncRegistration: PluginRegistration = {
  apiExtensions: [{
    apiName: 'goSub',
    apiFn: executeSync,
  }],
  targetFunctionFactories: [executeSyncFactory],
};

declare module '../../node' {
  interface NodeExtensions {
    goSub: typeof executeSync;
  }
}
