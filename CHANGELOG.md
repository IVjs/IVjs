### v0.2.1

* Guarantee (and document) the order of execution of commands created by merged video options of the `.playVideo()` method. Async first, then sync, then goto.
* Bugfix: `IV.run()` was not accepting a name as its first argument.

## v0.2.0

* background audio loops by default, with options to disable and enable looping
* fixed a bug where video "on complete" commands would fire even if we had already gone to another node, though it [doesn't completely mitigate the problem](https://github.com/flixpressllc/IVjs/issues/9).
* added this change log. :wink:

# v0.1.0

Initial beta
