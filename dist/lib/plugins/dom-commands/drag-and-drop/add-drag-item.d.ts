export interface AddDragItemInstructions {
  id: string;
  image: string;
  width?: number;
  height?: number;
}
export declare const addDragItemFactory: CommandEngine.TargetFunctionFactory;
export interface AddDragItem {
  addDragItem(settings: AddDragItemInstructions): any;
}
export declare const addDragItem: AddDragItem['addDragItem'];
