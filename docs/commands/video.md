# Video Playback Commands

Some of the IVjs commands will behave differently depending on which parameters are passed in between the ().

## .playVideo()

### Syntax
```javascript
.playVideo(videoUrlOrOptions[, ...videoUrlOrOptions])
```

* __`videoUrlOrOptions`__  
Either a string pointing to a video file or a video options object (see directly below).

### Video Options Object

```javascript

{
    url: 'url/to/video.mp4',

    // Will fire at the end of the video
    goTo: 'someNodeName',
    runSync: 'someNodeName',
    runAsync: 'someNodeName',
    js: someExternalJsFunction,

    // Will fire based on timestamp time
    timestamps: [
        {
            time: 12.5,  // Seconds into the video
            goTo: 'someNodeName',
            runSync: 'someNodeName',  // Will pause the video while running
            runAsync: 'someNodeName',
            js: someExternalJsFunction,
        }
    ]
},
```

### Video Options Properties

* __`url`__
    * (string, sometimes optional) The path to the video file.
    * [see "Video Options as a subsequent modifier"](#video-options-as-a-subsequent-modifier) to understand when this property is optional.
* __`goTo`__
    * (string, optional) The name of the node you wish to jump to.
    * Fires at the end of the video.
    * Just like the `.goto()` method on a node, this ends the current node's execution.
* __`runSync`__
    * (string, optional) The name of the node you wish to run.
    * Fires at the end of the video.
    * Pauses execution in this node and runs the given node through to completion. After that, the current node continues, either with the next video (if there are more in the command), or with the next command.
* __`runAsync`__
    * (string, optional) The name of the node you wish to run.
    * Fires at the end of the video.
    * Continues execution in this node and runs the given node through to completion at the same time. Nothing happens here when the given node ends.
* __`js`__
    * (function, optional) callback function
    * Any regular Javascript function.
    * Function will receive the following:
        * __TBD__
* __`timestamps`__
    * (array of timestamp objects) Objects containing the following:
    * __`time`__
        * (number, required) Number of seconds from the start of the video at which the event will take place
    * __`goTo`__
        * Same as above, but fires at the given timetamp.
    * __`runSync`__
        * Similar to above, but fires at the given timetamp.
        * Pauses the video and resumes playback when the given node is done.
    * __`runAsync`__
        * Same as above, but fires at the given timetamp.
    * __`js`__
        * Same as above, but fires at the given timetamp.


## Usage

```javascript
// play a single file

myIV.node('first node')
    .playVideo('filename.mp4')


// play multiple files, sequentially

myIV.node('first node')
    .playVideo('filename1.mp4', 'filename2.mp4', 'filename3.mp4')


// play a file then jump to another node
// notice the { } object syntax in this case

myIV.node('first node')
    .playVideo({url:'filename.mp4', goTo:'node name'})


// mix strings and objects (all will play sequentially)
// after the last video, will jump to another node

myIV.node('first node')
    .playVideo(
        'filename1.mp4',
        'filename2.mp4',
        {url:'filename.mp4', goTo:'node name'}
    )


// you can likewise use variable templating

myIV.node('first node')
    .playVideo(
        '{{myVariableOne}}.mp4',
        'and.mp4',
        {url:'{{myVariableTwo}}.mp4', goTo:'node name'}
    )
```

<br>

!> Important Considerations

`.playVideo()` should be thought of as a non-blocking method, meaning that as soon as the video is *told to play*, subsequent methods will run without waiting for playback to complete. Even with multiple videos in the method, once the first video is told to play, execution of the methods after `playVideo()` will commence.

Thus, if we have the following two nodes:

```javascript

myIV.node('first node')
    .playVideo('filename1.mp4')  // <-- this will never play
    .goto('second node')


myIV.node('second node')
    .playVideo('filename2.mp4')

```

`.goto()` method will be immediately executed after the `.playVideo()` method, thus the first video will not get a chance to be played.

Thus, it's recommended to use `goTo` event inside the `.playVideo()` method in order to properly progress once the required video is done playing:


```javascript

myIV.node('first node')
    .playVideo({url: 'filename1.mp4', goTo: 'second node')


myIV.node('second node')
    .playVideo('filename2.mp4')

```

### Firing events during playback

Using timestamps, the following code would interrupt playback of a video at ten seconds and jump to another node:

```javascript

myIV.node('first node')
    .playVideo({
        url: 'filename1.mp4',
        timestamps: [{
            time: 10,
            goto: 'second node'
        }]
    })


myIV.node('second node')
    .playVideo('filename2.mp4') // will now play the second video

```

Alternatively, a `.wait()` command can be used in conjuntion with `.goto()` (on the node, not inside the video options) in order to get a similar result.

```javascript

myIV.node('first node')
    .playVideo('filename1.mp4')
    .wait(10)
    .goto('second node')


myIV.node('second node')
    .playVideo('filename2.mp4') // will now play the second video

```

The difference here in behavior is small, and the second way of coding it seems clearer. However, if the video is paused for any reason, the code in the second example will still jump to the "second node", while the first example will wait until video playback is resumed and reaches the ten second mark before jumping.

### Video Options as a subsequent modifier

If you use a `videoOptionsObject` that does not contain a url, then any settings inside that object will be applied to the previous `videoUrl` or `videoOptionsObject`.

Meaning that the following two commands produce an identical result:

```javascript
.playVideo(
    'path/to/video1.mp4',
    {url: 'path/to/video2.mp4', runAsync: 'displayImagesNode'},
    'path/to/video3.mp4',
    {url: 'path/to/video4.mp4', goTo: 'endingNode'}
)

.playVideo(
    'path/to/video1.mp4',
    'path/to/video2.mp4',
    {runAsync: 'displayImagesNode'},
    'path/to/video3.mp4',
    'path/to/video4.mp4',
    {goTo: 'endingNode'}
)
```

Either method above would play `video1` followed by `video2`. After video 2 is over, we would run `displayImagesNode` while `video3` plays. After `video3` ends, `video4` would play through and we would then jump to the `endingNode`.

The second one, though, is easier to read and reason about.

Merging options works as well:

```javascript
.playVideo(
    'path/to/video1.mp4',
    'path/to/video2.mp4',
    {runAsync: 'displayImagesNode'},
    {runSync: 'askForInput'},
    {goTo: 'endingNode'}
)

.playVideo(
    'path/to/video1.mp4',
    'path/to/video2.mp4',
    {runAsync: 'displayImagesNode', runSync: 'askForInput', goTo: 'endingNode'}
)
```

The two commands above are identical.

------------

The order of operations when multiple video options are merged is always

1. `runAsync`
2. `runSync`
3. `goTo`

Therefore, the following two options objects are identical:

```
{runAsync: 'displayImagesNode', goTo: 'endingNode'}

{goTo: 'endingNode', runAsync: 'displayImagesNode'}
```

!> Note that we currently do not support running multiple async commands or multiple sync commands on a single video's completion, so the following would break:

```javascript

.playVideo(
    'path/to/video1.mp4',
    'path/to/video2.mp4',
    {runSync: 'firstSyncNode'},
    {runSync: 'secondSyncNode'}, // This line will cause problems.
    {goTo: 'endingNode'}
)

```
