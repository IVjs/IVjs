import { CommandHandlerInitializer } from '../../../plugin-types';
interface BaseAssignVariable {
  storeIn: string;
}
interface AssignVariableWithVar extends BaseAssignVariable {
  var: string;
}
interface AssignVariableWithValue extends BaseAssignVariable {
  value: string | number | Array<string | number>;
}
declare type SetVarInstructions = BaseAssignVariable & Partial<AssignVariableWithVar & AssignVariableWithValue>;
export declare const assignFromVariableFactory: CommandHandlerInitializer;
export declare const assignVariableFactory: CommandHandlerInitializer;
export interface AddSetVariable {
  setVariable(instructions: SetVarInstructions): any;
}
export declare const setVariable: AddSetVariable['setVariable'];
export {};
