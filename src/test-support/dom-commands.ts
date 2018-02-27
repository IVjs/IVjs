import { defaults } from '../scripts/lib/config'

export function qsaToArray(qsa: any): HTMLElement[] {
  let index = 0;
  const outArray: HTMLElement[] = []
  for (index = 0; index < qsa.length; index++) {
    outArray.push(qsa[index])
  }
  return outArray;
}

export function getAllVideos(): HTMLVideoElement[] {
  return qsaToArray(document.querySelectorAll(`#${defaults.baseElementId} video`)) as HTMLVideoElement[];
}

export function getCurrentVideo() {
  return document.getElementById('IV-video-player-1') as HTMLVideoElement;
}

export function getNextVideo() {
  return document.getElementById('IV-video-player-2') as HTMLVideoElement;
}

export function getAllAudioPlayers(): HTMLAudioElement[] {
  return qsaToArray(document.querySelectorAll(`#${defaults.baseElementId} audio`)) as HTMLAudioElement[];
}

export function getAudioPlayerNamed(name: string) {
  return document.getElementById(`IV-audio-player-${name.toLowerCase()}`) as HTMLAudioElement;
}

export function getBgAudioPlayer() {
  return getAudioPlayerNamed('BG');
}

export function getSfxAudioPlayer() {
  return getAudioPlayerNamed('SFX');
}
