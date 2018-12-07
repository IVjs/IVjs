import { CommandHandlerInitializer } from '../../../plugin-types';
export declare const removeDragTargetFactory: CommandHandlerInitializer;
export declare const removeZone: RemoveZone['removeZone'];
export interface RemoveZone {
  removeZone(zoneId: string): any;
}
