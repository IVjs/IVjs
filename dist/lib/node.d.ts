import { Omit } from '../types';
interface SwitchBase {
    var: string;
}
interface Is extends SwitchBase {
    is: string | number | boolean;
}
interface IsGreaterThan extends SwitchBase {
    isGreaterThan: number;
}
interface IsLessThan extends SwitchBase {
    isLessThan: number;
}
interface IsBetween extends SwitchBase {
    isBetween: number[];
}
interface IsGreaterThanOrEqualTo extends SwitchBase {
    isGreaterThanOrEqualTo: number;
}
interface IsLessThanOrEqualTo extends SwitchBase {
    isLessThanOrEqualTo: number;
}
declare type ifOptions = Partial<Is & IsGreaterThan & IsLessThan & IsGreaterThanOrEqualTo & IsLessThanOrEqualTo & IsBetween>;
export interface NodeExtensions {
}
declare type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never;
declare type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;
declare type NodeExtended = {
    [P in keyof NodeExtensions]: ReplaceReturnType<NodeExtensions[P], IvNode>;
};
export declare type IvNode = Omit<Node, 'getCommands'> & NodeExtended;
export declare class Node implements BaseNode {
    name: string;
    private commands;
    private switchDo;
    private pushType;
    constructor(name: string);
    getCommands(): ICommand.AnyCommand[];
    private pusher;
    pushCommands(...commands: ICommand.AnyCommand[]): void;
    if(optionsObj: ifOptions): IvNode;
    else(): IvNode;
    endIf(): IvNode;
}
export {};
