<h1 align="center">Work in progress...</h1>

[![GitHub Release](https://img.shields.io/badge/release-v1.0.0-orange)](https://github.com/Amstramgram75/Amstramgram-Video-Player/releases/tag/v1.0.0)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](https://github.com/Amstramgram75/Amstramgram-Video-Player/blob/master/LICENSE)
[![dependency Status](https://david-dm.org/Amstramgram75/Amstramgram-Video-Player/status.svg)](https://david-dm.org/Amstramgram75/Amstramgram-Video-Player)
[![devDependency Status](https://david-dm.org/Amstramgram75/Amstramgram-Video-Player/dev-status.svg)](https://david-dm.org/Amstramgram75/Amstramgram-Video-Player?type=dev)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/Amstramgram75)

Simple, elegant, ligthweight although powerfull and versatile HTML5 video player.


## Table of contents
  * [Features](#features)
  * [Installation](#installation)
  * [Importing](#importing)
  * [Usage](#usage)
  * [Customization](#customization)
  * [API](#api)
  * [Responsive images](#responsive-images)
  * [Compatibility](#compatibility)
  * [Contributing](#contributing)
  * [Donation](#donation)
  * [Credits](#credits)
  * [License](#license)

## Features

* Written in pure JavaScript, no dependencies required
* Two UI modes : normal / compact
* Preview thumbnails support
* Touch-devices support
* SVG buttons, no extra files to download
* Previous, play/pause, next, fullscreen, download buttons
* Display of current time and total duration
* All buttons titles configurables
* Around 13.52KB gzipped

## Installation

You can use one of the following methods :

### npm
```sh
npm -i -d amstramgramVideoPlayer
```
### Manually
1. Download `amstramgramVideoPlayer.min.css` from tge `dist/css` folder and `amstramgramVideoPlayer.min.js` from the `dist/iife` folder.
2. Include them somewhere in your document :
  ```html
<link rel="stylesheet" href="css/amstramgramVideoPlayer.min.css">
<script src="js/amstramgramVideoPlayer.min.js"></script>
  ```
## Importing

### Traditional approach

If you don't use JavaScript modules and include the file with a `<script>` tag, you don't have to import anything explicitly. `AmstramgramVideoPlayer` will be available in the global scope.

### CommonJS

```js
const AmstramgramVideoPlayer = require('amstramgramVideoPlayer');
```

### ES2015 modules

```js
import AmstramgramVideoPlayer from 'amstramgramVideoPlayer';
```

### Sass

```scss
@import 'amstramgramVideoPlayer/css/amstramgramVideoPlayer.min.scss';
```

## Usage

Initialize the script by running :

```js
new AmstramgramVideoPlayer(document.querySelector('video'))
```
## Customization

You can pass an object with custom options as the second parameter.

```js
new AmstramgramVideoPlayer(document.querySelector('video'),{
    // Custom options
});
```

__:small_orange_diamond: The following options can be set either by overiding the default options, when creating the instance or when updating the source :__  
___
:black_medium_small_square: <ins>__autoplay__</ins>&ensp;&ensp;{Boolean}  
Default : `false`  
If `true`, the attribute `autoplay` is added to the `<video>` tag.<br>
__*Please be aware that most of the browsers block this functionality if volume is not muted.</span>*__  
___
:black_medium_small_square: <ins>__crossorigin__</ins>&ensp;&ensp;{String} `"anonymous"` | `"use-credentials"`  
Default : `"anonymous"`  
Attribute added to the `<video>` tag.
___
:black_medium_small_square: <ins>__download__</ins>&ensp;&ensp;{Object}  
Default :  
`{`   
&ensp;&ensp;`label: "Télécharger",`  
&ensp;&ensp;`disabled: false,`  
&ensp;&ensp;`hidden: false`  
`}`  
_Donwload_ button properties.
___
:black_medium_small_square: <ins>__duration__</ins>&ensp;&ensp;{Integer}  
Default : 120  
Video duration in __seconds__.  
Updated on `loadedmetadata` event.
___
:black_medium_small_square: <ins>__format__</ins>&ensp;&ensp;{Number}  
Default : 16/9  
Video format ratio.  
Updated on `loadedmetadata` event.
___
:black_medium_small_square: <ins>__fullscreen__</ins>&ensp;&ensp;{Object}  
Default :  
`{`   
&ensp;&ensp;`label:`   
&ensp;&ensp;&ensp;&ensp;`{`  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`enter: "Plein Écran",`  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`exit: "Quitter le plein écran",`  
&ensp;&ensp;&ensp;&ensp;`},`   
&ensp;&ensp;`disabled: false,`  
&ensp;&ensp;`hidden: false`  
`}`  
_Fullscreen_ button properties.
___
:black_medium_small_square: <ins>__loop__</ins>&ensp;&ensp;{Boolean}   
Default : `false`  
Attribute added to the `<video>` tag.
___
:black_medium_small_square: <ins>__next__</ins>&ensp;&ensp;{Object}  
Default :  
`{`   
&ensp;&ensp;`label: "Suivant",`  
&ensp;&ensp;`disabled: true,`  
&ensp;&ensp;`hidden: true`  
`}`  
_Next_ button properties.
___
:black_medium_small_square: <ins>__playsinline__</ins>&ensp;&ensp;{Boolean}   
Default : `true`  
When `true`, the attributes `playsinline` and `webkit-playsinline` are added to the `<video>` tag.
___
:black_medium_small_square: <ins>__poster__</ins>&ensp;&ensp;{String}   
Default : `undefined`  
Source of the image used as poster.
___
:black_medium_small_square: <ins>__preload__</ins>&ensp;&ensp;{String} `"auto"` | `"metadata"` | `"none"` | `"preload"`  
Default : `"none"`  
Value of the attribute `preload` for the `<video>` tag.
___
:black_medium_small_square: <ins>__previous__</ins>&ensp;&ensp;{Object}  
Default :  
`{`   
&ensp;&ensp;`label: "Précédent",`  
&ensp;&ensp;`disabled: true,`  
&ensp;&ensp;`hidden: true`  
`}`  
_Next_ button properties.
___
:black_medium_small_square: <ins>__skipTime__</ins>&ensp;&ensp;{Number} or {String}  
Default : `"1%"`  
Value in seconds or percent of the total duration for the time skip aplied when left or right arrow are pressed.
___
:black_medium_small_square: <ins>__thumbnails__</ins>&ensp;&ensp;{Object}  
Default :  
`{`   
&ensp;&ensp;`src: undefined,`  
&ensp;&ensp;`number: 100,`  
`}`  
Defines the source of the image used for the preview thumbnails and the number of thumbnails included.
___
:black_medium_small_square: <ins>__volume__</ins>&ensp;&ensp;{Number}  
Default : `0.8`  
Volume of the video.
___
:black_medium_small_square: <ins>__fullscreen__</ins>&ensp;&ensp;{Object}  
Default :  
`{`   
&ensp;&ensp;`label:`   
&ensp;&ensp;&ensp;&ensp;`{`  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`mute: "Désactiver le son",`  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`exit: "Activer le son",`  
&ensp;&ensp;&ensp;&ensp;`},`   
&ensp;&ensp;`disabled: false,`  
&ensp;&ensp;`hidden: false`  
`}`  
_Volume_ button properties.
___
:black_medium_small_square: <ins>__volumeGroup__</ins>&ensp;&ensp;{Integer}  
Default : `0`  
More details here.
___
___
___

__:small_orange_diamond: The following options can be set either by overiding the default options or when creating the instance :__
___
:black_medium_small_square: <ins>__hideControlsDelay__</ins>&ensp;&ensp;{Integer}  
Default : `5000`  
Delay in ms between any interaction with the UI and the hidding of the controls.
___
:black_medium_small_square: <ins>__videoVolumeOrientation__</ins>&ensp;&ensp;{String} `"horizontal"` | `"vertical"`  
Default : `"vertical"`  
If `"horizontal"`, the volume slider is horizontally displayed. In all other cases, the slider is vertical.
___
:black_medium_small_square: <ins>__railMinWidthForNormalUI__</ins>&ensp;&ensp;{Integer}  
Default : `600`  
Minimal width in pixels available for the time slider in the normal UI. If the available space is inferior to this number, the compact UI is displayed.
___
___
___

__:small_orange_diamond: The following options can be set by overiding the default options :__
___
:black_medium_small_square: <ins>__appLabel__</ins>&ensp;&ensp;{String}  
Default : `"Lecteur vidéo"`  
Text affected to the player `aria-label`.  
___
:black_medium_small_square: <ins>__pauseLabel__</ins>&ensp;&ensp;{String}  
Default : `"Lecture"`  
Text affected to the `title` and the `aria-label` of the button _Pause_.  
___
:black_medium_small_square: <ins>__playLabel__</ins>&ensp;&ensp;{String}  
Default : `"Pause"`  
Text affected to the `title` and the `aria-label` of the button _Play_.  
___
:black_medium_small_square: <ins>__volumeHelpLabel__</ins>&ensp;&ensp;{String}  
Default : `"Utilisez les flèches Haut/Bas du clavier pour augmenter ou diminuer le volume"`  
Text affected to the volume slider `title`.  
___
:black_medium_small_square: <ins>__volumeSliderLabel__</ins>&ensp;&ensp;{String}  
Default : `"Potentiomètre de volume"`  
Text affected to the volume slider `aria-label`.  
___
___
___

## API

### Setters
#### src(`source`)
`source` is either a string pointing to the video file source, either an object of the form :  
{  
&ensp;&ensp;src: _string_ pointing to the video file source - __required__,  
&ensp;&ensp;and any of the options listed above  
}
#### currentTime(`time`)
@param `time` {Number} - set the playback head position to the specified value, expressed in seconds. 
#### volume(`vol`)
@param `vol` {Number between 0 and 1} - set the volume. 

### Getters
####  src()  
{String}  
return the source of the video file.
#### currentTime()
{Number}  
return the current playback head position in seconds.
#### duration()
{Number}  
return the duration of the video in seconds.
#### paused()
{Boolean}  
return `true` if the video is paused, false if it's playing.
#### volume()
{Number}  
return the current volume of the video. 0 is muted, 1 is max.
### Methods
#### pause()
Do what you may expect...
#### play()
Do what you may expect...
#### togglePlayPause()
Do what you may expect...
#### reset()
* Pauses the video.  
* Stores the current picture in a canvas and displays it as a poster.  
* Set the `src` attribute to `""`.  
* Set the `preload` attribute to `"none"`.  
* Restore the `src` attribute to its original value.

Used internally if the instance is playing and another one starts to play.  
Provided just in case...
#### hideControls(`delayed` = `false`, `forced` = `false`)
Do what you may expect...  
However... If `delayed` is set to `true`, the controls are hidden after a delay equal to the value given by the player option `hideControlsDelay`.  
By default, the function is without effect if the video is paused (controls remains visible). But if you absolutly need to hide them while the video is paused, you can pass the second argument to `true`.
#### showControls()
Do what you may expect...  
#### previous(`opt`)
Set the _previous_ button properties.  
`opt` is an object of the form :  
{  
&ensp;&ensp;`label: {String},`  _<span style="color:green;font-size:0.9em;">// passed to the title attribute of the button.</span>_  
&ensp;&ensp;`hidden: {Boolean},`  _<span style="color:green;font-size:0.9em;">// if true, the button is hidden.</span>_  
&ensp;&ensp;`disabled: {Boolean},`  _<span style="color:green;font-size:0.9em;">// if true, the button is disabled (opacity to 0.5; click without effect).</span>_  
}
#### next(`opt`)
Set the _next_ button properties.  
See _previous_ method above.
#### download(`opt`)
Set the download button properties.  
See _previous_ method above.
#### fullscreen(`opt`)
Set the fullscreen button properties.  
`opt` is an object of the form :  
{  
&ensp;&ensp;`{label:`  
&ensp;&ensp;&ensp;&ensp;`{`  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`enter: {String},` _<span style="color:green;font-size:0.9em;">// passed to the title attribute of the button when fullscreen mode is off.</span>_  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`exit: {String},` _<span style="color:green;font-size:0.9em;">// passed to the title attribute of the button when fullscreen mode is on.</span>_   
&ensp;&ensp;&ensp;&ensp;`}`  
&ensp;&ensp;`hidden: {Boolean},` _<span style="color:green;font-size:0.9em;">// if true, the button is hidden.</span>_  
&ensp;&ensp;`disabled: {Boolean},`  _<span style="color:green;font-size:0.9em;">// if true, the button is disabled (opacity to 0.5; click without effect).</span>_  
}
#### volumeButton(`opt`)
Set the volume button properties.  
`opt` is an object of the form :  
{  
&ensp;&ensp;`{label:`  
&ensp;&ensp;&ensp;&ensp;`{`  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`mute: {String},` _<span style="color:green;font-size:0.9em;">// passed to the title attribute of the button when volume is > 0.</span>_  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`exit: {String},` _<span style="color:green;font-size:0.9em;">// passed to the title attribute of the button when audio is muted.</span>_   
&ensp;&ensp;&ensp;&ensp;`}`  
&ensp;&ensp;`hidden: {Boolean},` _<span style="color:green;font-size:0.9em;">// if true, the button is hidden.</span>_  
&ensp;&ensp;`disabled: {Boolean},`  _<span style="color:green;font-size:0.9em;">// if true, the button is disabled (opacity to 0.5; click without effect).</span>_  
}
