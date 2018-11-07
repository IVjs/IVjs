import { PluginRegistration } from '../../../base-iv';
import { addButton, removeAllButtons, addButtonFactory, removeAllButtonsFactory, removeButtonFactory } from './button-commands';

export const buttonsPlugin: PluginRegistration = {
  apiExtensions: [
    {
      apiName: 'addButton',
      apiFn: addButton,
    },
    {
      apiName: 'removeAllButtons',
      apiFn: removeAllButtons,    
    },
  ],
  targetFunctionFactories: [
    addButtonFactory,
    removeAllButtonsFactory,
    removeButtonFactory,
  ],
}

declare module '../../../node' {
  interface NodeExtensions {
    addButton: typeof addButton;
    removeAllButtons: typeof removeAllButtons;
  }
}
