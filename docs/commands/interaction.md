# DOM Interactions

# Drag and Drop

## .addDragItem()

### Syntax
```javascript
.addDragItem(DragItemInstructions)
```

* __`DragItemInstructions`__  
An options object (see directly below).

```typescript
interface DragItemInstructions {
  id: string;
  image: string;
  width?: number;
  height?: number;
}
```

### Drag Instructions Properties

* __`id`__ (string, required)
  * A *unique* name for your draggable item.
  * If the name is not unique, items with the same id will be removed from the DOM to make room for this one.
* __`image`__ (string, required)
  * The url pointing to the image you are using as your draggable item.
*  __`width`__ (number, optional)
  * A *percentage* of the width of the current video.
  * If present, this will constrain your image in the width direction to a percentage of the current video.
  * The image (unless affected by some other styling somewhere) will retain its ratio.
*  __`height`__ (number, optional)
  * A *percentage* of the height of the current video.
  * If present, this will constrain your image in the heigth direction to a percentage of the current video.
  * The image (unless affected by some other styling somewhere) will retain its ratio.

!> Using both `width` and `height` in your instructions will not preserve the natural ratio of your image. It is ususally best to use only one dimension.

### Usage

See examples at the bottom of this section.

## .removeDragItem()

### Syntax
```javascript
.removeDragItem(DragItemId)
```

* __`DragItemId`__ (string, required)
  * removes the specified drag item from the DOM

### Usage

```javascript
myIv.node('remove all the items')
  .removeDragItem('first')
  .removeDragItem('second')
  .removeDragItem('third')
```

## .addDragTarget()

### Syntax
```javascript
.addDragTarget(DragTargetInstructions)
```

* __`DragTargetInstructions`__  
An options object (see directly below).

```typescript
interface AddDragTargetSettings {
  id: string;
  width: number;
  height: number;
  top: number;
  left: number;
  visible?: boolean;
  acceptDragItems?: string[];
  onSuccess?: {
    js?: () => void;
    setVariable?: string;
    goToNode?: string;
    keepItem?: boolean;
  }
}
```

### Drag Instructions Properties

* __`id`__ (string, required)
  * A *unique* name for your draggable target.
*  __`width`__ (number, required)
  * A *percentage* of the width of the current video.
  * Sizes the width of your target area based on the current video.
*  __`height`__ (number, required)
  * A *percentage* of the height of the current video.
  * Sizes the height of your target area based on the current video.
*  __`left`__ (number, required)
  * A *percentage* of the width of the current video.
  * Positions the top/left point of your target area in relation to the video.
*  __`top`__ (number, required)
  * A *percentage* of the height of the current video.
  * Positions the top/left point of your target area in relation to the video.
* __`visible`__ (boolean, optional)
  * If set to `true`, it will show a border around your target area. Useful during development. The target area will highlight when an acceptable item is within.
* __`acceptDragItems`__ (array of strings, optional)
  * By default, all target areas accept all draggable elements. If you would rather restrict which draggables can be dropped in this zone, list the ids of the elements you wish to accept here.
* __`onSuccess`__ (object, optional)
  * All properties below are optional.
  * __`js`__ (function)
    * If set, this function will be called when an item has been successfully dropped.
  * __`setVarible`__ (string)
    * If set, this string determines the IV variable which will be set to the id of the dropped item.
  * __`goToNode`__ (function)
    * If set, string determines the node which will be immediately executed.
  * __`keepItem`__ (boolean)
    * If set to true, the dropped item will not be removed from the DOM.
  

### Usage

See examples at the bottom of this section.


## .removeDragTarget()

### Syntax
```javascript
.removeDragTarget(DragTargetId)
```

* __`DragTargetId`__ (string, required)
  * removes the specified drag target from the DOM

### Usage

```javascript
myIv.node('remove all the targets')
  .removeDragTarget('first')
  .removeDragTarget('second')
  .removeDragTarget('third')
```


## Drag and Drop Demo

<iframe src="/demos/drag-and-drop.html" style="width:100%;height:480px;border:none;"></iframe>

[drag-and-drop.js file](../demos/drag-and-drop.js ':include :type=code js')

# Zones

Zones allow you to add interactive click areas on top of your video.

## .addZone()

### Syntax
```javascript
.addZone(ZoneInstructions)
```

* __`ZoneInstructions`__  
An options object (see directly below).

```typescript
interface AddZoneSettings {
  id: string;
  width: number;
  height: number;
  top: number;
  left: number;
  visible?: boolean;
  onClick: {
    js?: () => void;
    setVariable?: string;
    goToNode?: string;
  }
}
```

### Drag Instructions Properties

* __`id`__ (string, required)
  * A *unique* name for your zone.
*  __`width`__ (number, required)
  * A *percentage* of the width of the current video.
  * Sizes the width of your zone area based on the current video.
*  __`height`__ (number, required)
  * A *percentage* of the height of the current video.
  * Sizes the height of your zone area based on the current video.
*  __`left`__ (number, required)
  * A *percentage* of the width of the current video.
  * Positions the top/left point of your zone area in relation to the video.
*  __`top`__ (number, required)
  * A *percentage* of the height of the current video.
  * Positions the top/left point of your zone area in relation to the video.
* __`visible`__ (boolean, optional)
  * If set to `true`, it will show a border around your zone area. Useful during development.
* __`onClick`__ (object, required)
  * You must use one or more of the properties below.
  * __`js`__ (function)
    * If set, this function will be called when the zone is clicked.
  * __`setVarible`__ (string)
    * If set, this string determines the IV variable which will be set to the id of the clicked zone.
  * __`goToNode`__ (function)
    * If set, string determines the node which will be immediately executed.
  

### Usage

See examples at the bottom of this section.


## .removeZone()

### Syntax
```javascript
.removeZone(ZoneId)
```

* __`ZoneId`__ (string, required)
  * removes the specified zone from the DOM

### Usage

```javascript
myIv.node('remove all the targets')
  .removeZone('first')
  .removeZone('second')
  .removeZone('third')
```


## Zones Demo

<iframe src="/demos/zones.html" style="width:100%;height:480px;border:none;"></iframe>

[zones.js file](../demos/zones.js ':include :type=code js')