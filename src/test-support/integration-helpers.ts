import { getAudioPlayerNamed, getCurrentVideo, getNextVideo } from './dom-commands'
import { simulateEventOnElement } from './simulateEvent'

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