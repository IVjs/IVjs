declare class AudioController {
    _fadeInterval: number;
    private baseElement;
    private players;
    play(playerName: ICommand.AudioSource['target'], url?: string): Promise<any>;
    pause(playerName: ICommand.AudioSource['target']): Promise<any>;
    load(playerName: ICommand.AudioSource['target'], url: string): Promise<any>;
    loop(playerName: ICommand.AudioSource['target'], loop: boolean): void;
    volume(playerName: any, volume: any, time?: any): Promise<any>;
    private fadeOverTime;
    private whenPlayerEnds;
    private whenPlayerLoads;
    createPlayers(baseElement?: HTMLElement): void;
    private attachPlayers;
    getBgPlayer(): HTMLAudioElement;
    getSfxPlayer(): HTMLAudioElement;
    getPlayerNamed<T extends ICommand.AudioSource['target']>(name: T): HTMLAudioElement;
}
export declare const audioController: AudioController;
export {};
