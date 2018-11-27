export declare const executeSyncFactory: CommandEngine.TargetFunctionFactory;
export interface AddRunSync {
    runSync(nodeName: string): any;
}
export declare const runSync: AddRunSync['runSync'];
