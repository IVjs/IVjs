import { IvNode } from '../../../node';

export const waitFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'wait': (cmd: ICommand.Wait) => {
      const returnObj: Runner.CommandReturn = { };
      
      return new Promise(resolve => {
        setTimeout(() => resolve(returnObj), cmd.time)
      });
    }
  }
}

export function wait(this: IvNode, time: number) : void {
  const msTime = time * 1000;
  const command: ICommand.Wait = { name:'wait', time: msTime };
  this.pushCommands(command);
}

