export class Node {
  private addingToCondition = false;

  public node = {
    conditions: [],
    buttons: [],
    name: '',
    url: null,
    next: null,
  }

  public condition = {
    url: null,
    next: null,
  }

  constructor(
    private name: string
  ) {
    this.node.name = name;
  }

  public playVideo(url) {
    if(this.addingToCondition) {
      this.condition.url = url;
    } else {
      this.node.url = url;
    }
    return this;
  }

  public nextNode(node) {
    if(this.addingToCondition) {
      this.condition.next = node;
    } else {
      this.node.next = node;
    }
    return this;
  }
}
