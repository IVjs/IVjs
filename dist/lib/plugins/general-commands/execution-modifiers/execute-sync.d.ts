import { CommandHandlerInitializer } from '../../../plugin-types';
export declare const executeSyncFactory: CommandHandlerInitializer;
export interface AddRunSync {
  runSync(nodeName: string): any;
}
export declare const runSync: AddRunSync['runSync'];
