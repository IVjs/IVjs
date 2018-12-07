import { IvNode } from './node';
export declare type PluginTypes = string;
export declare type CommandBuilder = (this: CommandBuilderContext, ...userArgs: any[]) => void;
export interface ApiFunctionRegistration {
  nodeExtension: {
    [x: string]: CommandBuilder;
  };
}
export interface CommandHandlerFunctionRegistration {
  commandHandlerInitializers: CommandHandlerInitializer[];
}
export interface AliasRegistration {
  aliases: Array<{
    target: string;
    aliasAs: string | string[];
  }>;
}
export declare type PluginRegistration = Partial<
  CommandHandlerFunctionRegistration & ApiFunctionRegistration & AliasRegistration
>;
export declare type CommandBuilderContext = IvNode;
export declare type CommandHandlerInitializer = CommandEngine.CommandHandlerInitializer;
export declare type InitializerState = CommandEngine.InitializerState;
export declare type CommandHandlerRegistrationObject = Runner.CommandHandlerRegistrationObject;
export declare type CommandHandlerReturn = Runner.CommandReturn;
