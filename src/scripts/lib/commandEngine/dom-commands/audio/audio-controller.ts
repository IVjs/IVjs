function createAudioPlayer(id: string): HTMLAudioElement {
  const player = document.createElement('audio');
  player.id = id;
  return player;
}

class AudioController {
  private baseElement: HTMLElement = document.body;

  private players = {
    bg: createAudioPlayer('IV-audio-player-bg'),
    sfx: createAudioPlayer('IV-audio-player-sfx'),
  }

  public play(playerName: ICommand.AudioSource['target'], url?: string): Promise<any> {
    const player = this.getPlayerNamed(playerName);
    if (url && player.src !== url) {
      player.src = url;
    }
    player.play();
    return this.whenPlayerEnds(player);
  }

  public pause(playerName): Promise<any> {
    const player = this.getPlayerNamed(playerName);
    player.pause();
    return Promise.resolve('audio paused');
  }

  public load(playerName, url): Promise<any> {
    const player = this.getPlayerNamed(playerName);
    if (url && player.src !== url) {
      player.src = url;
    }
    return this.whenPlayerLoads(player);
  }

  private whenPlayerEnds(player: HTMLAudioElement): Promise<any> {
    return new Promise((resolve) => {
      const onEnded = () => {
        resolve('audio ended');
        player.removeEventListener('ended', onEnded);
      }
      player.addEventListener('ended', onEnded);
    })
  }

  private whenPlayerLoads(player: HTMLAudioElement): Promise<any> {
    return new Promise((resolve) => {
      const onEnded = () => {
        resolve('audio loaded');
        player.removeEventListener('loadeddata', onEnded);
      }
      player.addEventListener('loadeddata', onEnded);
    })
  }

  public createPlayers(baseElement?: HTMLElement): void {
    this.baseElement = baseElement;
    this.attachPlayers(); // multiple calls are fine... does not duplicate
  }

  private attachPlayers() {
    this.baseElement.appendChild(this.players.bg)
    this.baseElement.appendChild(this.players.sfx)
  }

  public getBgPlayer() {
    return this.players.bg;
  }

  public getSfxPlayer() {
    return this.players.sfx;
  }

  public getPlayerNamed<T extends ICommand.AudioSource['target']>(name: T): HTMLAudioElement {
    return this.players[name.toLowerCase()]
  }
}

export const audioController = new AudioController();