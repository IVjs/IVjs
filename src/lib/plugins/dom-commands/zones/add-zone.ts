import { IvNode } from '../../../node';
import { videoController } from '../video/video-controller';

export interface AddZoneSettings {
  id: string;
  width: number;
  height: number;
  top: number;
  left: number;
  visible?: boolean;
  onClick?: OnClickOptions;
}

export type OnClickOptions = Partial<{
  js: () => void;
  setVariable: string;
  goToNode: string;
}>;

export const addZoneFactory: CommandEngine.CommandHandlerInitializer = (
  input,
): Runner.CommandHandlerRegistrationObject => {
  const videoParent = input.settings.baseContainer.querySelector('video').parentElement as HTMLElement;

  return {
    addZone: async (cmd: ICommand.AddZone) => {
      const itemWithSameId = videoParent.querySelector(`#${cmd.id}`);
      if (itemWithSameId) {
        console.warn(
          `You added a drag target with an id ("${cmd.id}") that is already in use in the dom. Removing the previous ${
            cmd.id
          } to make room for the new.`,
        );
        itemWithSameId.remove();
      }

      const zone = document.createElement('div');
      const video = videoController.getCurrentPlayer();

      zone.id = cmd.id;
      zone.style.width = video.clientWidth * (cmd.size.width / 100) + 'px';
      zone.style.height = video.clientHeight * (cmd.size.height / 100) + 'px';
      zone.style.position = 'absolute';
      zone.style.top = video.offsetTop + (cmd.position.y / 100) * video.clientHeight + 'px';
      zone.style.left = video.offsetLeft + (cmd.position.x / 100) * video.clientWidth + 'px';
      zone.style.border = cmd.visible ? '2px solid blue' : zone.style.border;
      videoParent.append(zone);

      zone.onclick = () => {
        const { js, setVariable, goToNode } = (cmd.onClick || {}) as OnClickOptions;
        if (setVariable) {
          input.variables[setVariable] = zone.id;
        }
        if (js) {
          js();
        }
        if (goToNode) {
          input.commandEngine.runNodeByName(goToNode);
        }
      };

      return Promise.resolve({});
    },
  };
};

export interface AddZone {
  addZone(settings: AddZoneSettings);
}

export const addZone: AddZone['addZone'] = function(this: IvNode, settings?: AddZoneSettings): void {
  const { id, width, height, top, left, onClick, visible } = settings;
  const cmd: ICommand.AddZone = {
    name: 'addZone',
    id,
    size: { width, height },
    position: { x: left, y: top },
    onClick,
    visible,
  };
  this.pushCommands(cmd);
};
