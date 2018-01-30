import { Node } from './node';

export class IV {
  public settings = {
    baseVideoUrl: '',
  }

  private currentPlayer = {
    check: '',
    player: null as HTMLVideoElement,
  };

  private nodes: Node[] = []

  public defineNode(name: string) {
    const newNode = new Node(name);
    this.nodes.push(newNode);
    return newNode; // Beginning of chainable node
  }

  public run(Node) {
    var currentNode = this.nodes.find(x => x.name === Node);
    console.log(currentNode);

    // clear buttons

    document.getElementById('IV-buttons').innerHTML = '';

    // create buttons

    if (currentNode.buttons.length > 0) {
      currentNode.buttons.forEach((button) => {
        var newButton = document.createElement('button');
        var buttonText = document.createTextNode(button.text);
        newButton.appendChild(buttonText);
        newButton.onclick = (e) => {
          this.run(button.onClick);
        };
        document.getElementById('IV-buttons').appendChild(newButton);
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
