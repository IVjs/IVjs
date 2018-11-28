var myIV = new IV();

// adjust Settings

myIV.settings = {
    baseVideoUrl: 'https://s3.amazonaws.com/ivxml.chapel/interactivation/santatad/MP4/',

}


// Define Variables

myIV.variables = {
  clickedRegion: '',
}

// Define Nodes

// First node

myIV.node('First Node')
  .addRegion({
    visible: true,
    id: 'leftCheek',
    position: {x: 20, y: 20},
    size: {width: 5, height: 10},
    onClick: {setVariable: 'clickedRegion', goToNode: 'Handle Regions'}
    })
  .addRegion({
    visible: true,
    id: 'rightCheek',
    position: {x: 20, y: 20},
    size: {width: 5, height: 10},
    onClick: {setVariable: 'clickedRegion', goToNode: 'Handle Regions'}
  })
  .addRegion({
    visible: true,
    id: 'nose',
    position: {x: 20, y: 20},
    size: {width: 5, height: 10},
    onClick: {setVariable: 'clickedRegion', goToNode: 'Handle Regions'}
  })
  .playVideo('firstPlay.mp4',{gotToNode:'Wait Loop'})


myIV.node('Wait Loop')
  .playVideo('wait.mp4',{gotToNode:'Wait Loop'})


myIV.node('Handle Regions')
  .log('{{clickedRegion}} was clicked')
  .playVideo('{{clickedRegion}}.mp4', goToNode: 'Wait Loop')


myIV.run('First Node');
