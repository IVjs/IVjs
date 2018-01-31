import { Node } from './node';

interface Settings {
  baseVideoUrl: string;
  buttonsContainerId: string;
}

interface Variables {
  [x: string]: string | number | boolean;
}

interface ConstructorInput {
  variables?: Partial<Variables>;
  settings?: Partial<Settings>;
}

export class IV {
  private buttonsEl: HTMLElement;

  public settings: Settings = {
    baseVideoUrl: '',
    buttonsContainerId: 'IV-buttons',
  }

  public variables = {}

  private currentPlayer = {
    check: '',
    player: null as HTMLVideoElement,
  };

  private nodes: Node[] = []

  constructor(initialState: ConstructorInput = {}) {
    const {variables, settings} = initialState;
    if (variables) {
      this.variables = variables;
    }
    if (settings) {
      this.settings.baseVideoUrl = settings.baseVideoUrl || '';
    }

    this.setup();
  }

  private setup() {
    this.buttonsEl = document.getElementById(this.settings.buttonsContainerId)
  }

  public defineNode(name: string) {
    const newNode = new Node(name);
    this.nodes.push(newNode);
    return newNode; // Beginning of chainable node
  }

  public run(name) {
    var currentNode = this.nodes.find(x => x.name === name);
    console.log(currentNode);

    // clear buttons

    this.buttonsEl.innerHTML = '';

    // create buttons

    if (currentNode.buttons.length > 0) {
      currentNode.buttons.forEach((button) => {
        var newButton = document.createElement('button');
        var buttonText = document.createTextNode(button.text);
        newButton.appendChild(buttonText);
        newButton.onclick = (e) => {
          this.run(button.onClick);
        };
        this.buttonsEl.appendChild(newButton);
      });
    }

    if (currentNode.url != null) {
      var player1 = document.getElementById('IV-player1') as HTMLVideoElement;
      var player2 = document.getElementById('IV-player2') as HTMLVideoElement;

      if (this.currentPlayer.check != 'player1') {
        this.currentPlayer.check = 'player1';
        this.currentPlayer.player = player1;

        this.currentPlayer.player.setAttribute(
          'src',
          this.settings.baseVideoUrl + currentNode.url
        );
        this.currentPlayer.player.load();

        this.currentPlayer.player.onloadeddata = (e) => {
          this.currentPlayer.player.play();
          player1.style.display = 'block';
          player2.style.display = 'none';
          this.currentPlayer.player.onended = (e) => {
            if (currentNode.next != null) this.run(currentNode.next);
            else this.currentPlayer.player.play();
          };
        };
      } else {
        this.currentPlayer.check = 'player2';
        this.currentPlayer.player = player2;

        this.currentPlayer.player.setAttribute(
          'src',
          this.settings.baseVideoUrl + currentNode.url
        );
        this.currentPlayer.player.load();

        this.currentPlayer.player.onloadeddata = (e) => {
          this.currentPlayer.player.play();
          player2.style.display = 'block';
          player1.style.display = 'none';
          this.currentPlayer.player.onended = (e) => {
            if (currentNode.next != null) this.run(currentNode.next);
            else this.currentPlayer.player.play();
          };
        };
      }
    }
  }
}
