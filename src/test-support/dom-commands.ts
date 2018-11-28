import { defaults } from '../lib/config';

export function qsaToArray(qsa: NodeListOf<HTMLElement>): HTMLElement[] {
  let index = 0;
  const outArray: HTMLElement[] = [];
  for (index = 0; index < qsa.length; index++) {
    outArray.push(qsa[index]);
  }
  return outArray;
}

export function findAll(selector: string) {
  return qsaToArray(document.querySelectorAll(selector));
}

export function find(selector: string): HTMLElement {
  return document.querySelector(selector);
}

export function getAllVideos(): HTMLVideoElement[] {
  return findAll(`#${defaults.baseElementId} video`) as HTMLVideoElement[];
}

export function getCurrentVideo() {
  return find('#IV-video-player-1') as HTMLVideoElement;
}

export function getNextVideo() {
  return find('#IV-video-player-2') as HTMLVideoElement;
}

export function getAllAudioPlayers(): HTMLAudioElement[] {
  return findAll(`#${defaults.baseElementId} audio`) as HTMLAudioElement[];
}

export function getAudioPlayerNamed(name: string) {
  return find(`#IV-audio-player-${name.toLowerCase()}`) as HTMLAudioElement;
}

export function getBgAudioPlayer() {
  return getAudioPlayerNamed('BG');
}

export function getSfxAudioPlayer() {
  return getAudioPlayerNamed('SFX');
}
