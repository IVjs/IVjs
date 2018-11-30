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
  .wait(0.1)
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
    left: 10,
    top: 20,
    width: 20,
    height: 20,
    acceptDragItems: ['apple'],
    onSuccess: { setVariable: 'droppedItem', goToNode: 'drag success' }
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
