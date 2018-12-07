import { CommandHandlerInitializer } from '../../../plugin-types';
export declare const waitFactory: CommandHandlerInitializer;
export interface AddWait {
  wait(time: number): any;
}
export declare const wait: AddWait['wait'];
