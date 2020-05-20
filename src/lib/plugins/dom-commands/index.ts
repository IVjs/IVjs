import { PluginRegistration } from '../../plugin-types';
import { videoPlugin } from './video';
import { audioPlugin } from './audio';
import { buttonsPlugin } from './buttons';
import { dragAndDropPlugin } from './drag-and-drop';
import { zonesPlugin } from './zones';
import { imagePlugin } from './images';
import { animatePlugin } from './animate';
import { stylePlugin } from './style';
import { soundPlugin } from './sound';

// Ensure that the export chain reaches up to our
// IvNode module merges.
export * from './video';
export * from './audio';
export * from './buttons';
export * from './drag-and-drop';
export * from './zones';
export * from './images';
export * from './animate';
export * from './style';
export * from './sound';

const plugins: PluginRegistration[] = [
  stylePlugin,
  animatePlugin,
  videoPlugin,
  audioPlugin,
  buttonsPlugin,
  dragAndDropPlugin,
  zonesPlugin,
  imagePlugin,
  soundPlugin,
];

export default plugins;
