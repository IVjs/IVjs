const IV = {
  addingToCondition: false,
  firstNode: '',
  nodes: [],
  currentPlayer: { check: '', player: '' },

  defineNode: function(node) {
    this.node = new Object();
    this.node.conditions = new Array();
    this.node.buttons = new Array();
    this.node.name = node;
    return this;
  },
  if: function(conditionText) {
    // if condition needs to be added
    if (this.addingToCondition) this.node.conditions.push(this.condition);

    this.addingToCondition = true;
    // reset condition
    this.condition = new Object();
    this.condition.buttons = new Array();
    this.condition.type = 'if';
    this.condition.statement = conditionText;
    return this;
  },
  else: function() {
    this.node.conditions.push(this.condition);
    this.condition = new Object();
    this.condition.type = 'else';
    return this;
  },
  endIf: function() {
    this.node.conditions.push(this.condition);
    this.addingToCondition = false;
    return this;
  },
  playVideo: function(url) {
    if (this.addingToCondition) this.condition.url = url;
    else {
      this.node.url = url;
    }
    return this;
  },

  nextNode: function(node) {
    if (this.addingToCondition) this.condition.next = node;
    else {
      this.node.next = node;
    }
    return this;
  },

  addButton: function(buttonObj) {
    if (this.addingToCondition) this.condition.buttons.push(buttonObj);
    else {
      this.node.buttons.push(buttonObj);
    }
    return this;
  },

  addNode: function() {
    this.nodes.push(this.node);
    return this;
  },

  //run the execution
  run: function(Node) {
    var currentNode = IV.nodes.find(x => x.name === Node);
    console.log(currentNode);

    // clear buttons

    document.getElementById('IV-buttons').innerHTML = '';

    // create buttons

    if (currentNode.buttons.length > 0) {
      currentNode.buttons.forEach(function(button) {
        var newButton = document.createElement('button');
        var buttonText = document.createTextNode(button.text);
        newButton.appendChild(buttonText);
        newButton.onclick = function(e) {
          IV.run(button.onClick);
        };
        document.getElementById('IV-buttons').appendChild(newButton);
      });
    }

    if (currentNode.url != null) {
      var player1 = document.getElementById('IV-player1');
      var player2 = document.getElementById('IV-player2');

      if (this.currentPlayer.check != 'player1') {
        this.currentPlayer.check = 'player1';
        this.currentPlayer.player = player1;

        this.currentPlayer.player.setAttribute(
          'src',
          IV.settings.baseVideoUrl + currentNode.url
        );
        this.currentPlayer.player.load();

        this.currentPlayer.player.onloadeddata = function(e) {
          IV.currentPlayer.player.play();
          player1.style.display = 'block';
          player2.style.display = 'none';
          IV.currentPlayer.player.onended = function(e) {
            if (currentNode.next != null) IV.run(currentNode.next);
            else IV.currentPlayer.player.play();
          };
        };
      } else {
        this.currentPlayer.check = 'player2';
        this.currentPlayer.player = player2;

        this.currentPlayer.player.setAttribute(
          'src',
          IV.settings.baseVideoUrl + currentNode.url
        );
        this.currentPlayer.player.load();

        this.currentPlayer.player.onloadeddata = function(e) {
          IV.currentPlayer.player.play();
          player2.style.display = 'block';
          player1.style.display = 'none';
          IV.currentPlayer.player.onended = function(e) {
            if (currentNode.next != null) IV.run(currentNode.next);
            else IV.currentPlayer.player.play();
          };
        };
      }
    }
  },
};

export { IV };
