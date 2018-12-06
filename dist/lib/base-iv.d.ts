import { IvNode, Node } from './node';
interface ConstructorInput {
  variables?: Partial<IV.Variables>;
  settings?: Partial<IV.Settings>;
}
interface ApiFunctionRegistration {
  apiExtension: {
    [x: string]: (this: IvNode, ...userArgs: any[]) => void;
  };
}
interface TargetFunctionRegistration {
  targetFunctionFactories: CommandEngine.TargetFunctionFactory[];
}
interface AliasRegistration {
  aliases: Array<{
    target: string;
    aliasAs: string | string[];
  }>;
}
export declare type PluginRegistration = Partial<
  TargetFunctionRegistration & ApiFunctionRegistration & AliasRegistration
>;
export declare class BaseIV {
  static extend(...registrations: PluginRegistration[]): typeof BaseIV;
  variables: Partial<IV.Variables>;
  settings: Partial<IV.Settings>;
  private defaultSettings;
  private engine;
  private nodes;
  protected static nodeKlass: typeof Node;
  protected nodeKlassReference: typeof Node;
  protected additionalFactories: CommandEngine.TargetFunctionFactory[];
  constructor(initialState?: ConstructorInput);
  node(name: string): IvNode;
  defineNode: (name: string) => IvNode;
  run(name?: string): void;
  createRunButton(name?: string, node?: string): HTMLButtonElement;
  private getEngine;
  private validateDom;
  private getSetting;
  private getSettings;
  private runOnAnyPlatform;
  private isMobileOrTablet;
  private createKickoffButton;
  private runViaButton;
  private prepVideosForMobile;
}
export {};
