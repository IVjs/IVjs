var myIV = new IV();

myIV.settings = {
  baseVideoUrl: 'http://s3.amazonaws.com/IVjs/Video/RGN-',
}

myIV.variables = {
  clickedZone: '',
  help: false,
}

myIV.node('First Node')
  .removeAllButtons()
  .playVideo('loop.mp4', { goToNode: 'Wait Loop' })
  .wait(0.5)
  .runAsync('add zones')
  .addButton({id: 'need help', text: 'Where should I click?', goToNode: 'need help', remove: true})

myIV.node('add zones')
  .addZone({
    visible: '{{help}}',
    id: 'cheek',
    left: 42, top: 45,
    width: 5, height: 7,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })
  .addZone({
    visible: '{{help}}',
    id: 'leye',
    left: 43, top: 38,
    width: 5, height: 5,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })
  .addZone({
    visible: '{{help}}',
    id: 'reye',
    left: 51, top: 38,
    width: 5, height: 5,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })
  .addZone({
    visible: '{{help}}',
    id: 'mouth',
    left: 45, top: 52,
    width: 9, height: 7,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })
  .addZone({
    visible: '{{help}}',
    id: 'lshoulder',
    left: 35, top: 58,
    width: 9, height: 7,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })
  .addZone({
    visible: '{{help}}',
    id: 'rshoulder',
    left: 55, top: 58,
    width: 9, height: 7,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })

myIV.node('add help zones')
  .runSync('remove zones')
  .setVariable({storeIn: 'help', value: true})
  .runSync('add zones')
  .setVariable({storeIn: 'help', value: false}) // This line seems not to work at the moment.

myIV.node('need help')
  .runSync('add help zones')
  .goToNode('Wait Loop')

myIV.node('Wait Loop')
  .playVideo('loop.mp4', {goToNode:'Wait Loop'})

myIV.node('remove zones')
  .removeZone('cheek')
  .removeZone('leye')
  .removeZone('reye')
  .removeZone('rshoulder')
  .removeZone('lshoulder')
  .removeZone('mouth')

myIV.node('Handle Zones')
  .log('{{clickedZone}} was clicked')
  .runAsync('remove zones')
  .playVideo('{{clickedZone}}.mp4', {goToNode: 'First Node'})

myIV.run('First Node');
