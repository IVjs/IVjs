import { ButtonOptions } from './button-commands-builder';
export declare const addButtonFactory: CommandEngine.TargetFunctionFactory;
export interface AddAddButton {
  addButton(instructions: ButtonOptions): any;
}
export declare const addButton: AddAddButton['addButton'];
export declare const removeButtonFactory: CommandEngine.TargetFunctionFactory;
export declare const removeAllButtonsFactory: CommandEngine.TargetFunctionFactory;
export interface AddRemoveAllButtons {
  removeAllButtons(): any;
}
export declare const removeAllButtons: AddRemoveAllButtons['removeAllButtons'];
