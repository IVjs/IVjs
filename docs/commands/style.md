# Style Commands

Style allows for dynamic style creation and assignment 

## .createStyle()

### Syntax
```javascript
.createStyle({ Object Properties })
```

### createStyle Object Properties

* __`styleId`__ (string, required)
  * A *unique* Id , make sure that it's not conflicting with other on CSS page 
  * This command will create a CSS class name with this id.
* __`definition`__ (string, required)
  * CSS definition of the style

## .setStyle()

Will assign a style to the targetId
The id is not limited to the CSS classes created with .createStyle() command

### Syntax
```javascript
.setStyle({ setStyleOptions})
```

### setStyle Object Options

* __`styleId`__ (string, required)
  * An id of the style to remove.
* __`targetId`__ (string, optrequired)
 * Id of the element to assign the style to


## .removeStyle()

to be implemented

## Usage

```javascript
// create a rounded style and assign it to an image

myIV.node('first node')
    .createStyle({ styleId: 'roundedBtn', definition:'border-radius: 50%; border: 1px solid red; box-shadow: 5px 5px 20px #000; cursor: pointer'})
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
    .setStyle({styleId:'roundedBtn', targetId: 'imageButton1'})

```

