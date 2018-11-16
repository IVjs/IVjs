import { isMobileOrTablet } from 'mobile-detector';
import { createBaseEngine, IvCommandEngine } from './command-engine';
import { defaults } from './config';
import { IvNode, Node } from './node';
import { qsaToArray } from './utils';
import { forceArray } from 'happy-helpers';

interface ConstructorInput {
  variables?: Partial<IV.Variables>;
  settings?: Partial<IV.Settings>;
}

interface ApiFunctionRegistration {
  apiExtension: {
    [x: string]: (this: IvNode, ...userArgs: any[]) => void;
  };
}

interface TargetFunctionRegistration {
  targetFunctionFactories: CommandEngine.TargetFunctionFactory[],
}

interface AliasRegistration {
  aliases: Array<{
    target: string;
    aliasAs: string | string[];
  }>;
}

export type PluginRegistration = Partial<(TargetFunctionRegistration & ApiFunctionRegistration & AliasRegistration)>

function isApiRegistration(pr: PluginRegistration): pr is ApiFunctionRegistration {
  return !!(pr as Partial<ApiFunctionRegistration>).apiExtension
}

function isTargetFnRegistration(pr: PluginRegistration): pr is TargetFunctionRegistration {
  return !!(pr as Partial<TargetFunctionRegistration>).targetFunctionFactories
}

function isAliasRegistration(pr: PluginRegistration): pr is AliasRegistration {
  return !!(pr as Partial<AliasRegistration>).aliases
}

export class BaseIV {
  public static extend(...registrations: PluginRegistration[]): typeof BaseIV {
    const originalNodeKlass = this.nodeKlass;
    const newNodeKlass = class extends originalNodeKlass { }; // tslint:disable-line max-classes-per-file
    const targetFunctionFactories: CommandEngine.TargetFunctionFactory[] = [];
    registrations.forEach(plugin => {
      if (isApiRegistration(plugin)) {
        Object.keys(plugin.apiExtension).forEach(fnName => {
          newNodeKlass.prototype[fnName] = function() { plugin.apiExtension[fnName].apply(this, arguments); return this; };
        });
      }
      if (isTargetFnRegistration(plugin)) {
        targetFunctionFactories.push(...plugin.targetFunctionFactories);
      }
      if (isAliasRegistration(plugin)) {
        plugin.aliases.forEach(alias => {
          const { target } = alias;
          const aliases = forceArray(alias.aliasAs);
          aliases.forEach(aliasAs => {
            newNodeKlass.prototype[aliasAs] = newNodeKlass.prototype[target];
          });
        })
      }
    });
    return class extends this { // tslint:disable-line max-classes-per-file
      protected additionalFactories = targetFunctionFactories;
      protected static nodeKlass = newNodeKlass;
      protected nodeKlassReference = newNodeKlass;
    };
  }

  public variables: Partial<IV.Variables> = {};
  public settings: Partial<IV.Settings> = {};

  private defaultSettings: IV.Settings = {
    baseContainer: document.getElementById(defaults.baseElementId),
    baseVideoUrl: '',
    bgAudioUrl: null,
    bgAudioLoop: true,
  }

  private engine: IvCommandEngine;

  private nodes: BaseNode[] = []
  protected static nodeKlass = Node;
  protected nodeKlassReference = Node;
  protected additionalFactories: CommandEngine.TargetFunctionFactory[] = [];

  constructor(initialState: ConstructorInput = {}) {
    const {variables, settings} = initialState;
    if (variables) {
      this.variables = variables;
    }
    if (settings) {
      this.settings = settings;
    }
    this.validateDom();
  }

  public node(name: string): IvNode {
    const newNode = new this.nodeKlassReference(name);
    this.nodes.push(newNode);
    return newNode as unknown as IvNode;
  }

  public defineNode = this.node; // tslint:disable-line member-ordering

  public run(name?: string) {
    this.runOnAnyPlatform(this.getEngine(), name);
  }

  public createRunButton(name?: string, node?: string): HTMLButtonElement {
    const engine = this.getEngine();
    const btn = this.createKickoffButton(name)
    this.runViaButton(btn, engine, node);
    return btn;
  }

  private getEngine(): IvCommandEngine {
    return this.engine ? this.engine : this.engine = createBaseEngine(
      {
        settings: this.getSettings(),
        nodes: this.nodes,
        variables: this.variables,
      },
     ...this.additionalFactories,
    );
  }

  private validateDom() {
    if (!this.getSetting('baseContainer')) {
      throw new Error(`No valid node present in HTML`)
    }
  }

  private getSetting(name: keyof IV.Settings) {
    if (this.settings[name] !== undefined) { return this.settings[name]; }
    return this.defaultSettings[name];
  }

  private getSettings() {
    const settings = {};
    for (const key of Object.keys(this.defaultSettings)) {
      settings[key] = this.getSetting(key as keyof IV.Settings);
    }
    return settings as IV.Settings;
  }

  private runOnAnyPlatform(engine: IvCommandEngine, name?: string) {
    if (this.isMobileOrTablet()) {
      this.runViaButton(this.createKickoffButton(), engine, name);
    } else {
      engine.run(name);
    }
  }

  private isMobileOrTablet() {
    return isMobileOrTablet();
  }

  private createKickoffButton(label = 'Kickoff') {
    const startBtn = document.createElement('button');
    startBtn.type = 'button';
    startBtn.id = 'IV-kickoff';
    startBtn.innerHTML = label;
    (this.getSettings().baseContainer as HTMLElement).appendChild(startBtn);
    return startBtn;
  }

  private runViaButton(btn: HTMLElement, engine, name?: string) {
    const handleClick = () => {
      btn.removeEventListener('click', handleClick);
      this.prepVideosForMobile();
      btn.remove();
      engine.run(name);
    }
    btn.addEventListener('click', handleClick);
  }

  private prepVideosForMobile() {
    // TODO: move this method to VideoController
    // and call from here, or with registered kickoff event
    const videos = qsaToArray(document.querySelectorAll('video')) as HTMLVideoElement[]
    videos.forEach(vid => {
      vid.play();
      vid.pause();
    })
  }
}
