declare class VideoController {
    private baseElement;
    private playerContainer;
    private players;
    playVideo(url: string): Promise<any>;
    private whenPlayerEnds;
    createPlayers(baseElement?: HTMLElement): void;
    private attachPlayers;
    getCurrentPlayer(): HTMLVideoElement;
    getStandbyPlayer(): HTMLVideoElement;
}
export declare const videoController: VideoController;
export {};
