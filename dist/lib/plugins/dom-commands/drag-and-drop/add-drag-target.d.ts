export interface AddDragTargetSettings {
  id: string;
  width: number;
  height: number;
  top: number;
  left: number;
  visible?: boolean;
  acceptDragItems?: string[];
  onSuccess?: OnSuccessOptions;
}
export declare type OnSuccessOptions = Partial<{
  js: () => void;
  setVariable: string;
  goToNode: string;
  keepItem: boolean;
}>;
export declare const addDragTargetFactory: CommandEngine.TargetFunctionFactory;
export interface AddDragTarget {
  addDragTarget(settings: AddDragTargetSettings): any;
}
export declare const addDragTarget: AddDragTarget['addDragTarget'];
