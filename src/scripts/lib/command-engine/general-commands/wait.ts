import { IvNode } from '../../node';
import { PluginRegistration } from '../../base-iv';

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

function wait(this: IvNode, time: number) : void {
  const msTime = time * 1000;
  const command: ICommand.Wait = { name:'wait', time: msTime };
  this.pushCommands(command);
}

export const waitRegistration: PluginRegistration = {
  apiExtensions: [{
    apiName: 'wait',
    apiFn: wait,
  }],
  targetFunctionFactories: [waitFactory],
};

declare module '../../node' {
  interface NodeExtensions {
    wait: typeof wait;
  }
}