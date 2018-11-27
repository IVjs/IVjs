export interface ButtonOptions {
    id: string;
    text: string;
    goToNode?: string;
    runAsync?: string;
    remove?: boolean;
    js?: () => any;
}
export declare class ButtonCommandsBuilder {
    addButton(input: ButtonOptions): ICommand.AddButton;
    removeAllButtons(): ICommand.RemoveAllButtons;
    private createCommands;
}
