const HIDE_STYLE = 'none'
const SHOW_STYLE = 'inline';

function createVideoPlayer(id: string, hidden?: boolean) {
  const player = document.createElement('video');
  player.id = id;
  player.setAttribute('playsinline', 'playsinline');
  player.setAttribute('webkit-playsinline', 'webkit-playsinline');
  const style = hidden ? HIDE_STYLE : SHOW_STYLE;
  player.style.display = style;
  return player;
}

class VideoController {
  private baseElement: HTMLElement = document.body;

  private players = {
    current: createVideoPlayer('IV-video-player-1'),
    standby: createVideoPlayer('IV-video-player-2', true),
  }

  public playVideo(url: string): Promise<any> {
    const nextPlayer = this.players.standby
    nextPlayer.onloadeddata = () => {
      this.switchPlayers();
      this.pauseStandby();
      this.playCurrent();
    }
    nextPlayer.src = url;
    return this.whenPlayerEnds(nextPlayer);
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

  private playCurrent() {
    this.getCurrentPlayer().play();
  }

  private pauseStandby() {
    this.getStandbyPlayer().pause();
  }

  private switchPlayers() {
    const newCurrent = this.players.standby;
    const newStandby = this.players.current;

    newCurrent.style.display = SHOW_STYLE;
    newStandby.style.display = HIDE_STYLE;

    this.players.standby = newStandby;
    this.players.current = newCurrent;
  }

  public createPlayers(baseElement?: HTMLElement): void {
    this.baseElement = baseElement;
    this.attachPlayers(); // multiple calls are fine... does not duplicate
  }

  private attachPlayers() {
    this.baseElement.appendChild(this.players.current)
    this.baseElement.appendChild(this.players.standby)
  }

  public getCurrentPlayer() {
    return this.players.current;
  }

  public getStandbyPlayer() {
    return this.players.standby;
  }
}

export const videoController = new VideoController();