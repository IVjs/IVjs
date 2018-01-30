import { Node } from './node';

export class IV {
  public static defineNode(name: string) {
    const newNode = new Node(name);
    IV.state.nodes.push(newNode);
    return newNode; // Beginning of chainable node
  }

  private static state = {
    nodes: [] as Node[],
    // etc
  };
}
