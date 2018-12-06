var myIV = new IV();

myIV.settings = {
  baseVideoUrl: 'http://s3.amazonaws.com/IVjs/Video/RGN-',
}

myIV.variables = {
  clickedZone: '',
}

myIV.node('First Node')
  .playVideo('loop.mp4', { goToNode: 'Wait Loop' })
  .wait(0.5)
  .addZone({
    visible: true,
    id: 'cheek',
    left: 42, top: 45,
    width: 5, height: 7,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })
  .addZone({
    visible: true,
    id: 'leye',
    left: 43, top: 38,
    width: 5, height: 5,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })
  .addZone({
    visible: true,
    id: 'reye',
    left: 51, top: 38,
    width: 5, height: 5,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })
  .addZone({
    visible: true,
    id: 'mouth',
    left: 45, top: 52,
    width: 9, height: 7,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })
  .addZone({
    visible: true,
    id: 'lshoulder',
    left: 35, top: 58,
    width: 9, height: 7,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })
  .addZone({
    visible: true,
    id: 'rshoulder',
    left: 55, top: 58,
    width: 9, height: 7,
    onClick: { setVariable: 'clickedZone', goToNode: 'Handle Zones' }
  })

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
