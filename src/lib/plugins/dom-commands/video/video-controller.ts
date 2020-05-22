import videoCanvas from './canvas-renderer';
import { isNullOrUndefined } from 'util';
import { IV } from '../../../iv';

function createVideoPlayer(id: string) {
  const player = document.createElement('video');
  player.id = id;
  // player.style.visibility = 'hidden';
  player.setAttribute('playsinline', 'true');
  player.setAttribute('disableRemotePlayback', 'true');
  player.style.display = 'block'; // fixes the android black frame issue.  Aparently it does not like 'inline'
  player.style.visibility = 'hidden';
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
  container.id = 'IV-video-container';
  return container;
}

class VideoController {
  private baseElement: HTMLElement = document.body;
  public convas: HTMLElement;

  private players = {
    current: createVideoPlayer('IV-video-player-1'),
    standby: createVideoPlayer('IV-video-player-2'),
  };

  public playVideo(url: string, loop?: boolean): Promise<any> {
    if (url.includes('||')) {
      const array = url.split('||');
      // tslint:disable-next-line:prefer-conditional-expression
      url = array[0];
      console.log(url);
    }
    const standby = this.getStandbyPlayer();
    const current = this.getCurrentPlayer();
    current.loop = false;

    if (loop) {
      current.loop = true;
    }

    standby.onloadeddata = () => {
      current.src = url;
      standby.onloadeddata = () => {}; // tslint:disable-line
    };
    current.oncanplay = () => {
      current.play();
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

  public async createPlayers(baseElement?: HTMLElement): Promise<HTMLElement> {
    this.baseElement = baseElement;

    let playerContainer = document.getElementById('IV-video-container');
    if (isNullOrUndefined(playerContainer)) {
      playerContainer = createVideoContainer();
      this.attachPlayers(playerContainer);
    }

    return playerContainer;
  }

  private attachPlayers(playerContainer: HTMLElement) {
    playerContainer.appendChild(this.players.standby);
    playerContainer.appendChild(this.players.current);

    this.convas = videoCanvas(this.players.current); // returns the <canvas> element
    this.convas.id = 'IV-convas-renderer';
    this.convas.style.zIndex = '5';
    this.convas.style.position = 'absolute';
    this.convas.style.pointerEvents = 'none';
    this.convas.style.top = '0';
    this.convas.style.left = '0';
    playerContainer.appendChild(this.convas);
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
