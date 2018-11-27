export declare const waitFactory: CommandEngine.TargetFunctionFactory;
export interface AddWait {
    wait(time: number): any;
}
export declare const wait: AddWait['wait'];
