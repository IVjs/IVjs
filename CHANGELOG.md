# {{next-version}}


### v0.9.1

* Address issue where Android Chrome would scroll page instead of drag items.

## v0.9.0

* Fixes and documents the Plugin System

## v0.8.0

* give videos a max width of 100% by default
* Initial zones support

## v0.7.0

* Adds drag and drop interfaces

## v0.6.0

* Exported TS definitions include all core plugin functions
* Remove `getCommands()` from the `IvNode` (public) interface
* Simplify plugin api registration object

## v0.5.0

* add missing documentation for `wait()`
* remove documentation for unimplemented timestamps options for `playVideo()`
* Add some universal, base styles that show the experience properly.
* Deprecate `execute()` in favor of `runAsync()`
* Deprecate `goSub()` in favor of `runSync()`
* Deprecate `return()` in favor of `endAllNodes()`
* Plugins can alias user API functions
* Remove Deprecated `videoPlay` alias of `playVideo`
* Rename `.goto()` -> `.goToNode()`
* Rename option for video completion from `goTo` -> `goToNode` to be more inline with new method name

## v0.4.0

* Plugin system added
* All front-facing apis on a node are registered through the plugin system

## v0.3.0

* Bugfix: mobile devices would not allow for a kickoff button click to run a node by name
* adds a `createRunButton(btnName?, nodeName?)` method allowing you to force a kickoff button to be created

### v0.2.1

* Guarantee (and document) the order of execution of commands created by merged video options of the `.playVideo()` method. Async first, then sync, then goto.
* Bugfix: `IV.run()` was not accepting a name as its first argument.

## v0.2.0

* background audio loops by default, with options to disable and enable looping
* fixed a bug where video "on complete" commands would fire even if we had already gone to another node, though it [doesn't completely mitigate the problem](https://github.com/flixpressllc/IVjs/issues/9).
* added this change log. :wink:

# v0.1.0

Initial beta
