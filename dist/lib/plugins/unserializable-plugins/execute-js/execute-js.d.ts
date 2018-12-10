import { PluginRegistration, CommandHandlerInitializer } from '../../../plugin-types';
export declare const executeJsFactory: CommandHandlerInitializer;
declare type AnyArgsReturnVoid = (...args: any[]) => void;
interface AddJs {
  js(func: AnyArgsReturnVoid): any;
}
export declare const runJsPlugin: PluginRegistration;
declare module '../../../node' {
  interface NodeExtensions extends AddJs {}
}
export {};
