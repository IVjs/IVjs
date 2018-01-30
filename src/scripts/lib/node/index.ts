export class Node {
  private addingToCondition = false;

  public conditions: any[] = [];
  public buttons: any[] = [];
  public url: null;
  public next: null

  public condition: any = {
    url: null,
    next: null,
    buttons: []
  }

  constructor( public name: string ) { }

  public playVideo(url) {
    if(this.addingToCondition) {
      this.condition.url = url;
    } else {
      this.url = url;
    }
    return this;
  }

  public nextNode(node) {
    if(this.addingToCondition) {
      this.condition.next = node;
    } else {
      this.next = node;
    }
    return this;
  }

  public addButton(buttonObj) {
    if(this.addingToCondition) {
      this.condition.buttons.push(buttonObj);
    } else {
      this.buttons.push(buttonObj);
    }
    return this;
  }

  if(conditionText) {
    // if condition needs to be added
    if(this.addingToCondition) {
      this.conditions.push(this.condition);
    } else {
      this.addingToCondition = true;
    }

    // reset condition
    this.condition = {};
    this.condition.buttons = new Array();
    this.condition.type = 'if';
    this.condition.statement = conditionText;
    return this;
  }

  else() {
    this.conditions.push(this.condition);
    this.condition = new Object();
    this.condition.type = 'else';
    return this;
  }

  endIf() {
    this.conditions.push(this.condition);
    this.addingToCondition = false;
    return this;
  }
}
