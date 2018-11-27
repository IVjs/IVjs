import { PluginRegistration } from '../../../base-iv';
export declare const executeJsFactory: CommandEngine.TargetFunctionFactory;
declare type AnyArgsReturnVoid = (...args: any[]) => void;
interface AddJs {
    js(func: AnyArgsReturnVoid): any;
}
export declare const runJsPlugin: PluginRegistration;
declare module '../../../node' {
    interface NodeExtensions extends AddJs {
    }
}
export {};
