import { IvNode } from '../../../node';

export const executeAsyncFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'executeAsync': (cmd: ICommand.ExecuteAsync) => {
      const returnObj: Runner.CommandReturn = { };
      input.commandEngine.runNodeByName(cmd.nodeName)
      return Promise.resolve(returnObj);
    }
  }
}

export function runAsync(this: IvNode, nodeName: string) : void {
  const command: ICommand.ExecuteAsync = {name:'executeAsync', nodeName};
  this.pushCommands(command);
}
