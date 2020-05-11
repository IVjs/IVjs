# Animation Commands

Allows for animation of the elements by Id via IV commands

## .animate()

Will animate the target by Id using *Absolute* reference of the original placement
See notes at the end for clarification

### Syntax
```javascript
.animate({ animate Object Properties })
```

### animate Object Properties

* __`id`__ (string, required)
  * A *unique* Id for target element
  * The url location of the image source
*  __`x`__ (number, required)
  * A number in pixels to move to left or right
  * Negative numbers will move to the left
*  __`y`__ (number, required)
  * A number in pixels to move to top or bottom
  * Negative numbers will move to the top
*  __`scale`__ (number, optional)
  * 0 to 1 to x scale of the element.  1 leaves the element the original size
*  __`opacity`__ (number, optional)
  * 0 to 1 to x opacity of the element.  1 leaves the element the original size
* __`r`__ (number, optional)
  * Rotation of tin degrees  
*  __`duration`__ (number, required)
  * Time in seconds for the animation


### Important notes

The animate command is absolute and not relative.  If a previous animate command set position x to be 200, then subsequent animate command of __`x: 0`__  will animate the position back to the original instead of keeping the element at 200.



## Usage

```javascript
// add image with 2seconds fade in, rotation of 90 degrees, and go to second node on click

myIV.node('first node')
    .addImage({
      id: 'animateMe',
      url: 'http://imageUrlHere/imageButton.gif',
      x: 0,
      y: 350,
      w: 300,
      h: 50,
      layer: 2,
      r: 0,
      transition: 2,
      goToNode: 'animate'
    })

myIV.node('second')
    .animate{
        id: 'animateMe',
        x: 200,
        y: 200,
        r: 180,
        scale: 2,
        opacity: 0.5,
        duration: 2
    }
    .wait(3)
    .animate{
        id: 'animateMe',
        x: 0,
        y: 0,
        r: 0,
        scale: 1,
        opacity: 1,
        duration: 2
    }

```

