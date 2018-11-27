import { PluginRegistration } from '../../base-iv';
export declare const logFactory: CommandEngine.TargetFunctionFactory;
interface AddLog {
    log(anything: any): any;
}
export declare const logPlugin: PluginRegistration;
declare module '../../node' {
    interface NodeExtensions extends AddLog {
    }
}
export {};
