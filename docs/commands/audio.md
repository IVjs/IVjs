# Audio Playback Commands

Currently, IVjs supports playback of one background audio track in addition to the video.

The background audio track url is defined in the IV settings:

```javascript

myIV.settings = {
    bgAudioUrl: 'optional/url/to/audio.mp3',
    bgAudioLoop: false // whether or not to loop playback. defaults to true
}

```

<br/>
# .bgAudio()

This command will play, pause or load a new URL audio, depending on the parameters passed in.

For example:

```javascript

// play the background audio set in the settings

  .bgAudio('play')

// pause the currently playing audio

  .bgAudio('pause')

// loops the current audio (won't start it playing again if it has stopped)

  .bgAudio('loop')

// load the new audio

  .bgAudio({load: 'url/to/audio.mp3'})

// load the new audio and begin playing it

  .bgAudio({play: 'url/to/audio.mp3'})

// loops the current audio (won't start it playing again if it has stopped).
// False to unloop.
// loop can be added as a property to either the play or load object in the
// two commands above, too

  .bgAudio({loop: true})

```


<br/>
# .setVolume()

This command control the volume of the target audio source.  The volume is a fractional number is from 0 to 1.

For example:

```javascript

// Set the background volume to 100% immediately

    .setVolume({target:'bg', volume: 1})

// mute the background track immediately

    .setVolume({target:'bg', volume: 0})   

// fade the volume to 50% over 3 seconds

    .setVolume({target:'bg', volume: 0, time: 3})          

```
