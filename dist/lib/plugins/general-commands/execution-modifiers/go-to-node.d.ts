import { CommandHandlerInitializer } from '../../../plugin-types';
export declare const goToNodeFactory: CommandHandlerInitializer;
export interface AddGoToNode {
  goToNode(nodeName: string): any;
}
export declare const goToNode: AddGoToNode['goToNode'];
