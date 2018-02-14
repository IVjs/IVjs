import { Node } from './node';

interface Settings {
  baseVideoUrl: string;
  buttonsContainerId: string;
  videoOneId: string;
  videoTwoId: string;
}

interface Variables {
  [x: string]: string | number | boolean;
}

interface ConstructorInput {
  variables?: Partial<Variables>;
  settings?: Partial<Settings>;
}

export class IV {
  public variables: Partial<Variables> = {};
  public settings: Partial<Settings> = {};
  
  private defaultSettings: Settings = {
    baseVideoUrl: '',
    buttonsContainerId: 'IV-buttons',
    videoOneId: 'IV-player1',
    videoTwoId: 'IV-player2',
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
    if (!document.getElementById('IV-view')) {
      throw new Error(`No valid node present in HTML`)
    }
  }

  private setup() {
  }

  private getSetting(name: keyof Settings) {
    if (this.settings[name]) return this.settings[name];
    return this.defaultSettings[name];
  }

  private getSettings() {
    const settings = {};
    for (let key in this.defaultSettings) {
      settings[key] = this.getSetting(key as keyof Settings);
    }
    return settings as Settings;
  }

  public node(name: string) {
    const newNode = new Node(name);
    this.nodes.push(newNode);
    return newNode; // Beginning of chainable node
  }

  public run(name) {
  }

}
