import { IvNode, Node } from './node';
import { PluginRegistration } from './plugin-types';
interface ConstructorInput {
  variables?: Partial<IV.Variables>;
  settings?: Partial<IV.Settings>;
}
export declare class BaseIV {
  protected static nodeKlass: typeof Node;
  protected static factories: CommandEngine.CommandHandlerInitializer[];
  static extend(...registrations: PluginRegistration[]): typeof BaseIV;
  variables: Partial<IV.Variables>;
  settings: Partial<IV.Settings>;
  private defaultSettings;
  private engine;
  private nodes;
  protected nodeKlassReference: typeof Node;
  protected additionalFactories: CommandEngine.CommandHandlerInitializer[];
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
