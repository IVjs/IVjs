var newIV = IV.extend(alertPlugin);
var myIV = new newIV();
// adjust Settings

myIV.settings = {
    baseVideoUrl: 'http://s3.amazonaws.com/IVjs/Video/'
}


// Define Variables

myIV.variables = {
}

// Define Nodes

// First node: Intro
// Plays the timenow video then goes to Second Node

myIV.node('Intro')
  .alert('Done Playing!')

myIV.node('done playing')


myIV.run('Intro');
