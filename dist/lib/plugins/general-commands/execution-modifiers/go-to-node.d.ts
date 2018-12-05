export declare const goToNodeFactory: CommandEngine.TargetFunctionFactory;
export interface AddGoToNode {
  goToNode(nodeName: string): any;
}
export declare const goToNode: AddGoToNode['goToNode'];
