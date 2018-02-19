import { CommandRunner } from '../commandRunner';
import { getRandomInt } from '../../utils';

export const getRandomNumberFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'getRandomNumber':
      (cmd: ICommand.GetRandomNumber) =>
        Promise.resolve(getRandomNumber(input, cmd))
  }
}

export function getRandomNumber(
  given: CommandEngine.TargetFunctionFactoryInput,
  cmd: ICommand.GetRandomNumber
): Runner.CommandReturn {

  given.variables[cmd.assignTo] = getRandomInt(cmd.min, cmd.max);
  return {};
}