# Plugins

Plugins allow you to extend the public API of nodes in IVjs. All of the chainable instruction methods in IVjs (aside from conditionals: `.if()`, `.else()`, `.endif()`) are implemented internally as plugins.

```javascript
myIv.node('any node')
  .playVideo('someVideo.mp4')   // <--- That command was registered as a plugin
  .wait(10)                     // <--- That one too.
```

A plugin is registered by extending the IV class itself through a static function on the class. Capture the class you have created and new it up like normal.

```js
var ExtendedIV = IV.extend(myGreatPlugin);
var myIv = new ExtendedIV();

myIv.node('start')
  .startFireworks()   // <--- presumably provided by `myGreatPlugin`
```

# Features

Plugins can do one or more of three things:

1. Provide a brand new method to call on a node (Command Builder).
2. Provide a Command Handler to run on commands created by a Command Builder.
3. Alias existing node methods to new names.

Throughout all the other pages of documentation, we have reffered to methods available on a node as "Commands". For the purposes of explaining plugins, let's instead refer to those as "Command Builders". Because in reality, those methods create commands that may or may not be eventually issued to IVjs.

To understand plugins, it is a good idea to have a look at how IVjs runs.

```js
var myIv = new IV();  // Step 0
```

The line above will set up all registered plugins. That means all Command Builders will be attached to the `Node` class, all aliases will be set up (calling one Command Builder by another name), and all Command Handlers will be initialized. More on Command Handlers and how/why they get initialized later.

```js
myIv.node('first node')        // Step 1
  .playVideo('someVideo.mp4')  // Step 2
  .wait(10)
  .goToNode('second node');
```

Step 1 above creates a new instance of the `Node` class (internally it is called something different, but no matter). That instance has all the Command Builders ready to be called on it.

At step 2, the first Command Builder, `playVideo()`, is called. The `playVideo()` Command Builder creates a very specific object called a Command Object, which it then pushes into a queue. At this point, nothing else occurs. No video is either fetched or played at all. The remaining two lines containing the `.wait()` and `.goToNode()` Command Builders do essentially the same thing as step 2. Of course all the Command Objects contain slightly different data, but they all conform to a specific shape.

Remember that nothing has happened in the DOM as far as the user is concerned. The only thing that has happened so far is that three Command Objects have been created and pushed into a queue.

```js
myIv.run('first node')     // Step 3
```

This is what actually starts everything into motion. Here is what will happen, in order:

1. The "first node" will be told to start running.
2. The "first node" will issue the first Command Object in its queue. In this case, it was the Command Object that was created by `.playVideo()`. That object contains information about what function handles it and any information that the `playVideo()` Command Builder decided should be presented as well. In this case, it *could* look something like this: `{ name: 'playVideoHandler', url: 'someVideo.mp4'}`.
3. Because the `name` property of the Command Object was `'playVideoHandler'`, a Command Handler named `playVideoHandler()` will be called. If no such function was registered, an error is thrown. In our case, the plugin that registered the `playVideo()` Command Builder also registered the requisite `playVideoHandler()` Command Handler as well. It is often the case that plugins will register both a Builder and a Handler.
4. The `playVideoHandler()` function is run. That function does something to get a video playing in the DOM. It really doesn't matter what it does, because that the is creative part of writing a plugin. Each one will do something different in this step. However, it is crucial that the `playVideoHandler()` (and all Command Handlers) returns a `Promise` which resolves to a Handler Return Object. In many cases the Handler Return Object is simply an empty object (`{}`), but not always. In the case of the `playVideoHandler()`, it returns something more complex. But that isn't important right now.
5. The "first node" holds on to the promise returned by `playVideoHandler()`. Once that promise resolves, the resulting instructions are read. If those instructions to not say to stop, then "first node" is free to act again. In our case, it is free to act again.
6. The "first node" checks its queue and sees another command. That command is the one that was created by `wait()`. It probably looks like this: `{name: 'waitHandler', time: 10000}`. (We are assuming that the `wait()` Builder converted seconds to milliseconds before creating the Command Object.)
7. Again "first node" finds the handler for the command and gives it the Command Object. Everything continues on as before, except with the `waitHandler()` being called. Now the `waitHandler()` only really does one thing: it creates a `Promise` that will resolve to `{}` in 10000 milliseconds. This is the same idea as the `playVideoHandler()` from above, except the promise created by `playVideoHandler()` resolved nearly immediately.
8. The "first node" now holds on the promise from `waitHandler()`. The video that was started earlier is playing in the DOM, by the way. It has been for a few milliseconds now.
9. Ten seconds later: The promise is resolved! The "first node" now is free to act again.
10. The process continues much the same for the final command in the queue. However, `goToNodeHandler()` tells IV to run a node called "second node". Then, as usual, it returns a promise that resolves to `{}`.
11. The "first node" is free to act again, but the queue is empty. So it resets its queue to position 0 and waits to be called again by IV.

# Command Builders

Documentation to come.

# Command Objects

Documentation to come.

# Command Handlers

Documentation to come.

# Command Handler Returns

Documentation to come.

# Example

An example of creating a plugin which manipulates DOM outside of the IV-view

<iframe src="/demos/plugins.html" style="width:100%;height:480px;border:none;"></iframe>

HTML file:

[plugins.html](../demos/plugins.html ':include :type=code')

`plugins.js` File:

[plugins.js](../demos/plugins.js ':include :type=code js')