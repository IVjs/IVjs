import { Node } from './node';
import { createDomEngine } from './commandEngine';
import { isMobileOrTablet } from 'mobile-detector';
import { qsaToArray } from './utils';

interface ConstructorInput {
  variables?: Partial<IV.Variables>;
  settings?: Partial<IV.Settings>;
}

export class IV {
  public variables: Partial<IV.Variables> = {};
  public settings: Partial<IV.Settings> = {};
  
  private defaultSettings: IV.Settings = {
    baseContainer: document.getElementById('IV-view'),
    baseVideoUrl: '',
  }
  
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
    this.setup();
  }

  private validateDom() {
    if (!this.getSetting('baseContainer')) {
      throw new Error(`No valid node present in HTML`)
    }
  }

  private setup() {
  }

  private getSetting(name: keyof IV.Settings) {
    if (this.settings[name]) return this.settings[name];
    return this.defaultSettings[name];
  }

  private getSettings() {
    const settings = {};
    for (let key in this.defaultSettings) {
      settings[key] = this.getSetting(key as keyof IV.Settings);
    }
    return settings as IV.Settings;
  }

  public node(name: string) {
    const newNode = new Node(name);
    this.nodes.push(newNode);
    return newNode; // Beginning of chainable node
  }

  public defineNode = this.node;

  public run(name) {
    const { nodes, variables } = this;
    const engine = createDomEngine({
      settings: this.getSettings(),
      nodes,
      variables,
    });

    this.runOnAnyPlatform(engine);
  }

  private runOnAnyPlatform(engine) {
    if (isMobileOrTablet()) {
      this.runViaButton(this.createKickoffButton(), engine);
    } else {
      engine.run();
    }
  }

  private createKickoffButton() {
    var startBtn = document.createElement('button');
    startBtn.type = 'button';
    startBtn.id = 'IV-kickoff';
    startBtn.innerHTML = 'Kickoff';
    (this.getSettings().baseContainer as HTMLElement).appendChild(startBtn);
    return startBtn;
  }

  private runViaButton(btn: HTMLElement, engine) {
    const handleClick = () => {
      btn.removeEventListener('click', handleClick);
      this.prepVideosForMobile();
      btn.remove();
      engine.run();
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
