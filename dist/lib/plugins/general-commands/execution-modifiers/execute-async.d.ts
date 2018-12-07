import { CommandHandlerInitializer } from '../../../plugin-types';
export declare const executeAsyncFactory: CommandHandlerInitializer;
export interface AddRunAsync {
  runAsync(nodeName: string): any;
}
export declare const runAsync: AddRunAsync['runAsync'];
