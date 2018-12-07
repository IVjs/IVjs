import { PluginRegistration } from '../../../base-iv';
import { assignVariableFactory, assignFromVariableFactory, setVariable, AddSetVariable } from './set-variable';
import { calculate, calculateFactory, AddCalculate } from '../variable-modification/calculate';
import { getRandomNumberApi, getRandomNumberFactory, AddGetRandom } from './get-random-number';

export const variableManipulationPlugin: PluginRegistration = {
  nodeExtension: {
    calculate,
    setVariable,
    getRandom: getRandomNumberApi,
  },
  targetFunctionFactories: [assignVariableFactory, assignFromVariableFactory, calculateFactory, getRandomNumberFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddCalculate, AddGetRandom, AddSetVariable {}
}
