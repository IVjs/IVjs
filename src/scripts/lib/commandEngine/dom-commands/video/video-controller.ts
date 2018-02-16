function createVideoPlayer(id: string) {
  const player = document.createElement('video');
  player.id = id;
  player.setAttribute('playsinline', 'true');
  const style = 'inline';
  player.style.display = style;
  return player;
}

class VideoController {
  private baseElement: HTMLElement = document.body;
  private isFirstPlay = true;

  private players = {
    current: createVideoPlayer('IV-video-player-1'),
    standby: createVideoPlayer('IV-video-player-2'),
  }

  public playVideo(url: string): Promise<any> {
    const standby = this.getStandbyPlayer();
    const current = this.getCurrentPlayer();
    standby.onloadeddata = () => {
      current.src = url;
      current.play();
    }
    standby.src = url;
    standby.load() // essential for mobile safari
    return this.whenPlayerEnds(current);
  }

  private whenPlayerEnds(player: HTMLVideoElement): Promise<any> {
    return new Promise((resolve) => {
      const onEnded = () => {
        resolve('video ended');
        player.removeEventListener('ended', onEnded);
      }
      player.addEventListener('ended', onEnded);
    })
  }

  public createPlayers(baseElement?: HTMLElement): void {
    this.baseElement = baseElement;
    this.attachPlayers(); // multiple calls are fine... does not duplicate
  }

  private attachPlayers() {
    this.baseElement.appendChild(this.players.standby)
    this.baseElement.appendChild(this.players.current)
  }

  public getCurrentPlayer() {
    return this.players.current;
  }

  public getStandbyPlayer() {
    return this.players.standby;
  }
}

export const videoController = new VideoController();