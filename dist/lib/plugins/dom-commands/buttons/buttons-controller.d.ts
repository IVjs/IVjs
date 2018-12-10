export interface IButtonSettings {
  text: string;
  onClick(): any;
  [s: string]: any;
}
declare class ButtonsController {
  private allButtons;
  createButton(settings: IButtonSettings, element?: HTMLElement): HTMLButtonElement;
  removeAllButtons(): void;
  removeButton(id: string): void;
  private newButton;
  private applySettingsToButton;
  private addToButtonStore;
  private appendToDocument;
  private getContainer;
  private baseElement;
}
export declare const buttonsController: ButtonsController;
export {};
