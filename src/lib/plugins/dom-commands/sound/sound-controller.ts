import { isNullOrUndefined } from 'util';
import { Howl, Howler } from 'howler';

class SoundController {
  public players = {
    current: Howl,
  };

  public playSound(url: string): Promise<any> {
    const current = new Howl({ src: [url] });
    this.players.current = current;
    if (url.includes('||')) {
      const array = url.split('||');
      // tslint:disable-next-line:prefer-conditional-expression
      url = array[0];
      console.log(url);
    }
    current.src = url;
    current.play();
    return this.whenPlayerEnds(current);
  }

  private whenPlayerEnds(player: any): Promise<any> {
    return new Promise(resolve => {
      const onEnded = () => {
        resolve('sound ended');
        player.on('end', onEnded);
      };
      player.on('end', onEnded);
    });
  }
}

export const soundController = new SoundController();
