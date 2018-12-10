import { CommandHandlerInitializer } from '../../../plugin-types';
export declare const removeDragTargetFactory: CommandHandlerInitializer;
export declare const removeDragTarget: RemoveDragObjects['removeDragTarget'];
export declare const removeDragItemFactory: CommandHandlerInitializer;
export declare const removeDragItem: RemoveDragObjects['removeDragItem'];
export interface RemoveDragObjects {
  removeDragTarget(dragTargetId: string): any;
  removeDragItem(dragItemId: string): any;
}
