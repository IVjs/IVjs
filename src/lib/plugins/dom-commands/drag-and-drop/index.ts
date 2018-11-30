import { PluginRegistration } from '../../../base-iv';
import { AddDragItem, addDragItemFactory, addDragItem } from './add-drag-item';
import { AddDragTarget, addDragTarget, addDragTargetFactory } from './add-drag-target';

export const dragAndDropPlugin: PluginRegistration = {
  apiExtension: { addDragItem, addDragTarget },
  targetFunctionFactories: [addDragItemFactory, addDragTargetFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddDragItem, AddDragTarget {}
}
