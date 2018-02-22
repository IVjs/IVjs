# Video Playback Commands

Some of the IVjs commands will behave differently depending on which parameters are passed in between the ().

<br/>
# .playVideo()

It's a multi-functional command that can take a single string, an array of strings, or an array of parameter objects or strings and play these sequentially.

For example:

```javascript

// you can use .playVideo() command to play a single file

myIV.node('first node')
    .playVideo('filename.mp4')

 // OR play multiple files

myIV.node('first node')
    .playVideo(['filename1.mp4', 'filename2.mp4', 'filename3.mp4'])

// OR play a file with onComplete option attached
// notice the { } object syntax in this case

myIV.node('first node')
    .playVideo({url:'filename.mp4', onComplete:'node name'})

// OR include the parameter object
// as the last item in the array list

myIV.node('first node')
    .playVideo(['filename1.mp4', 'filename2.mp4', {url:'filename.mp4', onComplete:'node name'}])

// you can likewise use variable templating

myIV.node('first node')
    .playVideo(['{{Variable1}}.mp4', 'and.mp4', {url:'{{Variable2}}.mp4', onComplete:'node name'}])

```

<br>

!> Important Considerations

`.playVideo()` is a non-blocking command, meaning that as soon as it executes the other command will follow without waiting for the video to be finished.

Thus, if we have the following two nodes:

```javascript

myIV.node('first node')
    .playVideo('filename1.mp4')
    .goto('second node')


myIV.node('second node')
    .playVideo('filename2.mp4')

```

`.goto()` command will be immediately executed  after the `.playVideo()` command, thus the first video will not get a chance to be played.

Thus, it's recommended to use onComplete event inside the `.playVideo()` in order to properly progress once the required video is done playing:


```javascript

myIV.node('first node')
    .playVideo({url: 'filename1.mp4', onComplete: 'second node')


myIV.node('second node')
    .playVideo('filename2.mp4')

```

Alternatively, a `.wait()` command can be used in conjuntion with `.goto()` in order to only play a portion of the video

```javascript

myIV.node('first node')
    .playVideo('filename1.mp4')
    .wait(10) // will wait for 10 seconds, while the video is playing
    .goto('second node')


myIV.node('second node')
    .playVideo('filename2.mp4') // will now play the second video

```

Keep in mind that in the above examples, the execution will halt at the second node, since no `onComplete` event is defined.
