# Setting Up Your Project

Just import the necessary script and the recommended styles. Add an element to the DOM whose ID is `IV-view` and then add your code to the bottom. For example:

```html
<!DOCTYPE html>
<head>
    <title>My IV App Html</title>
    <link rel="stylesheet" type="text/css" 
        href="https://cdn.jsdelivr.net/gh/IVjs/IVjs/dist/css/iv.css">
    <script type="text/javascript" 
        src="https://cdn.jsdelivr.net/gh/IVjs/IVjs/dist/iv.js"></script>
</head>
<body>

<div id="IV-view"></div>

<script>
    var iv = new IV();

    // Your IVjs code goes here. For example:

    iv.node('intro')
        .playVideo('intro.mp4', {goToNode: 'select'});
    
    iv.node('select')
        .playVideo('explain-selections.mp4')
        .addButton({id: 'choice 1', text: 'Red Pill', goToNode: 'one'})
        .addButton({id: 'choice 2', text: 'Blue Pill', goToNode: 'two'});
    
    iv.node('one')
        .playVideo('one.mp4', {goToNode: 'select'});
    
    iv.node('two')
        .playVideo('two.mp4', {goToNode: 'select'});

    
    // start the experience:

    iv.run('intro');

</script>

</body>
</html>
```

!> It is best not to link to the latest version on the master branch as the script link in the `<head>` is doing. Instead, link directly to the version you want. Versions can be found at https://github.com/IVjs/IVjs/releases. Once you find a version you prefer, link to it with something that looks like the following:  
https://cdn.jsdelivr.net/gh/IVjs/IVjs@0.3.0/dist/iv.js  
And of course, you can always download the library and host it on your server, which is probably the best idea for production.
