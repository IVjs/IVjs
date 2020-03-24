import { IvNode } from './node';
export type PluginTypes = string;
export type CommandBuilder = (this: CommandBuilderContext, ...userArgs: any[]) => void;
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
export type PluginRegistration = Partial<
  CommandHandlerFunctionRegistration & ApiFunctionRegistration & AliasRegistration
>;

export type CommandBuilderContext = IvNode;

export type CommandHandlerInitializer = CommandEngine.CommandHandlerInitializer;

export type InitializerState = CommandEngine.InitializerState;

export type CommandHandlerRegistrationObject = Runner.CommandHandlerRegistrationObject;

export type CommandHandlerReturn = Runner.CommandReturn;
