import { ButtonCommandsBuilder, ButtonOptions } from './node-builders/button-commands-builder';
import { PlayVideoInput, VideoCommandsBuilder } from './node-builders/video/video-commands-builder';

interface SwitchBase {
  var: string;
}

interface Is extends SwitchBase {
  is: string | number | boolean;
}

interface IsGreaterThan extends SwitchBase {
  isGreaterThan: number;
}

interface IsLessThan extends SwitchBase {
  isLessThan: number;
}

interface IsBetween extends SwitchBase {
  isBetween: number[];
}


interface IsGreaterThanOrEqualTo extends SwitchBase {
  isGreaterThanOrEqualTo: number;
}

interface IsLessThanOrEqualTo extends SwitchBase {
  isLessThanOrEqualTo: number;
}

type ifOptions = Partial<
    Is
  & IsGreaterThan
  & IsLessThan
  & IsGreaterThanOrEqualTo
  & IsLessThanOrEqualTo
  & IsBetween
>

interface RandomOptions {
  min: number;
  max: number;
  storeIn: string;
}

interface BaseAssignVariable {
  storeIn: string;
}

interface AssignVariableWithVar extends BaseAssignVariable {
  var: string;
}

interface AssignVariableWithValue extends BaseAssignVariable  {
  value: string | number | Array<string | number>;
}

type AssignVariableOptions =  BaseAssignVariable & Partial<AssignVariableWithVar & AssignVariableWithValue>;

interface AudioAction {
  action: 'play' | 'pause' | 'load';
  url?: string;
  loop?: boolean;
}

interface AudioShorthand {
  play?: string;
  load?: string;
  loop?: boolean;
}

type AudioInput = 'play' | 'pause' | 'loop' | AudioShorthand | AudioAction;

export interface NodeExtensions {} // tslint:disable-line no-empty-interface

type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never;
type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;

type NodeExtended = {
  [P in keyof NodeExtensions]: ReplaceReturnType<NodeExtensions[P], IvNode>
};

export type IvNode = Node & NodeExtended

export class Node implements BaseNode {

  private commands: ICommand.AnyCommand[] = [];
  private switchDo: ICommand.Switch;
  private pushType: string = 'main';
  private videoCommands = new VideoCommandsBuilder();
  private buttonCommands = new ButtonCommandsBuilder();

  constructor( public name: string ) { }


  public getCommands() {
    return this.commands;
  }

  private pusher(command: ICommand.AnyCommand[] | ICommand.AnyCommand){
    if (Array.isArray(command)) { return command.forEach(c => this.pusher(c)) }
    if(this.pushType === 'condition')
    {
      this.switchDo.do[this.switchDo.do.length - 1].commands.push(command);
    }
    else if(this.pushType === 'default')
    {
      this.switchDo.defaultCommands.push(command);
    }
    else
    {
      this.commands.push(command);
    }
  }

  public pushCommands(...commands: ICommand.AnyCommand[]): void {
    this.pusher(commands);
  }

  public addButton(input: ButtonOptions): IvNode {
    const cmd = this.buttonCommands.addButton(input);
    this.pusher(cmd);
    return this as any as IvNode;
  }

  public removeAllButtons(): IvNode {
    const cmd = this.buttonCommands.removeAllButtons();
    this.pusher(cmd);
    return this as any as IvNode;
  }

  public if(optionsObj: ifOptions): IvNode {
    // TODO: need to instantiate a new for each if.
    if (this.switchDo == null)
    {
    this.switchDo = {name: 'switch', do: [], defaultCommands: []};
    }
    this.pushType = 'condition';
      if (optionsObj.is)
      {
        this.switchDo.do.push({varName: optionsObj.var, is: optionsObj.is, commands: []});
      }
      else if (optionsObj.isGreaterThan)
      {
        this.switchDo.do.push({varName: optionsObj.var, isGreaterThan: optionsObj.isGreaterThan, commands: []});
      }
      else if (optionsObj.isLessThan)
      {
        this.switchDo.do.push({varName: optionsObj.var, isLessThan: optionsObj.isLessThan, commands: []});
      }
      else if (optionsObj.isBetween)
      {
        this.switchDo.do.push({varName: optionsObj.var, isBetween: optionsObj.isBetween, commands: []});
      }
      else if (optionsObj.isGreaterThanOrEqualTo)
      {
        this.switchDo.do.push({varName: optionsObj.var, isGreaterThanOrEqualTo: optionsObj.isGreaterThanOrEqualTo, commands: []});
      }
      else if (optionsObj.isLessThanOrEqualTo)
      {
        this.switchDo.do.push({varName: optionsObj.var, isGreaterThanOrEqualTo: optionsObj.isLessThanOrEqualTo, commands: []});
      }
    return this as any as IvNode;
  }

  public else(): IvNode {
    this.pushType = 'default';
    return this as any as IvNode;
  }

  public endIf(): IvNode {
    this.pushType = 'main';
    this.pusher(this.switchDo);
    return this as any as IvNode;
  }

  public playVideo(...input: PlayVideoInput[]) : IvNode {
    this.pusher(this.videoCommands.playVideo(...input))
    return this as any as IvNode;
  }

  public videoPlay(...input: PlayVideoInput[]): IvNode {
    console.warn('The `videoPlay` command is deprecated. Please Use `playVideo`')
    this.pusher(this.videoCommands.playVideo(...input))
    return this as any as IvNode;
  }

  public getRandom(objSettings: RandomOptions) : IvNode {
    const command: ICommand.GetRandomNumber = { name:'getRandomNumber', min: objSettings.min, max: objSettings.max, assignTo: objSettings.storeIn };
    this.pusher(command);
    return this as any as IvNode;
  }

  public setVariable(objSettings: AssignVariableOptions) : IvNode {
    if (objSettings.var)
    {
      const command: ICommand.AssignFromVariable = { name:'assignFromVariable', varName : objSettings.var,  assignTo: objSettings.storeIn };
      this.pusher(command);
    }
    else
    {
      if(objSettings.value)
      {
        const command: ICommand.AssignVariable = { name:'assignVariable', value: objSettings.value , assignTo: objSettings.storeIn };
        this.pusher(command);
      }

    }
    return this as any as IvNode;
  }


  public wait(time: number) : IvNode {
    const msTime = time * 1000;
    const command: ICommand.Wait = { name:'wait', time: msTime };
    this.pusher(command);
    return this as any as IvNode;
  }


  public goto(nodeName: string) : IvNode {
    const commands = this.buildGoToNodeCommandSet(nodeName);
    commands.forEach(c => this.pusher(c))
    return this as any as IvNode;
  }

  private buildGoToNodeCommandSet(nodeName: string): [
    ICommand.GoToNode,
    ICommand.StopExecution
  ] {
    return [
      { name: 'goToNode', nodeName },
      { name: 'stopExecution' }
    ];
  }

  public execute(nodeName: string) : IvNode {
    const command: ICommand.ExecuteAsync = {name:'executeAsync', nodeName};
    this.pusher(command);
    return this as any as IvNode;
  }

  public log(anything: any): IvNode {
    const command: ICommand.Log = {
      name: 'log',
      value: anything,
    };
    this.pusher(command);
    return this as any as IvNode;
  }

  public goSub(nodeName: string) : IvNode {
    const command: ICommand.ExecuteSync = {name:'executeSync', nodeName};
    this.pusher(command);
    return this as any as IvNode;
  }


  public return() : IvNode {
    const commandStop: ICommand.StopExecution = {name:'stopExecution'};
    this.pusher(commandStop);
    return this as any as IvNode;
  }

  public bgAudio(input: AudioInput) {
    const command = this.bgAudioCommand(input)
    this.pusher(command);
    return this as any as IvNode;
  }

  private bgAudioCommand(input: AudioInput): ICommand.AudioSource {
    if (typeof input === 'string') {
      return {
        name: 'audioSource',
        target: 'BG',
        do: input === 'loop' ? null : input,
        loop: input === 'loop' ? true : undefined,
      }
    } else {
      if ((input as AudioAction).action) {
        return {
          name: 'audioSource',
          target: 'BG',
          do: (input as AudioAction).action,
          file: (input as AudioAction).url,
          loop: (input as AudioAction).loop,
        }
      } else {
        const { play, load, loop } = input as AudioShorthand;
        if (play) {
          return {
            name: 'audioSource',
            target: 'BG',
            do: 'play',
            file: play,
            loop
          }
        } else if (load) {
          return {
            name: 'audioSource',
            target: 'BG',
            do: 'load',
            file: load,
            loop
          }
        } else {
          return {
            name: 'audioSource',
            target: 'BG',
            do: null,
            file: load,
            loop
          }
        }
      }
    }
  }

  public setVolume(input: {target: 'bg'|'sfx', volume: number, time?: number}): IvNode {
    const {volume, target, time} = input;
    const command: ICommand.AudioVolume = {
      name: 'audioVolume',
      target: target.toUpperCase() as 'BG' | 'SFX',
      volume,
      time: time ? time * 1000 : time,
    }
    this.pusher(command);
    return this as any as IvNode;
  }

  public clearVideo(time?: number) : IvNode {
    this.pusher(this.videoCommands.clearVideo(time));
    return this as any as IvNode;
  }

}
