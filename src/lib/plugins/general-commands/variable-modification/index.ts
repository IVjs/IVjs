import { PluginRegistration } from '../../../plugin-types';
import { assignVariableFactory, assignFromVariableFactory, setVariable, AddSetVariable } from './set-variable';
import { calculate, calculateFactory, AddCalculate } from '../variable-modification/calculate';
import { getRandomNumberApi, getRandomNumberFactory, AddGetRandom } from './get-random-number';
import {
  clearState,
  clearStateFactory,
  AddClearState,
  loadState,
  saveState,
  saveStateFactory,
  loadStateFactory,
  AddSaveState,
  AddLoadState,
} from '../variable-modification/storage';

export const variableManipulationPlugin: PluginRegistration = {
  nodeExtension: {
    calculate,
    setVariable,
    loadState,
    saveState,
    clearState,
    getRandom: getRandomNumberApi,
  },
  commandHandlerInitializers: [
    assignVariableFactory,
    assignFromVariableFactory,
    calculateFactory,
    getRandomNumberFactory,
    saveStateFactory,
    loadStateFactory,
    clearStateFactory,
  ],
};

declare module '../../../node' {
  interface NodeExtensions
    extends AddSaveState,
      AddLoadState,
      AddCalculate,
      AddGetRandom,
      AddSetVariable,
      AddClearState {}
}
