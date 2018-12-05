import { PluginRegistration } from '../../../base-iv';
import { AddDragItem } from './add-drag-item';
import { AddDragTarget } from './add-drag-target';
import { RemoveDragObjects } from './remove-objects';
export declare const dragAndDropPlugin: PluginRegistration;
declare module '../../../node' {
  interface NodeExtensions extends AddDragItem, AddDragTarget, RemoveDragObjects {}
}
