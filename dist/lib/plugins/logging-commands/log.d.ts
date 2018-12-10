import { PluginRegistration, CommandHandlerInitializer } from '../../plugin-types';
export declare const logFactory: CommandHandlerInitializer;
interface AddLog {
  log(anything: any): any;
}
export declare const logPlugin: PluginRegistration;
declare module '../../node' {
  interface NodeExtensions extends AddLog {}
}
export {};
