export declare const removeDragTargetFactory: CommandEngine.TargetFunctionFactory;
export declare const removeDragTarget: RemoveDragObjects['removeDragTarget'];
export declare const removeDragItemFactory: CommandEngine.TargetFunctionFactory;
export declare const removeDragItem: RemoveDragObjects['removeDragItem'];
export interface RemoveDragObjects {
  removeDragTarget(dragTargetId: string): any;
  removeDragItem(dragItemId: string): any;
}
