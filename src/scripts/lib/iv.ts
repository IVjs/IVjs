import { Node } from './node';
import { createDomEngine } from './commandEngine';

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
    })

    engine.run();
  }

}
