# IV Settings and Variable Initialization

IVjs allow you to set initial settings and variables in order to faciliate your subsequent workflow.

## Available Settings

```javascript

myIV.settings = {
    baseVideoUrl: 'base url for your video files',
    bgAudioUrl: 'optional url of your background audio'
}

```


## Setting Up Initial Variables

You can initialize certain variables for use in your IV experience.  The currently accepted types are number, string, or array of numbers or strings.

For example:

```javascript

myIV.vzriables = {
    userName: 'Jack',
    count: 0,
    videoArray: ['video1.mp4', 'video2.mp4', 'video3.mp4']
}

```