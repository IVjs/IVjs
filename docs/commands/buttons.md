# Button Commands

# .addButton()

Adds a button to a div with class `IV-button-container`.

## Syntax
```javascript
.addButton(buttonSettings)
```

* __`buttonSettings`__
  - (object, required) Settings for the button you are adding.

### Button Settings Object

```javascript
{
  id: 'myButtonId',
  text: 'Click me!'
  goTo: 'someNodeName',
  runAsync: 'someNodeName',
  js: someExternalJsFunction,
}
```

### Button Settings Properties

* __`id`__
  - (string starting with a letter, containing no spaces, required) unique id for the button
  - This will be passed into the id attribute of the element
* __`text`__
  - (string, required) Text displayed inside the button
* __`remove`__
  - (boolean, optional, default: `false`) When true, remove button on click
* __`goTo`__
  - (string, sometimes optional*) The name of the node you wish to jump to.
  - Fires on click.
  - Just like the `.goToNode()` method on a node, this ends the current node's execution.
* __`runAsync`__
  - (string, sometimes optional*) The name of the node you wish to run.
  - Fires on click.
  - Continues execution in this node and runs the given node through to completion at the same time. Nothing happens here when the given node ends.
* __`js`__
  - (function, sometimes optional*) callback function
  - Any regular Javascript function.
  - Function will receive the following:
    * __TBD__

!> \* sometimes optional: At least one of the three action properties (`goTo`, `runAsync`, or `js`) must be defined.


## Usage

```javascript
// Go to a node on click, and remove the button at the same time

myIV.node('first node')
    .playVideo('someVideo.mp4')
    .addButton({
      id: 'myFirstButton',
      text: 'Next Video',
      goTo: 'second',
      remove: true
    })

myIV.node('second')
  .playVideo('thanksForWatching.mp4')

```

# .removeButton()

Removes a button with a specified ID.

## Syntax
```javascript
.removeButton(buttonId)
```

* __`buttonId`__
  - (string, required) The id of the button you wish to remove

## Usage

```javascript
myIV.node('first node')
    .playVideo('someVideo.mp4')
    .addButton({
      id: 'myFirstButton',
      text: 'Next Video',
      goTo: 'second'
    })

myIV.node('second')
  .removeButton('myFirstButton')
  .playVideo('thanksForWatching.mp4')
```

# .removeAllButtons()

Removes all buttons that were created by IV.

## Syntax
```javascript
.removeAllButtons()
```

## Usage

```javascript
myIV.node('first node')
    .playVideo('timeToChoose.mp4')
    .addButton({
      id: 'choiceA-Btn',
      text: 'Blue Pill',
      goTo: 'node A'
    })
    .addButton({
      id: 'choiceB-Btn',
      text: 'Red Pill',
      goTo: 'node B'
    })

myIV.node('node A')
  .removeAllButtons()
  .playVideo('choiceA.mp4')

myIV.node('node B')
  .removeAllButtons()
  .playVideo('choiceB.mp4')
```
