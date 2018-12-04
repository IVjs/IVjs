var myIV = new IV();

myIV.settings = {
  baseVideoUrl: 'https://s3.amazonaws.com/fpvideo/',
};

myIV.variables = {
  droppedItem: ''
};

myIV.node('start')
  .runAsync('drag loop')
  // TODO: fix issue requiring this hack of waiting for video to load before placing objects
  .wait(0.5)
  .goToNode('add targets')

myIV.node('add targets')
  .addDragItem({
    id: 'apple',
    image: 'images/apple.png',
    size: { width: 20 },
  })
  .addDragItem({
    id: 'orange',
    image: 'images/orange.png',
    size: { width: 20 },
  })
  .addDragTarget({
    visible: true,
    id: 'leftHandDrag',
    left: 50,
    top: 50,
    width: 20,
    height: 20,
    acceptDragItems: ['apple'],
    onSuccess: { setVariable: 'droppedItem', goToNode: 'drag success', js: function() {console.log('success')} }
  })

myIV.node('drag loop')
  .playVideo('1.mp4', { goToNode: 'drag loop' });

myIV.node('drag success')
  .log('{{droppedItem}}')
  // .removeDragItem('apple')
  // .removeDragItem('orange')
  // .removeDragTarget('leftHandDrag')
  .playVideo('dragSuccess.mp4');

myIV.run('start');
