function createVideoPlayer(id: string) {
  const player = document.createElement('video');
  player.id = id;
  player.setAttribute('playsinline', 'true');
  player.setAttribute('disableRemotePlayback', 'true');
  player.style.display = 'block'; // fixes the android black frame issue.  Aparently it does not like 'inline'
  function doSizing() {
    player.width = player.clientWidth;
    player.height = player.clientHeight;
    player.removeEventListener('loadeddata', doSizing);
  }
  player.addEventListener('loadeddata', doSizing);
  return player;
}

function createVideoContainer(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'IV-video-container';
  return container;
}

class VideoController {
  private baseElement: HTMLElement = document.body;

  private players = {
    current: createVideoPlayer('IV-video-player-1'),
    standby: createVideoPlayer('IV-video-player-2'),
  };

  public playVideo(url: string): Promise<any> {
    const standby = this.getStandbyPlayer();
    const current = this.getCurrentPlayer();
    standby.onloadeddata = () => {
      current.src = url;
      current.play();
      standby.onloadeddata = () => {}; // tslint:disable-line
    };
    standby.src = url;
    standby.load(); // essential for mobile safari
    return this.whenPlayerEnds(current);
  }

  private whenPlayerEnds(player: HTMLVideoElement): Promise<any> {
    return new Promise(resolve => {
      const onEnded = () => {
        resolve('video ended');
        player.removeEventListener('ended', onEnded);
      };
      player.addEventListener('ended', onEnded);
    });
  }

  public createPlayers(baseElement?: HTMLElement): void {
    this.baseElement = baseElement;
    const playerContainer = createVideoContainer();
    this.attachPlayers(playerContainer);
  }

  private attachPlayers(playerContainer: HTMLElement) {
    playerContainer.appendChild(this.players.standby);
    playerContainer.appendChild(this.players.current);
    this.baseElement.appendChild(playerContainer);
  }

  public getCurrentPlayer() {
    return this.players.current;
  }

  public getStandbyPlayer() {
    return this.players.standby;
  }
}

export const videoController = new VideoController();
