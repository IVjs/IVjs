import { PluginRegistration } from '../../../plugin-types';
import { AddDragItem, addDragItemFactory, addDragItem } from './add-drag-item';
import { AddDragTarget, addDragTarget, addDragTargetFactory } from './add-drag-target';
import {
  RemoveDragObjects,
  removeDragItem,
  removeDragItemFactory,
  removeDragTarget,
  removeDragTargetFactory,
} from './remove-objects';

export const dragAndDropPlugin: PluginRegistration = {
  nodeExtension: { addDragItem, addDragTarget, removeDragItem, removeDragTarget },
  commandHandlerInitializers: [
    addDragItemFactory,
    addDragTargetFactory,
    removeDragItemFactory,
    removeDragTargetFactory,
  ],
};

declare module '../../../node' {
  interface NodeExtensions extends AddDragItem, AddDragTarget, RemoveDragObjects {}
}
