import { traverseObject } from 'happy-helpers';
import { defaults } from '../../../config';
import { directDescendants, nearClone } from '../../../utils';
import { relative } from 'path';

export interface IImageSettings {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  layer?: number;
  url: string;
  transition: number;
  onClick(): any;
  [s: string]: any;
}

class ImagesController {
  private allImages: HTMLImageElement[] = [];

  public createImage(settings: IImageSettings, element?: HTMLElement): HTMLImageElement {
    const image = document.createElement('img');
    image.onclick = settings.onClick;
    image.src = settings.url;
    image.id = settings.id;
    image.setAttribute(
      'style',
      'position: absolute;top:' +
        settings.y.toString() +
        'px ; left:' +
        settings.x.toString() +
        'px; width:' +
        settings.w.toString() +
        'px; height:' +
        settings.h.toString() +
        'px; transform: rotate(' +
        settings.r +
        'deg); z-index:' +
        settings.layer.toString(),
    );
    image.setAttribute('transition', settings.transition.toString());
    image.style.opacity = '0';
    image.style.transition = 'opacity ' + settings.transition.toString() + 's';
    setTimeout(() => {
      image.style.opacity = '1';
    }, 50);
    this.addToImageStore(image);
    this.appendToDocument(image, element);
    return image;
  }

  public waitFor(selector: string) {
    return new Promise((res, rej) => {
      waitForElementToDisplay(selector, 200);
      // tslint:disable-next-line:no-shadowed-variable
      function waitForElementToDisplay(selector, time) {
        if (document.getElementById(selector) != null) {
          res(document.querySelector(selector));
        } else {
          setTimeout(() => {
            waitForElementToDisplay(selector, time);
          }, time);
        }
      }
    });
  }

  public removeAllImages(transition?: number) {
    this.allImages.forEach(b => {
      const idx = this.allImages.indexOf(b);
      b.style.transition = transition * (idx + 1) + 's';
      b.style.opacity = '0';
      setTimeout(() => {
        b.remove();
        this.allImages.splice(idx, 1);
      }, transition * (idx + 1) * 1000);
    });
  }

  public removeImage(id: string, transition?: number) {
    this.allImages
      .filter(b => b.id === id)
      .forEach(b => {
        if (!transition) {
          transition = 0;
        }
        b.style.transition = transition.toString() + 's';
        b.style.opacity = '0';
        setTimeout(() => {
          b.remove();
          this.allImages.splice(this.allImages.indexOf(b), 1);
        }, transition * 1000);
      });
  }

  private addToImageStore(image: HTMLImageElement) {
    this.allImages.push(image);
  }

  private appendToDocument(image: HTMLImageElement, parentEl?: HTMLElement) {
    const container = this.getContainer(parentEl);
    container.appendChild(image);
  }

  private getContainer(parentEl?: HTMLElement): HTMLElement {
    const parent = parentEl || this.baseElement();
    const foundContainer = directDescendants(parent, `.${defaults.imageContainerClass}`)[0];
    if (foundContainer) {
      return foundContainer;
    }

    const newContainer = document.createElement('div');
    newContainer.setAttribute('class', defaults.imageContainerClass);
    newContainer.style.position = 'absolute';
    newContainer.style.top = '0';
    newContainer.style.left = '0';
    newContainer.style.width = '0';
    newContainer.style.height = '0';
    newContainer.style.zIndex = '7';
    parent.appendChild(newContainer);
    return newContainer;
  }

  private baseElement(): HTMLElement {
    return document.getElementById(defaults.baseElementId);
  }
}

export const imagesController = new ImagesController();
