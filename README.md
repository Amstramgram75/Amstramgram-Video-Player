<h1 align="center">Work in progress...</h1>

[![GitHub Release](https://img.shields.io/badge/release-v1.0.0-orange)](https://github.com/Amstramgram75/Amstramgram-Video-Player/releases/tag/v1.0.0)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](https://github.com/Amstramgram75/Amstramgram-Video-Player/blob/master/LICENSE)
[![dependency Status](https://david-dm.org/Amstramgram75/Amstramgram-Video-Player/status.svg)](https://david-dm.org/Amstramgram75/Amstramgram-Video-Player)
[![devDependency Status](https://david-dm.org/Amstramgram75/Amstramgram-Video-Player/dev-status.svg)](https://david-dm.org/Amstramgram75/Amstramgram-Video-Player?type=dev)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/Amstramgram75)

Simple, elegant, ligthweight although powerfull and versatile HTML5 video player.

[Demo page](https://amstramgram75.github.io/Amstramgram-Video-Player/)

## Table of contents
* [Features](#features)
* [Installation](#installation)
* [Importing](#importing)
* [Usage](#usage)
* [Customization](#customization)
* [API](#api)
* [Compatibility](#compatibility)
* [Thanks](#thanks)
* [Donation](#donation)
* [Credits](#credits)
* [License](#license)

## Features

* Written in pure JavaScript, no dependencies required
* Touch-devices support
* Two UI modes : normal / compact
* Preview thumbnails support
* SVG buttons included in css, no extra files to download
* Previous, play/pause, next, fullscreen, download buttons
* All buttons titles configurables
* Display of current time and total duration
* __Sass__ so you can include in your build processes
* Around 13.15 Ko gzipped (js + css)

__BUT no subtitles, Youtube or Vimeo support.__
___

## Installation

You can use one of the following methods :

#### npm
```sh
npm -i -d amstramgramvideoplayer
```
#### Manually
1. Download `amstramgramVideoPlayer.min.css` from the `dist/css` folder and `amstramgramVideoPlayer.min.js` from the `dist/iife` folder.
2. Include them somewhere in your document :
  ```html
<link rel="stylesheet" href="css/amstramgramVideoPlayer.min.css">
<script src="js/amstramgramVideoPlayer.min.js"></script>
  ```
___
## Importing
#### Traditional approach

If you don't use JavaScript modules and include the file with a `<script>` tag, you don't have to import anything explicitly. `AmstramgramVideoPlayer` will be available in the global scope.

#### CommonJS

```js
const AmstramgramVideoPlayer = require('amstramgramVideoPlayer');
```

#### ES2015 modules

```js
import AmstramgramVideoPlayer from 'amstramgramVideoPlayer';
```

#### Sass

```scss
@import 'amstramgramVideoPlayer/css/amstramgramVideoPlayer.min.scss';
```
___
## Usage

Initialize the script by running :

```js
new AmstramgramVideoPlayer(document.querySelector('video'))
```
___
## Customization

Before you create an instance, you can override the class default options :
```js
AmstramgramVideoPlayer.options({
  // Custom options
});
```
When creating an instance, you can pass an object with custom options as the second parameter.

```js
new AmstramgramVideoPlayer(document.querySelector('video'),{
  // Custom options
});
```
When setting the source, you can pass a simple string giving the video file path or an object including the source path and several others options as duration, poster, thumbnails and so on...
```js
const player = new AmstramgramVideoPlayer(document.querySelector('video'));
player.src = {
  src: 'video file path',
  duration: 'duration of the video',
  poster: 'poster path',
  thumbnails: 'thumbnails path',
  ...
}
```
___
__:small_orange_diamond: <span id="options0">The following options can be set either by overriding the default options, when creating the instance or when updating the source :<span>__  
___
:black_medium_small_square: __autoplay__&ensp;&ensp;{Boolean}  
Default : `false`  
If `true`, the attribute `autoplay` is added to the `<video>` tag.<br>
__*Please be aware that most of the browsers block this functionality if volume is not muted.*__  
___
:black_medium_small_square: __crossorigin__&ensp;&ensp;{String} `"anonymous"` | `"use-credentials"`  
Default : `"anonymous"`  
Value of the attribute `crossorigin` for the `<video>` tag.
___
:black_medium_small_square: __download__&ensp;&ensp;{Object}  
Default :  
`{`   
&ensp;&ensp;`label: "Télécharger",`  
&ensp;&ensp;`disabled: false,`  
&ensp;&ensp;`hidden: false`  
`}`  
_Donwload_ button properties.
___
:black_medium_small_square: __duration__&ensp;&ensp;{Integer}  
Default : 120  
Video duration in __seconds__.  
Updated on `loadedmetadata` event.
___
:black_medium_small_square: __format__&ensp;&ensp;{Number}  
Default : 16/9  
Video format ratio.  
Updated on `loadedmetadata` event.
___
:black_medium_small_square: __fullscreen__&ensp;&ensp;{Object}  
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
:black_medium_small_square: __loop__&ensp;&ensp;{Boolean}   
Default : `false`  
Attribute added to the `<video>` tag.
___
:black_medium_small_square: __next__&ensp;&ensp;{Object}  
Default :  
`{`   
&ensp;&ensp;`label: "Suivant",`  
&ensp;&ensp;`disabled: true,`  
&ensp;&ensp;`hidden: true`  
`}`  
_Next_ button properties.
___
:black_medium_small_square: __playsinline__&ensp;&ensp;{Boolean}   
Default : `true`  
When `true`, the attributes [playsinline](https://webkit.org/blog/6784/new-video-policies-for-ios/ "New <video> Policies for iOS") and [webkit-playsinline](https://webkit.org/blog/6784/new-video-policies-for-ios/ "New <video> Policies for iOS") are added to the `<video>` tag.
___
:black_medium_small_square: __poster__&ensp;&ensp;{String}   
Default : `undefined`  
Path of the image used as poster.
___
:black_medium_small_square: __preload__&ensp;&ensp;{String} `"auto"` | `"metadata"` | `"none"` | `"preload"`  
Default : `"none"`  
Value of the attribute `preload` for the `<video>` tag.
___
:black_medium_small_square: __previous__&ensp;&ensp;{Object}  
Default :  
`{`   
&ensp;&ensp;`label: "Précédent",`  
&ensp;&ensp;`disabled: true,`  
&ensp;&ensp;`hidden: true`  
`}`  
_Next_ button properties.
___
:black_medium_small_square: __skipTime__&ensp;&ensp;{Number} or {String}  
Default : `"1%"`  
Value in seconds or percent of the total duration for the time skip aplied when left or right arrows are pressed.
___
:black_medium_small_square: __thumbnails__&ensp;&ensp;{Object}  
Default :  
`{`   
&ensp;&ensp;`src: undefined,`  
&ensp;&ensp;`number: 100,`  
`}`  
`src` is a string defining the path of the image used for the preview thumbnails and `number` gives the number of thumbnails included.  
This number makes it possible to deduce the width of a thumbnail from the natural width property of the image. Then, the height is simply deduce from the video ratio.  
___
:black_medium_small_square: __volume__&ensp;&ensp;{Number}  
Default : `0.8` on desktop, `1` on mobile and tablet.  
Volume of the video.
___
:black_medium_small_square: __volumeButton__&ensp;&ensp;{Object}  
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
:black_medium_small_square: __volumeGroup__&ensp;&ensp;{Integer}  
Default : `0`  
More details here.
___
___
___

__:small_orange_diamond: The following options can be set either by overriding the default options or when creating the instance :__
___
:black_medium_small_square: __hideControlsDelay__&ensp;&ensp;{Integer}  
Default : `5000`  
Delay in ms between any interaction with the UI and the hidding of the controls.
___
:black_medium_small_square: __videoVolumeOrientation__&ensp;&ensp;{String} `"horizontal"` | `"vertical"`  
Default : `"vertical"`  
If `"horizontal"`, the volume slider is horizontally displayed. In all other cases, the slider is vertical.
___
:black_medium_small_square: __railMinWidthForNormalUI__&ensp;&ensp;{Integer}  
Default : `600`  
Minimal width in pixels available for the time slider in the normal UI. If the available space is inferior to this number, the compact UI is displayed.
___
___
___

__:small_orange_diamond: The following options can be set by overriding the default options :__
___
:black_medium_small_square: __appLabel__&ensp;&ensp;{String}  
Default : `"Lecteur vidéo"`  
Text given to the player `aria-label`.  
___
:black_medium_small_square: __pauseLabel__&ensp;&ensp;{String}  
Default : `"Lecture"`  
Text given to the `title` and the `aria-label` of the _Pause_ button.  
___
:black_medium_small_square: __playLabel__&ensp;&ensp;{String}  
Default : `"Pause"`  
Text given to the `title` and the `aria-label` of the _Play_ button.  
___
:black_medium_small_square: __volumeHelpLabel__&ensp;&ensp;{String}  
Default : `"Utilisez les flèches Haut/Bas du clavier pour augmenter ou diminuer le volume"`  
Text given to the volume slider `title`.  
___
:black_medium_small_square: __volumeSliderLabel__&ensp;&ensp;{String}  
Default : `"Potentiomètre de volume"`  
Text given to the volume slider `aria-label`.  
___
___
___

__:small_orange_diamond: The following option can be set when creating the instance :__
___
:black_medium_small_square: __onInit__&ensp;&ensp;{function}  
Function called when the instance is initialised.  
___
___
___

__:small_orange_diamond: Some options can be set directly in the `video` tag :__
___
autoplay, crossorigin, height, loop, muted, src, playsinline, poster, preload, width.
```html
<video src="the video path" autoplay loop muted poster="the poster path"></video>
```
If specified, the attributes `width` an `height` are used to calculate the video ratio.
Those options are overrided by the options set when initialising the instance.
___
___
___

## API
___
### Setters
#### src = `source`
`source` is either a string pointing to the video file source, either an object of the form :  
{  
&ensp;&ensp;src: {String}, giving the video file path - __required__,  
&ensp;&ensp;and any of the options listed [above](#options0)  
}
___
#### currentTime = `time`
`time` {Number}  
Set the playback head position to the specified value, expressed in seconds. 
___
#### volume = `vol`
`vol` {Number between 0 and 1}  
Set the volume. 
___
___
### Getters
####  src 
{String}  
return the video file path.
___
#### currentTime
{Number}  
return the current playback head position in seconds.
___
#### duration
{Number}  
return the video duration in seconds.
___
#### media
{HTMLVideoElement}  
return the HTML `video` element of the player.
___
#### paused
{Boolean}  
return `true` if the video is paused, `false` if it's playing.
___
#### volume
{Number}  
return the current volume of the video. 0 is muted, 1 is max.
___
___
### Methods
#### pause()
Do what you may expect...
___
#### play()
Do what you may expect...
___
#### togglePlayPause()
Do what you may expect...
___
#### reset()
* Pauses the video.  
* Stores the current picture in a canvas and displays it as a poster.  
* Set the `src` attribute to `""`.  
* Set the `preload` attribute to `"none"`.  
* Finally restores the `src` attribute to its original value.

Used internally if the instance is playing and another one starts to play.  
Provided just in case...
___
#### hideControls(`delayed` = `false`, `forced` = `false`)
Do what you may expect...  
However... If `delayed` is set to `true`, the controls are hidden after a delay equal to the value given by the player option `hideControlsDelay`.  
By default, the function is without effect if the video is paused (controls remains visible). But if you absolutly need to hide them while the video is paused, pass the second argument to `true`.
___
#### showControls()
Do what you may expect...  
___
#### previous(`opt`)
Set the _previous_ button properties.  
`opt` is an object of the form :  
{  
&ensp;&ensp;`label: {String},`  _// passed to the title attribute of the button._  
&ensp;&ensp;`hidden: {Boolean},`  _// if true, the button is hidden._  
&ensp;&ensp;`disabled: {Boolean},`  _// if true, the button is disabled (opacity to 0.5; click without effect)._  
}
___
#### next(`opt`)
Set the _next_ button properties.  
See _previous()_ method above.
___
#### download(`opt`)
Set the _download_ button properties.  
See _previous()_ method above.
___
#### fullscreen(`opt`)
Set the _fullscreen_ button properties.  
`opt` is an object of the form :  
{  
&ensp;&ensp;`{label:`  
&ensp;&ensp;&ensp;&ensp;`{`  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`enter: {String},` _// passed to the title attribute of the button when fullscreen mode is off._  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`exit: {String},` _// passed to the title attribute of the button when fullscreen mode is on._   
&ensp;&ensp;&ensp;&ensp;`}`  
&ensp;&ensp;`hidden: {Boolean},` _// if true, the button is hidden._  
&ensp;&ensp;`disabled: {Boolean},`  _// if true, the button is disabled (opacity to 0.5; click without effect)._  
}
___
#### volumeButton(`opt`)
Set the _volume_ button properties.  
`opt` is an object of the form :  
{  
&ensp;&ensp;`{label:`  
&ensp;&ensp;&ensp;&ensp;`{`  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`mute: {String},` _// passed to the title attribute of the button when volume is > 0._  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;`exit: {String},` _// passed to the title attribute of the button when audio is muted._   
&ensp;&ensp;&ensp;&ensp;`}`  
&ensp;&ensp;`hidden: {Boolean},` _// if true, the button is hidden._  
&ensp;&ensp;`disabled: {Boolean},`  _// if true, the button is disabled (opacity to 0.5; click without effect)._  
}
___
___
### Global properties
#### AmstramgramVideoPlayer.currentPlayer
Return the playing instance if there is one.
Return `undefined` if no instance is playing,
___
#### AmstramgramVideoPlayer.players
Return an array ot all the created instances.
___
___
### Events
You can access to all media events by the _media_ getter of the instance.
```js
const player = new AmstramgramVideoPlayer(document.querySelector('video'));
player.media.addEventListener('play', function(){
    console.log('Media is playing')
  }
);
```
#### on("previous", callback)
`callback` is a function called when a click event occurs on the _Previous_ button
```js
new AmstramgramVideoPlayer(document.querySelector('video'),{
  onInit: function(){
    this.on('previous', function(){
        console.log('Click event on Previous button')
      }
    );
  }
});
```
___
#### on("next", callback)
`callback` is a function called when a click event occurs on the _Next_ button
```js
const player = new AmstramgramVideoPlayer(document.querySelector('video'));
player.on('next', function(){
    console.log('Click detected on Next button')
  }
);
```
___
___
___
## Compatibility
All modern browers on desktop, Android and iOS are supported.  
__Internet Explorer 11__ needs some polyfills (what a surprise !) :
* [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill)
* [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill)
* [Array.prototype.includes](https://tc39.github.io/ecma262/#sec-array.prototype.includes)
* [window.CustomEvent](//https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill)

If you have absolutly no idea about how to polyfill, copy the `amstramgramVideoPlayerPolyfill.min.js` file (from any `dist` folders) to your javascript directory and simply add those lines to the `HEAD` section of your `HTML` page :
```js
<script>
  if (typeof Object.assign !== 'function' || !Array.from || !Array.prototype.includes || typeof window.CustomEvent !== "function") {
    var d = document,
        s = d.createElement('script');
    s.async = "false";
    s.src = "<path to amstramgramVideoPlayerPolyfill.min.js>";
    d.head.appendChild(s);
  } 
</script>
```
Thus, the polyfill file will only be downloaded if needed...
___
## Thanks
[![Browserstack Logo](https://live.browserstack.com/images/opensource/browserstack-logo.svg|width=192 height=42)](https://www.browserstack.com/)
Thanks to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows me to test in real browsers !
___
## Donation
If you find this project useful and want to say thanks, you can buy me a cup of coffee, a beer, a computer, a sofa, a haunted manor or whatever you want...  
...:blush:...

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)]((https://paypal.me/Amstramgram75))
___
## Credits
I've been mainly inspired by [mediaelement.js](https://www.mediaelementjs.com/), a pionneer in the long and difficult attempt to harmonise media players in `HTML5`.  
Alternatively, I've also used [plyr.js](https://plyr.io/).  
There is plenty of libraries of this kind. Most of them offer Flash fallback and Youtube, Vimeo and others integration. In turn, they are quite heavy...  
This one is focused on lightweight.  
The long term project is to extend it to audio.  
So, stay tune !
___
## License
Copyright (c) 2019 [Amstramgram](https://github.com/Amstramgram75)  
This content is released under the MIT License.