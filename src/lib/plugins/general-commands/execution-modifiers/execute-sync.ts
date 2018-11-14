import { IvNode } from '../../../node';

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

export function runSync(this: IvNode, nodeName: string) : void {
  const command: ICommand.ExecuteSync = {name:'executeSync', nodeName};
  this.pushCommands(command);
}
