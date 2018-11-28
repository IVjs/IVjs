


var myIV = new IV();

// adjust Settings

myIV.settings = {
  baseVideoUrl: 'http://s3.amazonaws.com/IVjs/Video/',
}

// Define Variables

myIV.variables = {
   videoToPlay: ''
}

myIV.node('start')
  .playVideo('hi.mp4')

myIV.node('commandRecognized')
  .log('{{videoToPlay}}')
  .playVideo('{{videoToPlay}}')



if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'hello': function() {
      myIV.variables.videoToPlay = 'hello.mp4';
      myIV.run('commandRecognized');
    },
    'goodbye': function() {
      myIV.variables.videoToPlay = 'goodbye.mp4';
      myIV.run('commandRecognized');
    },
    'connect': function() {
      myIV.variables.videoToPlay = 'connect.mp4';
      myIV.run('commandRecognized');
    },
    'good job': function() {
      myIV.variables.videoToPlay = 'thanks.mp4';
      myIV.run('commandRecognized');
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}