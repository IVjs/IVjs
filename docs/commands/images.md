# Images Commands

Image commands allow you to add and manipulate images in your IVjs presentation
The images are added to their own layered contained with positioning relative to the top left of the IV-view container.  

## .addImage()

### Syntax
```javascript
.addImage({ AddImage Object Properties })
```

### addImage Object Properties

* __`id`__ (string, required)
  * A *unique* Id for your image.
* __`url`__ (string, required)
  * The url location of the image source
*  __`x`__ (number, required)
  * A number in pixels from the top left of the IV-view container.
  * Negative numbers and out of bounds placement is possible
*  __`y`__ (number, required)
  * A number in pixels from the top left of the IV-view container.
  * Negative numbers and out of bounds placement is possible
*  __`layer`__ (number, optional)
  * Z-index *inside* the images container to sort which image will be on top
*  __`w`__ (number, required)
  * Width of the image in pixels.
*  __`h`__ (number, required)
  * Height of the image in pixels
* __`r`__ (number, optional)
  * Rotation of the image in degrees
* __`transition`__ (number, optional)
  * Time in seconds for fade in
* __`goToNode`__ (string, optional)
    * If set, string determines the node which will be immediately executed on image click
* __`runAsync`__ (string, optional)
    * If set, string determines the node which will executed asyncrounously on image click

## .removeImage()

Will remove image by id with optional transition for fade out

### Syntax
```javascript
.removeImage({ removeImageOptions})
```

### removeImage Object Options

* __`id`__ (string, required)
  * An id of the image to remove.
* __`transition`__ (number, optional)
  * Time in seconds for fade out


## .removeAllImages()

Removes all images

### Syntax
```javascript
.removeAllImages()
```

## Usage

```javascript
// add image with 2seconds fade in, rotation of 90 degrees, and go to second node on click

myIV.node('first node')
    .addImage({
      id: 'kickoff',
      url: 'http://imageUrlHere/kickoff.gif',
      x: 0,
      y: 0,
      w: 300,
      h: 300,
      r: 90,
      layer: 1,
      transition: 1
    })
    .addImage({
      id: 'imageButton1',
      url: 'http://imageUrlHere/imageButton.gif',
      x: 0,
      y: 350,
      w: 300,
      h: 50,
      layer: 2,
      r: 0,
      transition: 2,
      goToNode: 'second'
    })

myIV.node('second')
  .removeImage({id: 'kickoff'})
  .removeImage({id: 'button', transition: 1})
  .playVideo('thanksForWatching.mp4')

```

