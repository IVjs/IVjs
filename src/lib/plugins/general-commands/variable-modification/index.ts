import { PluginRegistration } from '../../../base-iv';
import { assignVariableFactory, assignFromVariableFactory, setVariable } from './set-variable';
import { calculate, calculateFactory } from '../variable-modification/calculate';
import { getRandomNumberApi, getRandomNumberFactory } from './get-random-number';

export const variableManipulationPlugin: PluginRegistration = {
  apiExtensions: [{
    apiName: 'setVariable',
    apiFn: setVariable,
  }, {
    apiName: 'calculate',
    apiFn: calculate,
  }, {
    apiName: 'getRandom',
    apiFn: getRandomNumberApi,
  }],
  targetFunctionFactories: [
    assignVariableFactory,
    assignFromVariableFactory,
    calculateFactory,
    getRandomNumberFactory,
  ],
}

declare module '../../../node' {
  interface NodeExtensions {
    setVariable: typeof setVariable;
    calculate: typeof calculate;
    getRandom: typeof getRandomNumberApi;
  }
}
