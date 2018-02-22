# Setting Up Your Project

A typical IVjs project will consist of HTML file with linked IVjs engine, placeholder for IVjs elements.

Your code for IVjs experience can be defined inside your HTML file, but as the best practice, it's better to abstract it into a separate JavaScript file and then reference it in your HTML file.

## HTML set-up

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My IV App Html</title>
    <style>
        #IV-view {
            width:640px;
            height: 360px;
            display: inline-block;
            position: relative;
        }

        #IV-view video {
            position:absolute;
            top: 0;
            left: 0;
            display: none;
        }

        #IV-buttons {
            position:absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }

 /* Mobile Kickoff Button Styling */
        #IV-kickoff {
            font-size: 3em;
        }
    </style>

<-- Link to the latest engine -->

<script type="text/javascript" src="http://ivjs.net/core/engine.js"></script>

</head>
<body style="text-align: center;">

<-- Placeholder for your IV application -->
<div id="IV-view"></div>

<-- link to your IV experience code -->
<script src="IV-definition.js"></script>

</body>
</html>
```

##  IV-Definition File Set Up

The IV definition js file will contain your IV code that will define your Interactive Video Experience using IV node-based chain syntax.

A basic boiler place for IV-definition.js would be as follows:

```javascript
//instantiate your IV class to be used in your project
var myIV = new IV();

// adjust Settings

myIV.settings = {
    baseVideoUrl: 'base url for your video files',
    bgAudioUrl: 'optional url of your background audio'
}

myIV.variables = {
  // Place your optional variables here
}


// Define Your Nodes Here
myIV.node('FirstNode')
    .playVideo('HelloWorld.mp4')

// Begin the execution.
// If nothing is passed into the function it will run
// the first node that was defined.
// Otherwise it will begin with the
// name of the function that was passed in
// for example santa.run('First Node')

myIV.run();

```
