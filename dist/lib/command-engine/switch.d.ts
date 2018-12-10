import { CommandHandlerInitializer } from '../plugin-types';
export declare const switchFactory: CommandHandlerInitializer;
export declare function doSwitch(given: CommandEngine.InitializerState, cmd: ICommand.Switch): Runner.CommandReturn;
