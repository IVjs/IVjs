import { PluginRegistration } from '../../../plugin-types';
import { AddRemoveAllButtons, AddAddButton } from './button-commands';
export declare const buttonsPlugin: PluginRegistration;
declare module '../../../node' {
  interface NodeExtensions extends AddRemoveAllButtons, AddAddButton {}
}
