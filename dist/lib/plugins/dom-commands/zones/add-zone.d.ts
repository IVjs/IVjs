import { CommandHandlerInitializer } from '../../../plugin-types';
export interface AddZoneSettings {
  id: string;
  width: number;
  height: number;
  top: number;
  left: number;
  visible?: boolean;
  onClick?: OnClickOptions;
}
export declare type OnClickOptions = Partial<{
  js: () => void;
  setVariable: string;
  goToNode: string;
}>;
export declare const addZoneFactory: CommandHandlerInitializer;
export interface AddZone {
  addZone(settings: AddZoneSettings): any;
}
export declare const addZone: AddZone['addZone'];
