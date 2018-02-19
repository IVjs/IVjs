import { CommandRunner } from '../commandRunner';

export const switchFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'switch':
      (cmd: ICommand.GetRandomNumber) =>
        Promise.resolve(doSwitch(input, cmd))
  }
}

export function doSwitch(
  given: CommandEngine.TargetFunctionFactoryInput,
  cmd: ICommand.GetRandomNumber
): Runner.CommandReturn {

  return {};
}