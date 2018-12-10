import { PluginRegistration } from '../../../plugin-types';
import { AddZone } from './add-zone';
import { RemoveZone } from './remove-zone';
export declare const zonesPlugin: PluginRegistration;
declare module '../../../node' {
  interface NodeExtensions extends AddZone, RemoveZone {}
}
