import { PluginRegistration } from '../../../base-iv';
import { AddSetVariable } from './set-variable';
import { AddCalculate } from '../variable-modification/calculate';
import { AddGetRandom } from './get-random-number';
export declare const variableManipulationPlugin: PluginRegistration;
declare module '../../../node' {
  interface NodeExtensions extends AddCalculate, AddGetRandom, AddSetVariable {}
}
