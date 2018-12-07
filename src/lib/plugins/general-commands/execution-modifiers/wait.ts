import { CommandBuilderContext, CommandHandlerInitializer } from '../../../plugin-types';

export const waitFactory: CommandHandlerInitializer = (input): Runner.CommandHandlerRegistrationObject => {
  return {
    wait: (cmd: ICommand.Wait) => {
      const returnObj: Runner.CommandReturn = {};

      return new Promise(resolve => {
        setTimeout(() => resolve(returnObj), cmd.time);
      });
    },
  };
};

export interface AddWait {
  wait(time: number);
}

export const wait: AddWait['wait'] = function(this: CommandBuilderContext, time: number): void {
  const msTime = time * 1000;
  const command: ICommand.Wait = { name: 'wait', time: msTime };
  this.pushCommands(command);
};
