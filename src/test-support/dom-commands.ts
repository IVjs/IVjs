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

export function getVisibleVideos(): HTMLVideoElement[] {
  return getAllVideos().filter(v => v.style.display !== 'none');
}

export function getHiddenVideos(): HTMLVideoElement[] {
  return getAllVideos().filter(v => v.style.display === 'none');
}

export function getCurrentVideo() {
  return getVisibleVideos()[0];
}

export function getNextVideo() {
  return getHiddenVideos()[0];
}
