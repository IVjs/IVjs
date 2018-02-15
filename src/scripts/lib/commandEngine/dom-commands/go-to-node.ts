import { CommandRunner } from '../commandRunner';

export const goToNodeFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'goToNode': (cmd: ICommand.GoToNode) => {
      const returnObj: Runner.CommandReturn = { value: null };
      input.commandEngine.runNodeByName(cmd.nodeName);
      return Promise.resolve(returnObj);
    }
  }
}