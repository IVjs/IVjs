var myIV = new IV();

// adjust Settings

myIV.settings = {
    baseVideoUrl: 'https://s3.amazonaws.com/ivxml.chapel/interactivation/santatad/MP4/',
}


// Define Variables

myIV.variables = {
  droppedItem: ''
}

// Define Nodes

// First node: Intro
// Plays the timenow video then goes to Second Node

myIV.node('start')
  .addDragItem(
    id: 'thumbsUp',
    image: 'thumbsUpButton.png',
    size: {width:20, height: 20},
  )
.addDragItem(
  id: 'smiley',
  image: 'smileyButton.png',
  size: {width:20, height: 20},
)
  .addDragTarget(
    visible: true,
    id: 'leftHandDrag',
    position:{x: 10, y: 20},
    size: {width:20, height: 20},
    acceptDragItems: ['thumbsUp']
    onSuccess:{setVariable: 'droppedItem', goToNode: 'drag success'}
  )
    .playVideo('dragStart.mp4', {goToNode: 'drag loop'})

myIV.node('drag loop')
  .playVideo('dragLoop.mp4', {goToNode: 'drag loop'})

myIV.node('drag success')
  .log('{{droppedItem}}')
  .removeDragItem('thumbsUpButton')
  .removeDragTarget('leftHandDrag')
  .playVideo('dragSuccess.mp4')

// Async called node: Audio
// Sets up the audio

myIV.run('start');
