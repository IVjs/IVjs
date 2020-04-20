import {
  PluginRegistration,
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../../plugin-types';
import { chmod } from 'fs';
import { isNullOrUndefined } from 'util';

export const animateFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    animate: (cmd: ICommand.Animate) => {
      const el: HTMLElement = document.getElementById(cmd.id);
      el.style.transition = cmd.duration + 's';
      let transformString = '';
      let defaultCmd: ICommand.Animate = { name: 'animate', id: 'none', x: 0, y: 0, r: 0, scale: 1, opacity: 1 };
      let prevCmd: ICommand.Animate = { name: 'animate', id: 'none', x: 0, y: 0, r: 0, scale: 1, opacity: 1 };
      if (!isNullOrUndefined(el.getAttribute('data'))) {
        prevCmd = JSON.parse(el.getAttribute('data'));
        defaultCmd = { ...defaultCmd, ...prevCmd };
      }

      for (const key in cmd) {
        if (cmd[key] === undefined) {
          delete cmd[key];
        }
      }

      const finalCmd: ICommand.Animate = { ...defaultCmd, ...cmd };

      if (cmd.relative && !isNullOrUndefined(el.getAttribute('data'))) {
        if (cmd.x) {
          finalCmd.x += cmd.x;
        }
        if (cmd.y) {
          finalCmd.y += cmd.y;
        }
        if (cmd.r) {
          finalCmd.r += cmd.r;
        }
        if (cmd.scale) {
          finalCmd.scale += cmd.scale;
        }
        console.log(finalCmd);
      }

      transformString +=
        'translate(' +
        finalCmd.x.toString() +
        'px ,' +
        finalCmd.y.toString() +
        'px) scale(' +
        finalCmd.scale.toString() +
        ') rotate(' +
        finalCmd.r.toString() +
        'deg)';

      if (cmd.opacity) {
        el.setAttribute('opacity', cmd.r.toString());
      }

      el.style.transform = transformString;
      el.setAttribute('data', JSON.stringify(finalCmd));
      return Promise.resolve({});
    },
  };
};

interface AddAnimate {
  animate(animateOptions: AnimateOptions);
}

interface AnimateOptions {
  id: string;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  r?: number;
  opacity?: number;
  relative?: boolean;
}

const animate: AddAnimate['animate'] = function(this: CommandBuilderContext, input: AnimateOptions): void {
  const command: ICommand.Animate = {
    name: 'animate',
    id: input.id,
    duration: input.duration,
    x: input.x,
    y: input.y,
    r: input.r,
    scale: input.scale,
    opacity: input.opacity,
    relative: input.relative,
  };
  this.pushCommands(command);
};

export const animatePlugin: PluginRegistration = {
  nodeExtension: { animate },
  commandHandlerInitializers: [animateFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddAnimate {} // tslint:disable-line no-empty-interface
}
