import { CommandRunner } from '../commandRunner';

export const goToNodeFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'goToNode': (cmd: ICommand.GoToNode) => {
      input.commandEngine.runNodeByName(cmd.nodeName);
      return Promise.resolve({});
    }
  }
}