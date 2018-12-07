// Create the plugin

var counterFactory = (_input) => {
  let times = 0;
  const el = document.querySelector('#artisanal-div');
  const countSpan = el.querySelector('span')
  const appendedMessageDiv = document.createElement('div');
  el.append(appendedMessageDiv);
  countSpan.innerHTML = times;

  return {
    count: (cmd) => {
      appendedMessageDiv.innerHTML = cmd.message;
      countSpan.innerHTML = ++times;
      return Promise.resolve({});
    },
  };
};


var counter = function (str) {
  this.pushCommands({
    name: 'count',
    message: str,
  });
};

var countPlaysPlugin = {
  apiExtension: { count: counter },
  targetFunctionFactories: [counterFactory],
};


// Register the plugin
var IV_WithPlugin = IV.extend(countPlaysPlugin);

// Create an IV instance using new class.
var myIV = new IV_WithPlugin();

// Continue as normal

myIV.settings = {
    baseVideoUrl: 'http://s3.amazonaws.com/IVjs/Video/'
}

myIV.variables = { }

myIV.node('video')
  .playVideo(
    'DD-handUp.mp4',
    'DD-drop.mp4',
    {goToNode: 'done playing'}
  );
  
myIV.node('done playing')
  .count('--- My custom message. ---')
  .goToNode('video')

myIV.run('video');
