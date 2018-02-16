const HIDE_STYLE = 'inline'
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
  private isFirstPlay = true;

  private players = {
    current: createVideoPlayer('IV-video-player-1'),
    standby: createVideoPlayer('IV-video-player-2', true),
  }

  constructor() {
    this.players.current.style.zIndex = '1'
  }

  public playVideo(url: string): Promise<any> {
    const nextPlayer = this.players.standby
    nextPlayer.onloadeddata = () => {
      this.switchPlayers();
      this.playCurrent();
    }
    nextPlayer.src = url;
    nextPlayer.load()
    return this.whenPlayerEnds(this.getCurrentPlayer());
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
    const current = this.players.current;
    const standby = this.players.standby;

    current.src = standby.src;
    current.load();
    // standby.src = null;

    // this.players.standby = newStandby;
    // this.players.current = newCurrent;
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