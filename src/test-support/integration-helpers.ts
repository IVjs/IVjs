import { simulateEventOnElement } from './simulateEvent'
import { getNextVideo, getCurrentVideo, getAudioPlayerNamed } from './dom-commands'

export function simulateLoadedNextVideo() {
  simulateEventOnElement('loadeddata', getNextVideo());
}

export function simulateEndedCurrentVideo() {
  simulateEventOnElement('ended', getCurrentVideo());
}

export function simulateEndAndLoadNextVideo() {
  simulateEndedCurrentVideo();
  simulateLoadedNextVideo();
}

export function simulatePlayThroughNextVideo() {
  simulateLoadedNextVideo();
  simulateEndedCurrentVideo();
}

export function simulatePlayThroughAudio(playerName: string) {
  simulateEventOnElement('ended', getAudioPlayerNamed(playerName))
}