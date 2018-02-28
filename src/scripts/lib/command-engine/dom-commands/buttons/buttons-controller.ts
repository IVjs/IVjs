import { traverseObject } from 'happy-helpers';
import { defaults } from '../../../config';
import { nearClone, directDescendants } from '../../../utils'

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

  private appendToDocument(button: HTMLButtonElement, parentEl?: HTMLElement) {
    const container = this.getContainer(parentEl);
    container.appendChild(button);
  }

  private getContainer(parentEl?: HTMLElement): HTMLElement {
    const parent = parentEl || this.baseElement();
    const foundContainer = directDescendants(parent, `.${defaults.buttonContainerClass}`)[0]
    if (foundContainer) return foundContainer;

    const newContainer = document.createElement('div');
    newContainer.setAttribute('class', defaults.buttonContainerClass);
    parent.appendChild(newContainer);
    return newContainer;
  }

  private baseElement(): HTMLElement {
    return document.getElementById(defaults.baseElementId);
  }

}

export const buttonsController = new ButtonsController();
