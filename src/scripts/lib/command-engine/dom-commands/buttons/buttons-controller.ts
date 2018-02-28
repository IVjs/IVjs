import { traverseObject } from 'happy-helpers';
import { defaults } from '../../../config';
import { nearClone } from '../../../utils'

export interface IButtonSettings {
  text: string;
  onClick(): any;
  [s:string]: any;
}

class ButtonsController {
  private allButtons: HTMLButtonElement[] = [];

  public createButton(
    settings: IButtonSettings,
    element?: HTMLElement
  ): HTMLButtonElement {
    const button = this.newButton(settings);
    this.addToButtonStore(button);
    this.appendToDocument(button, element);
    return button;
  }

  public removeAllButtons() {
    this.allButtons = this.allButtons.reduce((a, b) => {
      b.remove();
      return a;
    }, [])
  }

  public removeButton(id: string) {
    this.allButtons.filter(b => b.id === id)
      .forEach(b => b.remove());
  }

  private newButton(settings: IButtonSettings): HTMLButtonElement {
    const button = document.createElement('button');
    this.applySettingsToButton(button, settings);
    return button;
  }

  private applySettingsToButton(button: HTMLButtonElement, settings: IButtonSettings) {
    const attrs: any = nearClone(settings);

    attrs.onclick = attrs.onClick;
    delete attrs.onClick;

    button.innerHTML = attrs.text
    delete attrs.text;

    traverseObject(attrs, (prop, value) => {
      button[prop] = value
    }, false, false)
  }

  private addToButtonStore(button: HTMLButtonElement) {
    this.allButtons.push(button);
  }

  private appendToDocument(button: HTMLButtonElement, parent?: HTMLElement) {
    const el = parent || this.baseElement();
    el.appendChild(button);
  }

  private baseElement(): HTMLElement {
    return document.getElementById(defaults.baseElementId);
  }

}

export const buttonsController = new ButtonsController();
