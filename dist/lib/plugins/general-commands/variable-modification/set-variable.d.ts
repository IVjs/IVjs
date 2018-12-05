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
export declare const assignFromVariableFactory: CommandEngine.TargetFunctionFactory;
export declare const assignVariableFactory: CommandEngine.TargetFunctionFactory;
export interface AddSetVariable {
  setVariable(instructions: SetVarInstructions): any;
}
export declare const setVariable: AddSetVariable['setVariable'];
export {};
