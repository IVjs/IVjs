# IV Command Syntax

IVjs commands will follow .node('node name') initializer, and will take in parameters that are defined with .command(parameters) styntax.


## Void commands

Void commands do not take in any parameters, which generally means that it will execute with default parameters, or without any parameter that are necessary.



For example

```javascript

myIV.node('first node')
    .log()

    // will log all of the variables under myIV.variables
    // to browser console

```


## Single Parameter Commands

Many of the IVjs commands will take in a single parameter that can be of type string or a number.  All of the strings are defined using single quotation marks - 'string'.  Numbers can be passed as is.

For example:

```javascript

myIV.node('first node')
    .playVideo('filename.mp4')
    .wait(5)
    .goto('second node')


```

## Multi-Parameter Commands

Some of the IVjs commands will behave differently depending on which parameters are passed in between the ().

Multiple paramenters are generally passed in using arrays, or JS object syntax.

For example:

```javascript

// you can use .playVideo() command to play a single file

myIV.node('first node')
    .playVideo('filename.mp4')

 // OR play multiple files

myIV.node('first node')
    .playVideo(['filename1.mp4', 'filename2.mp4', 'filename3.mp4'])

// OR play a file with onComplete option attached
// notice the { } object syntax in this case

myIV.node('first node')
    .playVideo({url:'filename.mp4', onComplete:'node name'})

// OR include the parameter object
// as the last item in the array list

myIV.node('first node')
    .playVideo(['filename1.mp4', 'filename2.mp4', {url:'filename.mp4', onComplete:'node name'}])

```

## Variable Templating

IVjs allows you to use Variable Templating in order to pass values stored inside the variable into commands.

Use {{VariableName}} syntax to accomplish that.

For example:

```javascript

myIV.variables = {
    fileName: 'firstvideo',
    fileName2: 'secondvideo',
    waitTime: 10,
    nodeName: 'Last Node'
}

// this code will replace the {{variablename}}
// with the actual value of that variable

myIV.node('first node')
    .playVideo('{{fileName}}.mp4', '{{fileName2}}.mp4')
    .wait('{{waitTime}}')
    .goto('{{nodeName}}')

```

Liquid modifiers can be used to facilitate certain functions.  The currently available modifier is " | random" and it will get the random value of the array as showcased below:

```javascript

myIV.variables = {
    myArray: ['firstvideo', 'second', 'third', 'fourth']
}

// this code will grab a random value from the array variable
// we've defined above

myIV.node('first node')
    .playVideo('{{myArray | random}}.mp4')

```
