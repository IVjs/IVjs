var myIV = new IV();

myIV.settings = {
  baseVideoUrl: 'http://s3.amazonaws.com/IVjs/Video/',
};

myIV.variables = {
  droppedItem: ''
};

myIV.node('start')
  .playVideo('DD-handUp.mp4', {goToNode: 'add targets'})

myIV.node('add targets')
  .addDragItem({
    id: 'coin',
    image: 'http://s3.amazonaws.com/IVjs/Video/coin.png',
    width: 10,
  })
  .addDragTarget({
    // visible: true, // shows target zone when uncommented
    id: 'target',
    left: 20,
    top: 30,
    width: 10,
    height: 20,
    acceptDragItems: ['coin'],
    onSuccess: {
      setVariable: 'droppedItem',
      goToNode: 'drag success',
      js: function() {console.log('success', myIV.variables)}
    }
  })
  .goToNode('drag loop')

myIV.node('drag loop')
  .playVideo('DD-loop.mp4', { goToNode: 'drag loop' });

myIV.node('drag success')
  .log('{{droppedItem}}')
  .removeDragTarget('target')
  .playVideo('DD-drop.mp4', { goToNode: 'start' });

myIV.run('start');
