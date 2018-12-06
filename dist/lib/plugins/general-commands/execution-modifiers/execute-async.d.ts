export declare const executeAsyncFactory: CommandEngine.TargetFunctionFactory;
export interface AddRunAsync {
  runAsync(nodeName: string): any;
}
export declare const runAsync: AddRunAsync['runAsync'];
