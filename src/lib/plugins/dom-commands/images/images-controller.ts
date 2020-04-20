import { traverseObject } from 'happy-helpers';
import { defaults } from '../../../config';
import { directDescendants, nearClone } from '../../../utils';
import { relative } from 'path';

export interface IImageSettings {
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  rotation?: number;
  layer?: number;
  url: string;
  transition: number;
  onClick(): any;
  [s: string]: any;
}

class ImagesController {
  private allImages: HTMLImageElement[] = [];

  public createImage(settings: IImageSettings, element?: HTMLElement): HTMLImageElement {
    const image = this.newImage(settings);
    this.addToImageStore(image);
    this.appendToDocument(image, element);
    return image;
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
        b.style.transition = transition.toString() + 's';
        b.style.opacity = '0';
        setTimeout(() => {
          b.remove();
          this.allImages.splice(this.allImages.indexOf(b), 1);
        }, transition * 1000);
      });
  }

  private newImage(settings: IImageSettings): HTMLImageElement {
    const image = document.createElement('img');
    this.applySettingsToImage(image, settings);
    image.src = settings.url;
    image.style.position = 'absolute';
    image.style.top = settings.position.y.toString();
    image.style.left = settings.position.x.toString();
    image.style.width = settings.size.width.toString();
    image.style.height = settings.size.height.toString();
    image.style.transform = 'rotate(' + settings.rotation + 'deg)';
    image.style.zIndex = settings.layer.toString();
    image.setAttribute('transition', settings.transition.toString());
    image.style.opacity = '0';
    image.style.transition = 'opacity ' + settings.transition.toString() + 's';
    setTimeout(() => {
      image.style.opacity = '1';
    }, 50);
    // image.classList.add();
    return image;
  }

  private applySettingsToImage(image: HTMLImageElement, settings: IImageSettings) {
    const attrs: any = nearClone(settings);

    attrs.onclick = attrs.onClick;
    delete attrs.onClick;

    traverseObject(
      attrs,
      (prop, value) => {
        image[prop] = value;
      },
      false,
      false,
    );
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
