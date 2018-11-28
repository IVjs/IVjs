import { PluginRegistration } from '../../../base-iv';

export const dragAndDropPlugin: PluginRegistration = {
  apiExtension: {},
  targetFunctionFactories: [],
};

declare module '../../../node' {
  interface NodeExtensions {}
}
