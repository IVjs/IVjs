import { PluginRegistration } from '../../base-iv';
import { videoPlugin } from './video';
import { audioPlugin } from './audio';
import { buttonsPlugin } from './buttons';
import { dragAndDropPlugin } from './drag-and-drop';

// Ensure that the export chain reaches up to our
// IvNode module merges.
export * from './video';
export * from './audio';
export * from './buttons';
export * from './drag-and-drop';

const plugins: PluginRegistration[] = [videoPlugin, audioPlugin, buttonsPlugin, dragAndDropPlugin];

export default plugins;
