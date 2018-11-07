import { PluginRegistration } from '../../base-iv';
import { IvNode } from '../../node';

export const logFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'log': (cmd: ICommand.Log) => {
      if (cmd.value == null) {
        console.log(input.variables);
      } else {
        console.log(cmd.value)
      }
      return Promise.resolve({});
    }
  }
}

function log(this: IvNode, anything: any): void {
  const command: ICommand.Log = {
    name: 'log',
    value: anything,
  };
  this.pushCommands(command);
}

export const logRegistration: PluginRegistration = {
  apiExtensions: [{
    apiName: 'log',
    apiFn: log,
  }],
  targetFunctionFactories: [logFactory],
};

declare module '../../node' {
  interface NodeExtensions {
    log: typeof log;
  }
}