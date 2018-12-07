import { CommandHandlerInitializer } from '../../../plugin-types';
import { ButtonOptions } from './button-commands-builder';
export declare const addButtonFactory: CommandHandlerInitializer;
export interface AddAddButton {
  addButton(instructions: ButtonOptions): any;
}
export declare const addButton: AddAddButton['addButton'];
export declare const removeButtonFactory: CommandHandlerInitializer;
export declare const removeAllButtonsFactory: CommandHandlerInitializer;
export interface AddRemoveAllButtons {
  removeAllButtons(): any;
}
export declare const removeAllButtons: AddRemoveAllButtons['removeAllButtons'];
