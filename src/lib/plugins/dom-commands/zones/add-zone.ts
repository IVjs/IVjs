import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../../plugin-types';
import { videoController } from '../video/video-controller';

export interface AddZoneSettings {
  id: string;
  width: number;
  height: number;
  top: number;
  left: number;
  z?: number;
  visible?: boolean;
  onClick?: OnClickOptions;
}

export type OnClickOptions = Partial<{
  js: () => void;
  setVariable: string;
  goToNode: string;
}>;

export const addZoneFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  let zonesContainer: HTMLElement = document.getElementById('IV-zones-container');

  if (!zonesContainer) {
    zonesContainer = document.createElement('div');
    zonesContainer.id = 'IV-zones-container';
    zonesContainer.style.zIndex = '20';
    zonesContainer.style.top = '0';
    zonesContainer.style.left = '0';
    zonesContainer.style.position = 'absolute';
    document.getElementById('IV-view').appendChild(zonesContainer);
  }

  return {
    addZone: async (cmd: ICommand.AddZone) => {
      const itemWithSameId = zonesContainer.querySelector(`#${cmd.id}`);
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

      setTimeout(() => {
        zone.id = cmd.id;
        zone.style.width = video.clientWidth * (cmd.size.width / 100) + 'px';
        zone.style.height = video.clientHeight * (cmd.size.height / 100) + 'px';
        zone.style.position = 'absolute';
        zone.style.zIndex = '100';
        zone.style.cursor = 'pointer';
        zone.style.top = video.offsetTop + (cmd.position.y / 100) * video.clientHeight + 'px';
        zone.style.left = video.offsetLeft + (cmd.position.x / 100) * video.clientWidth + 'px';
        zone.style.border = cmd.visible ? '2px solid blue' : zone.style.border;
        zone.classList.add('IV-zone');
        zonesContainer.append(zone);

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
      }, 300);

      return Promise.resolve({});
    },
  };
};

export interface AddZone {
  addZone(settings: AddZoneSettings);
}

export const addZone: AddZone['addZone'] = function(this: CommandBuilderContext, settings?: AddZoneSettings): void {
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
