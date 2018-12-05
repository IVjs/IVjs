import { PluginRegistration } from '../../../base-iv';
import { AddZone, addZone, addZoneFactory } from './add-zone';
import { RemoveZone, removeZone, removeDragTargetFactory } from './remove-zone';

export const zonesPlugin: PluginRegistration = {
  apiExtension: { addZone, removeZone },
  targetFunctionFactories: [addZoneFactory, removeDragTargetFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddZone, RemoveZone {}
}
