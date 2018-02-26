# Audio Playback Commands

Currently, IVjs supports playback of one background audio track in addition to the video.

The background audio track url is defined in the IV settings:

```javascript

myIV.settings = {
    bgAudioUrl: 'optional url of your background audio'
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

// load the new audio and begin playing it

    .bgAudio({load: 'url to .mp3 audio'})        

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
