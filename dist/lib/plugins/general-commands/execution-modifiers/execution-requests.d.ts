export declare const stopExecutionFactory: CommandEngine.TargetFunctionFactory;
export declare const pauseExecutionFactory: CommandEngine.TargetFunctionFactory;
export interface AddStopExecution {
    endAllNodes(): any;
}
export declare const stopExecution: AddStopExecution['endAllNodes'];
