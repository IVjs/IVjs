# Setting Up Your Project

A typical IVjs project will consist of HTML file with linked IVjs engine, placeholder for IVjs elements.

Your code for IVjs experience can be defined inside your HTML file, but as the best practice, it's better to abstract it into a separate JavaScript file and then reference it in your HTML file.

## HTML set-up

```html
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


<-- Link to the latest engine. Adds `IV` global to the window -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/IVjs/IVjs/dist/iv.js"></script>
<--
    A note about the link above: It is best not to link to the latest version on the master
    branch as the line above is doing. Instead, link directly to the version you want. Versions
    can be found at https://github.com/IVjs/IVjs/releases.

    Once you find a version you prefer, link to it with something that looks like the following:
    https://cdn.jsdelivr.net/gh/IVjs/IVjs@0.3.0/dist/iv.js

    And of course, you can always download the library and host it on your server.
-->

</head>
<body style="text-align: center;">

<-- Placeholder for your IV application -->
<div id="IV-view"></div>
<--
    The div above must have an id of `IV-view`. If not, you must pass a reference to your
    element in to `new IV()` when you call it. The following illustrates the default
    behavior:
    new IV({ settings: { baseContainer: document.getElementById('IV-view') } });
-->

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
