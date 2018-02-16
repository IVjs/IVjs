export function qsaToArray(qsa: any): HTMLElement[] {
  let index = 0;
  const outArray: HTMLElement[] = []
  for (index = 0; index < qsa.length; index++) {
    outArray.push(qsa[index])
  }
  return outArray;
}

export function getAllVideos(): HTMLVideoElement[] {
  return qsaToArray(document.querySelectorAll('#IV-view video')) as HTMLVideoElement[];
}

export function getCurrentVideo() {
  return document.getElementById('IV-video-player-1') as HTMLVideoElement;
}

export function getNextVideo() {
  return document.getElementById('IV-video-player-2') as HTMLVideoElement;
}
