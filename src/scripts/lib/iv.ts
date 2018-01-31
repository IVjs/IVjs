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
  
  private buttonsEl: HTMLElement;
  private currentPlayer: HTMLVideoElement = null;
  private standbyPlayer: HTMLVideoElement = null;
  private currentNode: Node = null;
  private nodes: Node[] = []

  constructor(initialState: ConstructorInput = {}) {
    const {variables, settings} = initialState;
    if (variables) {
      this.variables = variables;
    }
    if (settings) {
      this.settings = settings;
    }

    this.setup();
  }

  private setup() {
    this.buttonsEl = document.getElementById(this.getSettings().buttonsContainerId)
    const players = this.getPlayers();
    this.currentPlayer = players[0];
    this.standbyPlayer = players[1];
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

  public defineNode(name: string) {
    const newNode = new Node(name);
    this.nodes.push(newNode);
    return newNode; // Beginning of chainable node
  }

  public run(name) {
    this.setCurrentNode(name);
    this.createButtons()
    this.playVideo();
  }

  private setCurrentNode(name: string) {
    var foundNode = this.nodes.find(x => x.name === name);
    if (foundNode) {
      this.currentNode = foundNode;
    } else {
      const names = this.nodes.map(n => `${n.name}`);
      throw new Error(`Could not find a node named "${name}". Available names are ${names.join(', ')}`);
    }
  }

  private createButtons() {
    // clear current buttons first
    this.buttonsEl.innerHTML = '';

    if (this.currentNode.buttons.length > 0) {
      this.currentNode.buttons.forEach((button) => {
        var newButton = document.createElement('button');
        var buttonText = document.createTextNode(button.text);
        newButton.appendChild(buttonText);
        newButton.onclick = (e) => {
          this.run(button.onClick);
        };
        this.buttonsEl.appendChild(newButton);
      });
    }
  }

  playVideo() {
    this.pausePreviousVideo();
    const video = this.getCurrentVideo();
    if (video) this.playVideoFromUrl(video);
  }
  
  playVideoFromUrl(video) {
    this.swapCurrentAndStandbyPlayers();
    
    this.playFromCurrentPlayer(video).then(() => {
      this.goToNextNode() || this.playVideoFromUrl(video)
    })
  }

  private goToNextNode(): boolean {
    if (this.currentNode.next) {
      this.run(this.currentNode.next)
      return true;
    } else {
      return false;
    }
  }

  private getCurrentVideo(): null | string {
    if (this.currentNode.url) {
      return this.getSettings().baseVideoUrl + this.currentNode.url;
    } else {
      return null;
    }
  }

  private playFromCurrentPlayer(videoUrl) {
    return new Promise((resolve) => {
      this.currentPlayer.onloadeddata = (e) => {
        this.currentPlayer.play();
        this.currentPlayer.style.display = 'block';
        this.standbyPlayer.style.display = 'none';
      };
  
      this.currentPlayer.onended = (e) => {
        resolve(e)
      };
  
      this.currentPlayer.src = videoUrl;
    });
  }

  private swapCurrentAndStandbyPlayers() {
    const standby = this.standbyPlayer;
    const current = this.currentPlayer;
    this.currentPlayer = standby;
    this.standbyPlayer = current;
  }

  private getPlayers() {
    return [
      document.getElementById(this.getSettings().videoOneId) as HTMLVideoElement,
      document.getElementById(this.getSettings().videoTwoId) as HTMLVideoElement,
    ]
  }

  private pausePreviousVideo() {
    this.currentPlayer.pause(); // causes small error that can be fixed later.
  }
}
