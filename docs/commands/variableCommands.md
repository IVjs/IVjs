# IV Variable ManipulationCommands

This set of commands allows you to define, manage and manipulate variables.


# .setVariable( { options } )

This command allows you to define or update values of variables at runtime, or exchange the values between various variables.

Syntax:

```javascript

// will create a variable firstName, and will assign a string 'Bob' to it at runtime

.setVariable({ storeIn: 'firstName', value: 'Bob'})

// will pass the value 'Bob' from the variable above into anotherGuy

.setVariable({ var: 'firstName', storeIn: 'anotherGuy'})


// will set 5 to variable COUNT.  If the variable doesn't exist, it will create it.

.setVariable({ storeIn: 'COUNT', value: 5})

```


# .calculate( { options } )

This command allows to perform mathematical operations on the numeric variables.  The results can be passed to a different variable, or kept in the same one.

Syntax:

```javascript
// Assuming myNumber is 10...

.calculate({ var: 'myNumber', storeIn: 'result', add: 1 }) // `result` will be 11
.calculate({ var: 'myNumber', storeIn: 'result', subtract: 5 }) // `result` will be 5
.calculate({ var: 'myNumber', storeIn: 'result', multiply: 5 }) // `result` will be 50
.calculate({ var: 'myNumber', storeIn: 'result', divide: 5 }) // `result` will be 2
.calculate({ var: 'myNumber', storeIn: 'result', roundAfterDivideBy: 7 }) // `result` will be 1
.calculate({ var: 'myNumber', storeIn: 'result', roundUpAfterDivideBy: 7 }) // `result` will be 2
.calculate({ var: 'myNumber', storeIn: 'result', roundDownAfterDivideBy: 7 }) // `result` will be 1
```

```javascript
// example of changing the variable directly (not using `storeIn`)
// Assuming myNumber is 10 to begin with...

.calculate({ var: 'myNumber', add: 1 }) // `myNumber` will be 11
.calculate({ var: 'myNumber', subtract: 1 }) // `myNumber` will be 10
.calculate({ var: 'myNumber', add: '{{myNumber}}' }) // `myNumber` will be 20
```

In the simple rounding commands, the operand given to the command is ignored, so for clarity's sake, it is a good idea to simply pass `true`.

```javascript
// some simple rounding examples.
// assuming myNumber is 1.5 ...

.calculate({ var: 'myNumber', storeIn: 'result', round: true }) // `result` will be 2
.calculate({ var: 'myNumber', storeIn: 'result', roundUp: true }) // `result` will be 2
.calculate({ var: 'myNumber', storeIn: 'result', roundDown: true }) // `result` will be 1
```

# .getRandom()

This command will generate a random number between min and max range and store it in a variable of your choice.


Syntax:

```javascript

.getRandom({min: 0, max: 100, storeIn: 'myRandomNumber'})

```

# .log()

Log allows to log the value of the variables to the browser console for debugging.


Syntax:

```javascript

// log all of the variables to console

.log()

// log a text message to console

.log('my message')

// log a value of a specific variable to console
.log('{{COUNT}}')

// mix variables and text message in the log
.log('this node was executed {{COUNT}} times')


```

# Variable Templating

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
    .goToNode('{{nodeName}}')

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
