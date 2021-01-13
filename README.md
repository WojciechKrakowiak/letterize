# Letterize.js

A javascript front-end library for wrapping single letters into HTML nodes (i.e. `<span></span>`). Made to make text animations easier and simplify letter by letter animation with libraries like [Anime.js](https://github.com/juliangarnier/anime/).

Visit [letterizejs.com](http://letterizejs.com) and checkout some [animated examples](http://letterizejs.com/examples).

Version 2.0 is out. Moved project to typescript, added types declaration file and added to npm repository. :smile:

**BREAKING CHANGES: majority of methods are now read-only properties**

## Installation

Install with npm or yarn
```
npm install letterizejs --save
yarn add letterizejs
```

Download /lib/letterize.min.js file into your project and include it in your HTML document:

```html
<script src="/path/to/letterize.min.js"></script>
```

or use cdn version:

```html
<script src="https://www.jsdelivr.com/package/npm/letterizejs"></script>
```

## Usage

```javascript
import Letterize from "letterizejs"
const example = new Letterize({targets: ".selector", options...});
```

## Options

### targets: _(String) **required**_

A javascript selector. All letters inside these elements will be wrappet in HTML nodes (by default in `<span></span>`)

_examples:_

```javascript
targets: "#sampleId",
targets: ".sampleClass",
targets: "h2",
targets: document.querySelector("h2"),
targets: document.getElementById("#sampleId")
```

### wrapper: _(String) (default: "span")_

A html tag name that we want to wrap elements into. Default value is "span"

_example:_

```javascript
wrapper: "div",
```

### className: _(String)_

A class name that has to be set on all letters wrapper element.

_example:_

```javascript
className: "letter",
```

## Methods and properties

`Letterize.targets` [read-only] _(Array, NodeList, HTMLCollection, HTMLElement, String)_ – returns an array of targets

`Letterize.wrapper` [read-only] _(String)_ – returns a name of letters' wrapper node. (i.e. "span")

`Letterize.className` [read-only] _String_ – returns a class name set on letters' wrappers

`Letterize.list` [read-only] _Array_ – returns an array of arrays. Each of inner arrays corresponds to each target element and contains all wrapper elements with letters. It can be used to animate letters in each target simultaneously.

`Letterize.listAll` [read-only] _Array_ – returns an array of all wrapper elements with letters without any division. Usefor for animating all targets one after another, or for other operations made on all letters.

`Letterize.deletterize()` – Removes all wrapper elements created in initialization and sets all properties to undefined.

## TODOs

- Get feedback, improve, share :wink:
