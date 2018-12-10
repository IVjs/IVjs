import { CommandHandlerInitializer } from '../../../plugin-types';
export declare const stopExecutionFactory: CommandHandlerInitializer;
export declare const pauseExecutionFactory: CommandHandlerInitializer;
export interface AddStopExecution {
  endAllNodes(): any;
}
export declare const stopExecution: AddStopExecution['endAllNodes'];
