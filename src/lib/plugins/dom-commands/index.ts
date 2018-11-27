import { PluginRegistration } from '../../base-iv';
import { videoPlugin } from './video';
import { audioPlugin } from './audio';
import { buttonsPlugin } from './buttons';

// Ensure that the export chain reaches up to our
// IvNode module merges.
export * from './video';
export * from './audio';
export * from './buttons';

const plugins: PluginRegistration[] = [videoPlugin, audioPlugin, buttonsPlugin];

export default plugins;
