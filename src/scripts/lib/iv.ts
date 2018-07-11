import { Node } from './node';
import { createDomEngine, IvCommandEngine } from './command-engine';
import { isMobileOrTablet } from 'mobile-detector';
import { qsaToArray } from './utils';
import { defaults } from './config';

interface ConstructorInput {
  variables?: Partial<IV.Variables>;
  settings?: Partial<IV.Settings>;
}

export class IV {
  public variables: Partial<IV.Variables> = {};
  public settings: Partial<IV.Settings> = {};

  private defaultSettings: IV.Settings = {
    baseContainer: document.getElementById(defaults.baseElementId),
    baseVideoUrl: '',
    bgAudioUrl: null,
    bgAudioLoop: true,
  }

  private engine: IvCommandEngine;

  private nodes: Node[] = []

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

  public node(name: string) {
    const newNode = new Node(name);
    this.nodes.push(newNode);
    return newNode; // Beginning of chainable node
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
    return this.engine ? this.engine : this.engine = createDomEngine({
      settings: this.getSettings(),
      nodes: this.nodes,
      variables: this.variables,
    });
  }

  private validateDom() {
    if (!this.getSetting('baseContainer')) {
      throw new Error(`No valid node present in HTML`)
    }
  }

  private getSetting(name: keyof IV.Settings) {
    if (this.settings[name] !== undefined) return this.settings[name];
    return this.defaultSettings[name];
  }

  private getSettings() {
    const settings = {};
    for (let key in this.defaultSettings) {
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
    var startBtn = document.createElement('button');
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
