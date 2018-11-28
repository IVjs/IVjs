import { PluginRegistration } from '../../../base-iv';
import { AddDragItem, addDragItemFactory, addDragItem } from './add-drag-item';

export const dragAndDropPlugin: PluginRegistration = {
  apiExtension: { addDragItem },
  targetFunctionFactories: [addDragItemFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddDragItem {}
}
