import { IvNode } from './iv-node'

export class IV {
  public static defineNode(name: string) {
    const newNode = new IvNode(name);
    IV.state.nodes.push(newNode);
    return newNode;  // Beginning of chainable node
  }
  
  private static state = {
    nodes: [] as IvNode[],
    // etc
  }
}