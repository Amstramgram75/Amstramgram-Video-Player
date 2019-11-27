import '../css/amstramgramVideoPlayer.scss'
/*TODO :
  Menu contextuel
  Tuto thumnails
  Test paramètres
*/

/*  
  AmstramgramVideoPlayer.players : tableau des players
  AmstramgramVideoPlayer.currentPlayer : player en cours de lecture
  AmstramgramVideoPlayer.currentFullScreenPlayer : player en mode plein écran
  AmstramgramVideoPlayer.defaultOptions :
    PROPRIÉTÉS PROPRES À LA SOURCE
    - autoplay : si true, l'attribut autoplay est posé sur le tag <video>.
      À noter que la lecture automatique sera bloquée si le volume n'est pas nul.
      Défaut : false.
    - crossorigin : attribut posé sur le tag <video>.
      Défaut : false.
    - download : propriétés du bouton Download.
        - label :     texte affecté au titre du bouton et à son attribut aria-label
                      Défaut : "Télécharger".
        - disabled :  si true, le bouton porte l'attribut disabled et demeure donc inactif.
                      Défaut : false.         
        - hidden :    si true, la propriété display du bouton est passée en 'hidden' et le bouton est donc invisible.
                      Défaut : false.         
      Défaut : {label:'Télécharger', disabled:false, hidden:false}.
    - duration :  durée de la vidéo exprimée en seconde.
      Ce paramètre est mis à jour sur les événement loadedmetadata et durationchange de la vidéo.
      Défaut : 120.
    - format : format de la vidéo exprimée sous la forme d'un rapport (16/9, 4/3, etc.) ou d'un nombre.
      Défaut : 16/9.
    - fullscreen : propriétés du bouton Fullscreen.
        - label : 
          - enter : texte affecté au titre du bouton et à son attribut aria-label en mode normal
                    Défaut : "Plein écran".
          - exit :  texte affecté au titre du bouton et à son attribut aria-label en mode plein écran
                    Défaut : "Quitter le plein écran".
        - disabled :  si true, le bouton porte l'attribut disabled et demeure donc inactif.
                      Défaut : false.         
        - hidden :    si true, la propriété display du bouton est passée en 'hidden' et le bouton est donc invisible.
                      Défaut : false.         
      Défaut :{label:{enter:'Plein écran', exit:'Quitter le plein écran'}, disabled:false, hidden:false}.
    - loop : si true, l'attribut loop est posé sur le tag <video>.
      Défaut : false.
    - next : propriétés du bouton Next.
        - label :     texte affecté au titre du bouton et à son attribut aria-label.
                      Défaut : "Suivant".
        - disabled :  si true, le bouton porte l'attribut disabled et demeure donc inactif.
                      Défaut : true.         
        - hidden :    si true, la propriété display du bouton est passée en 'hidden' et le bouton est donc invisible.
                      Défaut : true.         
      Défaut : {label:'Suivant', disabled:true, hidden:true},
    - playsinline : si true, les attributs playsinline et webkit-playsinline sont posés sur le tag <video>.
      Défaut : true.
    - poster : source de l'image à afficher en poster.
      Défaut : undefined.
    - preload : attribut posé sur le tag <video>.
      Défaut : 'none'.
    - previous : propriétés du bouton Previous.
        - label :     texte affecté au titre du bouton et à son attribut aria-label.
                      Défaut : "Précédent".
        - disabled :  si true, le bouton porte l'attribut disabled et demeure donc inactif.
                      Défaut : true.         
        - hidden :    si true, la propriété display du bouton est passée en 'hidden' et le bouton est donc invisible.
                      Défaut : true.         
      Défaut : {label:'Précédent', disabled:true, hidden:true}.
    - skipTime: valeur attribuée au saut temporel réalisée par les flèches gauche et droite du clavier.
      Elle s'exprime en secondes ou en pourcentage. Dans ce cas, la valeur résultante correspond à ce pourcentage appliqué à la durée du média.
      Défaut : '1%'.
    - thumbnails: Propriétés des vignettes.
        - src :     source de l'image.
                    L'image doit être constituée d'une seule bande de vignettes.
                    Défaut : undefined.
        - number :  nombre de vignettes.
                    Ce nombre permet de déterminer la largeur d'une vignette = largeur de l'image / nombre de vignettes.
                    Défaut : 100.
      Défaut : {src:undefined, number:100}.
    - volume :  volume à appliquer au média.
                Doit être un nombre compris entre 0 et 1.
      Défaut : 0.8.
    - volumeButton : propriétés du bouton Volume.
        - label : 
          - mute :  texte affecté au titre du bouton et à son attribut aria-label si le volume est supérieur à 0.
                    Défaut : "Désactiver le son".
          - exit :  texte affecté au titre du bouton et à son attribut aria-label si le volume est nul.
                    Défaut : "Activer le son".
        - disabled :  si true, le bouton porte l'attribut disabled et demeure donc inactif.
                      Dans ce cas, le potentiomètre est caché.
                      Défaut : false.         
        - hidden :    si true, la propriété display du bouton est passée en 'hidden' et le bouton est donc invisible.
                      Dans ce cas, le potentiomètre est caché.
                      Défaut : false.         
      Défaut : {label:{mute:'Désactiver le son', unmute:'Activer le son'}, disabled:false, hidden:false}.
    - volumeGroup : Nombre entier supérieur à zéro spécifiant le groupe de lecteurs qui partagent le même volume.
                    Tout changement de volume intervenant sur un des lecteurs de ce groupe sera effectué sur les autres lecteurs du même groupe.
      Défaut : 0 (Le lecteur n'appartient à aucun groupe).
    PROPRIÉTÉS PROPRES AU LECTEUR
    - hideControlsDelay : Exprimée en ms, durée du délai intervenant avant de cacher la barre de contrôle.
      Défaut : 5000.
    - videoVolumeOrientation : si ce paramètre n'est pas défini par la chaine 'horizontal', le potentiomètre de volume est en mode vertical.
      Défaut : 'vertical'.
    - railMinWidthForNormalUI : largeur minimale disponible pour la barre temporelle dans l'interface normale.
      Si la largeur disponible pour la barre temporelle est inférieure à ce paramètre, l'interface bascule en mode compact.
      Défaut : 600.
    PROPRIÉTES GLOBALES
    - appLabel : texte à appliquer à l'aria-label du lecteur.
      Défaut : 'Lecteur vidéo'.
    - pauseLabel : texte affecté au titre du bouton Pause et à son attribut aria-label.
      Défaut : 'Pause'.
    - playLabel : texte affecté au titre du bouton Pause et à son attribut aria-label.
      Défaut : 'Lecture'.
    - volumeHelpLabel : texte à appliquer au titre du potentiomètre.
      Défaut : 'Utilisez les flèches Haut/Bas du clavier pour augmenter ou diminuer le volume'.
    - volumeSliderLabel : texte à appliquer à l'aria-label du potentiomètre.
      Défaut : 'Potentiomètre de volume'.
  
  Les options autoplay, crossorigin, loop, playsinline, poster peuvent être attribuées via les attributs HTML du tag <video>.
  Si, par ailleurs, le tag comporte des attributs width et height, le format de la vidéo sera déterminé par ces valeurs.
  S'il comporte l'attribut muted, le volume sera interprété comme nul.
  Les paramètres passés au constructeur priment sur les attributs HTML.
  Les paramètres listés sous le titre "PROPRIÉTÉS PROPRES À LA SOURCE" peuvent toutes être redéfinies lors du changement de source.
  Le constructeur intègre de surcroit une propriété facultative volumeForced. Si celle-ci est spécifiée à true, le volume passé en paramètre sera
  appliqué au lecteur et à son groupe éventuel. Dans les autres cas, si le lecteur appartient à un groupe déjà existant,
  c'est le volume de ce groupe qui lui sera appliqué.
  Cette propriété est également applicable au changement de source.

  EXEMPLES
  1.
    HTML : 
      <video id="myvideo" src="myvideo.mp4" poster="myvideo.jpg" preload="auto">
    Javascript :
      let player = new AmstramgramVideoPlayer(document.querySelector('#myvideo'))
  2.
    HTML : 
      <video id="myvideo">
    Javascript :
      let player = new AmstramgramVideoPlayer(document.querySelector('#myvideo'), {
        autoplay: true,
        duration: 125,
        format: 4/3,
        next: {label:'La vidéo suivante', disabled:false, hidden:false}
        preload: 'auto',
        previous: {label: 'Rien à voir', hidden:false}
        skipTime: '2%',
        src: 'myvideo.mp4',
        volume: 0,
        volumeGroup: 1,
        videoVolumeOrientation: 'horizontal',
      })
      Et plus tard :
      player.src = {
        format: 16/9,
        duration: 850,
        next: {label:'Plus rien', disabled:true}
        poster: 'myvideo2.jpg',
        preload: 'none',
        previous: {label:'Revoir la vidéo précédente', disabled:false}
        skipTime: '5%',
        src: 'myvideo2.mp4',
        volume: 0.5,
        volumeForced: true
      }

  GETTERs/SETTERs
    - src
        - get : retourne la source du média
        - set : définit une nouvelle source et éventuellement un certain nombre de propriétés
          Prend en paramètre une chaine définissant le chemin de la source ou un objet : {
              autoplay: false,
              crossorigin: 'anoanymous',
              download: {label:'Télécharger', disabled:false, hidden:false},
              duration:  200,
              format : 16/9,
              fullscreen: {label:{enter:'Plein écran', exit:'Quitter le plein écran'}, disabled:false, hidden:false},
              loop: false,
              next: {label:'Suivant', disabled:true, hidden:true},
              playsinline: true, 
              poster: 'source du poster',
              preload: 'none',
              previous: {label:'Précédent', disabled:true, hidden:true},
              skipTime: '1%',
              thumbnails: {src:'source de l'image', number:100},
              volume: 0.8,
              volumeButton: {label:{mute:'Désactiver le son', unmute:'Activer le son'}, disabled:false, hidden:false},
              volumeGroup: 0,
              (volumeForced: true,)
          }
    - currentTime
        - get : retourne la position temporelle courante.
        - set : améne la tête de lecture à la position spécifiée en secondes.
    - volume
        - get : retourne le niveau de volume.
        - set : fixe le volume au niveau spécifié (nombre entre 0 et 1).

  GETTERS
    - duration : retourne la durée du média si elle est disponible.
    - paused : retroune true si le média est en pause

  MÉTHODES
    - play() : met le média en lecture.
    - pause() : met le média en pause.
    - reset() : reset le lecteur.
    - togglePlayPause() : passe le média en pause s'il est en lecture et réciproquement.
    - hideControls(delayed = false, forced = false) : cache la barre de contôle
        Si delayed vaut true, la disparition n'intervient qu'apres le délai fixé par le paramètre hideControlsDelay du lecteur.
        Par défaut, la disparition est bloquée si la vidéo est en pause.
        Pour la forcer, il faut passer le deuxième argument à true.
    - showControls : montre la barre de contrôle.
    - previous() : affecte de nouvelles propriétés au bouton Previous.
        Prend en paramètre un objet de la forme : {label:'Précédent', disabled:true, hidden:true}.
    - next() : affecte de nouvelles propriétés au bouton Next.
        Prend en paramètre un objet de la forme : {label:'Suivant', disabled:true, hidden:true}.
    - download() : affecte de nouvelles propriétés au bouton Download.
        Prend en paramètre un objet de la forme : {label:'Télécharger', disabled:false, hidden:false}.
    - fullscreen() : affecte de nouvelles propriétés au bouton Fullscreen.
        Prend en paramètre un objet de la forme : {label:{enter:'Plein écran', exit:'Quitter le plein écran'}, disabled:false, hidden:false}.
    - volumeButton() : affecte de nouvelles propriétés au bouton Volume.
        Prend en paramètre un objet de la forme : {label:{mute:'Désactiver le son', unmute:'Activer le son'}, disabled:false, hidden:false}.
  
  MÉTHODE STATIQUE
    options() : permet de redéfinir les propriétés par défaut de la class avant toute création d'instance.

  PROPRIÉTÉS
    - container : pointe sur l'élément HTML container du lecteur.
    - media : pointe sur l'élément HTML <video> du lecteur.
    - params : renvoie les paramètres du lecteur.
*/

/************************************************
 *                                              *
 *              INITIALISATION                  *
 *                                              *
 ************************************************/
const 
  w = window, 
  d = document,
  //Définition du type de pointeur
  //Si PointerEvent est détecté, le type vaut 'pointer'
  //Sinon, si TouchEvent est détecté, le type vaut 'touch' et il y a fort à parier qu'on soit sur iOS
  //Enfin, si jamais PointerEvent et TouchEvent ne sont pas détectés, le type vaut 'mouse'
  myPointerType = (w.PointerEvent)?'pointer':(w.TouchEvent)?'touch':'mouse',
  //On en déduit le nom des évènements correspondants
  myPointerEnter = (myPointerType == 'touch')?'none':myPointerType + 'enter',
  myPointerLeave = (myPointerType == 'touch')?'none':myPointerType + 'leave',
  myPointerDown = (myPointerType == 'touch')?'touchstart':myPointerType + 'down',
  myPointerUp = (myPointerType == 'touch')?'touchend':myPointerType + 'up',
  myPointerMove = myPointerType + 'move',
  //Détection de l'user agent pour savoir si on est sur mobile
  //Dans ce cas, on ne crée pas de potentiomètre de volume
  UA = w.navigator.userAgent.toLowerCase(),
  IS_MOBILE = (/ipad|iphone|ipod/i.test(UA) && !w.MSStream) || /android/i.test(UA)

//Edge ne comprend toujours pas getAttributeNames (IE11 non plus, bien évidemment)
if (Element.prototype.getAttributeNames == undefined) {
  Element.prototype.getAttributeNames = function () {
    var a = this.attributes, l = a.length, r = new Array(l);
    for (var i = 0; i < l; i++) {
      r[i] = a[i].name
    }
    return r
  };
}
//Détection du support de la fonctionnalité sessionStorage
const storage = (function(){
  try {
      let x = '__storage_test__'
      w.sessionStorage.setItem(x, x)
      w.sessionStorage.removeItem(x)
      return w.sessionStorage
  }
  catch(e) {return false}
})()
/*
Si sessionStorage est disponible, on y stocke toutes les fonctionnalités détectés
afin de ne plus avoir de détection à opérer par la suite.
On y conserve également les informations de volume pour chaque groupe de lecteurs

Calcul de la largeur des éléments indicateurs temporel.
Ces largeurs dépendent du navigateur et doivent être déterminées
pour assurer le bon positionnement des éléments.
On mesure les largeurs pour des temps :
- inférieur à une heure (durée affichée : 00:00)
- supérieur ou égal à une heure (durée affichée : 00:00:00)
*/
let timeWidth, longTimeWidth
if (storage && storage.getItem('amst_timeWidth')) {
  timeWidth = storage.getItem('amst_timeWidth')
  longTimeWidth = storage.getItem('amst_longTimeWidth')
} else {
  const 
    measureTime = d.createElement('div'), 
    measureLongTime = d.createElement('div')
  //La class amst__measureTime reprend les mêmes propriétés graphiques que la class amst__time
  //mais assure un positionnement absolu.
  measureTime.classList.add('amst__measureTime')
  measureTime.innerHTML = '<span>00:00<span>'
  measureLongTime.classList.add('amst__measureTime')
  measureLongTime.innerHTML = '<span>00:00:00<span>'
  d.body.appendChild(measureTime)
  d.body.appendChild(measureLongTime)
  timeWidth = measureTime.offsetWidth + 2
  longTimeWidth = measureLongTime.offsetWidth + 2
  d.body.removeChild(measureTime);
  d.body.removeChild(measureLongTime);
  if (storage) {
    storage.setItem('amst_timeWidth', timeWidth)
    storage.setItem('amst_longTimeWidth', longTimeWidth)
  }
}
//Insertion des règles déterminées dans le DOM
const style = d.createElement("style")
// WebKit hack
style.appendChild(d.createTextNode(""))
d.head.appendChild(style)
style.sheet.insertRule(`.amst__time>span{width:${timeWidth}px;`,0)
style.sheet.insertRule(`.amst__long .amst__time>span{width:${longTimeWidth}px;`,0)


//Détection de la fonctionnalité fullscreen et de ses éventuels préfixes
let fullscreenAPI = false
if (storage && storage.getItem('amst_fullscreenAPI') != undefined) {
  fullscreenAPI = JSON.parse(storage.getItem('amst_fullscreenAPI'))
} else {
  //https://github.com/sindresorhus/screenfull.js/
  //Détection des préfixes pour la gestion du plein écran
  fullscreenAPI = (function(){
    let 
      val,
      fnMap = [
        ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenchange'],
        // New WebKit
        ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitfullscreenchange'],
        // Old WebKit (Safari 5.1)
        ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitfullscreenchange'],
        ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozfullscreenchange'],
        ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'MSFullscreenChange']
      ],
      i = 0,
      l = fnMap.length,
      ret = {}
    for (; i < l; i++) {
      val = fnMap[i]
      if (val && val[1] in d) {
        for (i = 0; i < val.length; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret
      }
    }
    return false;
  })()
  storage.setItem('amst_fullscreenAPI', JSON.stringify(fullscreenAPI))
}

/*
PRÉFIXES CSS
Définition des préfixes propres aux navigateurs
pour les propriétés transform et transition
afin de pouvoir les ajuster dans javascript
https://gist.github.com/streunerlein/2935794
*/
let transitionPrefix, transformPrefix
if (storage && storage.getItem('amst_transitionPrefix') != undefined && storage.getItem('amst_transformPrefix') != undefined) {
  transitionPrefix = storage.getItem('amst_transitionPrefix')
  transformPrefix = storage.getItem('amst_transformPrefix')
} else {
  let GetVendorPrefix = function(arrayOfPrefixes) {
    let tmp = d.createElement("div"),
        result = ''
    for (let i = 0; i < arrayOfPrefixes.length; ++i) {
      if (typeof tmp.style[arrayOfPrefixes[i]] != 'undefined'){
        result = arrayOfPrefixes[i]
        break;
      }
      else {
        result = null
      }
    }
    return result;
  }
  transitionPrefix = GetVendorPrefix(["transition", "msTransition", "MozTransition", "WebkitTransition", "OTransition"])
  transformPrefix = GetVendorPrefix(["transform", "msTransform", "MozTransform", "WebkitTransform", "OTransform"])
  storage.setItem('amst_transitionPrefix', transitionPrefix)
  storage.setItem('amst_transformPrefix', transformPrefix)
}
  

/*DÉTECTECTION DES ECRANS TACTILES
//https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent#Event_order
Pour rappel, la séquence des évènements sur une surface tactile se présente comme suit :
  - touchstart
  - Zero or more touchmove events, depending on movement of the finger(s)
  - touchend
  - mousemove
  - mousedown
  - mouseup
  - click.
Donc, sur une surface tactile, touchstart sera déclenché avant mousemove
et si l'on détecte un mousemove, c'est bel et bien que l'on n'est pas sur tactile.

Par défaut, l'interface graphique est orientée touchDevice.
Si l'on constate que l'on est sur le dispositif de pointage n'est pas tactile,
on applique au container principal une class no-touch.
Cette class assure la prise en charge de la pseudo-class css :hover.
Par ailleurs, elle opère une réduction de moitié des hauteurs de la barre temporelle 
et du potentiomètre de volume (s'il est en mode horizontal)
lorsque ces éléments ne sont pas survolés par le pointeur.
Dans cette configuration, le survol de la barre de lecture affiche la position temporelle
et l'éventuelle vignette correspondant à la position du pointeur au dessus de cette barre.
Dans la configuration tactile, c'est le slide horizontal qui assure cette fonctionnalité :
l'information temporelle et la vignette sont alors affichées dans la partie supérieure de la vidéo.

On déclare donc une variable _pointerType et on lui affecte la valeur 'unknown'.
On pose un premier écouteur pour détecter un éventuel déplacement du pointeur
et un second sur l'évènement touchstart.
Si on détecte un touchstart, on donne la valeur 'touch' à la variable _pointerType.
Si on détecte un déplacement, on passe la valeur 'mouse' à _pointerType..
Aussitôt la détection effectuée, on stoppe les deux écouteurs initialement posés
et on transmet l'information aux éventuelles instances créées entretemps
*/  
let _pointerType = 'unknown'
if (storage && storage.getItem('amst_pointerType')) {
  _pointerType = storage.getItem('amst_pointerType')
} else{
  const
    testPointerMove = function(e){
      _pointerType = (e.pointerType)?e.pointerType:'mouse'
      cleanTestPointer()
    },
    testTouchStart = function(){
      _pointerType = 'touch'
      cleanTestPointer()
    },
    cleanTestPointer = function(){
      storage.setItem('amst_pointerType', _pointerType)
      w.removeEventListener(myPointerMove, testPointerMove)
      w.removeEventListener('touchstart', testTouchStart)
      if (AmstramgramVideoPlayer.players.length > 0) {
        AmstramgramVideoPlayer.players.forEach(p=>p.container.dispatchEvent(new CustomEvent('pointerDetected')))
      }
    }
  w.addEventListener(myPointerMove, testPointerMove, false)
}

//Détection du support de l'option passive sur les events
//https://github.com/WICG/EventListenerOptions/blob/gh-pages/EventListenerOptions.polyfill.js
let _supportPassiveEvents = false
if (storage && storage.getItem('amst_supportPassiveEvents')) {
  _supportPassiveEvents = storage.getItem('amst_supportPassiveEvents')
} else{
  d.createElement("div").addEventListener("test", ()=>{}, {
    get passive() {
      _supportPassiveEvents = true
      storage.setItem('amst_supportPassiveEvents', _supportPassiveEvents)
      return false
    }
  })
}


/************************************************
 *                                              *
 *                 DÉBUT CLASS                  *
 *                                              *
 ************************************************/
class AmstramgramVideoPlayer {
  /*Fonction statique permettant de redéfinir les options par défaut 
    Usage : 
      AmstramgramVideoPlayer.options({volume:0})
      let player = new AmstramgramVideoPlayer(document.querySelector('video'))
  */
  static options(obj){
    if (AmstramgramVideoPlayer.players.length == 0) AmstramgramVideoPlayer.defaultOptions = mergeDeep(AmstramgramVideoPlayer.defaultOptions, obj)
  }

  constructor(el, params) {
/************************************************
 *                                              *
 *               RÉCUPÉRATION ET                *
 *          TRAITEMENT DES PARAMÈTRES           *
 *                                              *
 ************************************************/
    /*
      Récupération des attributs HTML éventuels de l'élément. 
      On ne retient que ceux qui nous intéressent, à savoir :
      - autoplay
      - crossorigin
      - loop
      - muted
      - playsinline
      - poster
      - preload
      - src


    AmstramgramVideoPlayer.defaultOptions = {
      autoplay: false,
      crossorigin: 'anonymous',
      download: {label:'Télécharger', disabled:false, hidden:false},
      duration: 120,
      format: 16/9,
      fullscreen: {label:{enter:'Plein écran', exit:'Quitter le plein écran'}, disabled:false, hidden:false},
      loop: false,
      next: {label:'Suivant', disabled:true, hidden:true},
      playsinline: true,
      poster: undefined,
      preload: 'none',
      previous: {label:'Précédent', disabled:true, hidden:true},
      skipTime: '1%',
      thumbnails: {src:undefined, number:100},
      volume: 0.8,
      volumeButton: {label:{mute:'Désactiver le son', unmute:'Activer le son'}, disabled:false, hidden:false},
      //Players properties
      volumeGroup: 0,
      hideControlsDelay: 5000,
      videoVolumeOrientation: 'vertical',
      railMinWidthForNormalUI: 600,
      //Global properties
      appLabel:'Lecteur Vidéo',
      pauseLabel:'Pause',
      playLabel:'Lecture',
      volumeHelpLabel:'Utilisez les flèches Haut/Bas du clavier pour augmenter ou diminuer le volume.',
      volumeSliderLabel:'Potentiomètre de volume',
    }
  */

    //booleanAttributes = attributs de valeur vide. S'ils sont présents, le paramètre correspondant est passé à true.
    //La propriété muted si elle est présente sera convertie en volume = 0
    //Les 3 autres seront appliquées à l'élément construit
    const booleanAttributes = ['autoplay', 'loop', 'muted', 'playsinline']
    //Les autres attributs à récupérer :
    let attributes = booleanAttributes.concat(['crossorigin', 'poster', 'preload', 'src'])
    //https://davidwalsh.name/javascript-attributes#comment-511786
    this.params = el.getAttributeNames().reduce((obj, name)=>{
      if (attributes.includes(name)) {
        //si l'attribut traité nous intéresse, on passe sa valeur au paramètre qui lui correspond.
        obj[name] = booleanAttributes.includes(name)?true:el.getAttribute(name)
      }
      return obj;
    }, {})
    //Conversion de muted en volume nul
    if (this.params.muted) {
      this.params.volume = 0
      delete this.params.muted
    }
    //Si les attributs width et height sont présents et ont un sens,
    //on en déduit le format
    if (parseInt(el.getAttribute('width')) > 0 && parseInt(el.getAttribute('height')) > 0) {
      this.params.format = parseInt(el.getAttribute('width')) / parseInt(el.getAttribute('height'))
    }
    //On supprime muted de la liste des attributs à traiter
    //On rajoute les propriétés susceptibles d'être passées lors de la création de l'instance
    attributes = attributes.filter(param=>{return param != 'muted'}).concat(['download', 'duration', 'format', 'fullscreen', 'hideControlsDelay', 'next', 'onInit', 'previous', 'skipTime', 'thumbnails', 'videoVolumeOrientation', 'volume', 'volumeButton', 'volumeForced', 'volumeGroup', 'railMinWidthForNormalUI'])
    //Si des paramètres ont été passés à l'instance, ils priment sur ceux qui sont définis par les attributs.
    //On élimine toute propriété qui n'aurait rien à faire là en ne retenant que celles qui sont listées dans le tableau attributes
    if (params) 
      params = Object
        .keys(params)
        .filter(key=>attributes.includes(key))
        .reduce((res, key)=>(res[key] = params[key], res), {})
    //On merge les paramètres de l'instance avec ceux de la page HTML
    if (params) this.params = mergeDeep(this.params, params)
    this.params = mergeDeep(AmstramgramVideoPlayer.defaultOptions, this.params)
/************************************************
 *                                              *
 *             FIN RÉCUPÉRATION ET              *
 *          TRAITEMENT DES PARAMÈTRES           *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *             CONSTRUCTION HTML                *
 *                                              *
 ************************************************/
    const 
      wrapper = d.createElement('div'),//Élément wrapper renfermant tous les éléments HTML du lecteur
      //Si le paramètre d'orientation du potentiometre de volume est défini autrement que par la chaine 'horizontal', 
      //on fixe sa valeur à 'vertical'
      videoVolumeOrientation = (this.params.videoVolumeOrientation=='horizontal')?'horizontal':'vertical',
      passive = _supportPassiveEvents

    //Construction des éléments HTML de l'UI en fonction des paramètres
    wrapper.classList.add('amst__wrapper')  
    wrapper.classList.add('amst__video')  
    wrapper.innerHTML = buildUI(this.params)
    //Insertion du wrapper dans le DOM
    el.parentNode.insertBefore(wrapper, el)
    //Pour éviter tout problème sous Androïd, on reset la source de l'élément original
    //avant de le supprimer
    el.removeAttribute('src')
    el.parentNode.removeChild(el)
    
/************************************************
 *                                              *
 *             FIN CONSTRUCTION HTML            *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *          DÉCLARATIONS DES VARIABLES          *
 *                                              *
 ************************************************/
    //Constantes
    const 
      self = this,
      $ = _$(wrapper),//Définition de la fonction $ : $('video') renvoie le premier élément HTML video contenu dans le wrapper
      $$ = _$$(wrapper),//Définition de la fonction $$ : $$('.amst__layer') renvoie un tableau des éléments portant la classe amst__layer
      media = this.media = $('video'),
      container = this.container = $('.amst__container'),
      layerPoster =  $('.amst__layer-poster'),
      layerPosterCanvas =  $('.amst__layer-poster canvas'),
      layerSeekingTouch = $('.amst__layer-seeking-touch'),
      seekingTouch = $('.amst__seeking-touch'),
      layerPlay = $('.amst__layer-play'),
      layerLoading = $('.amst__layer-loading'),
      controls = $('.amst__controls'),
      controlsPadding = 2 * controls.css('padding-left'),
      playPauseButton = $('.amst__playpause>button'),
      rail = $('.amst__rail'),
      slider = $('.amst__slider'),
      handle = $('.amst__handle'),
      timeCurrent = $('.amst__currenttime-bar'),
      seeking = $('.amst__seeking'),
      volumeButton = $('.amst__volumebutton button'),
      volumeSlider = $('.amst__volume-slider')

      
    //Variables
    let //Largeur du lecteur actualisée sur l'évènement resize 
        //et nécessaire pour positionner la vignette de preview sur tactile
        playerWidth,
        //Position et dimensions de l'élément volume recalculées lors d'un évènement resize ou scroll
        volumeRect,
        //Abscisse et largeur de l'élément slider recalculées lors d'un évènement resize ou scroll
        sliderLeft, sliderWidth,
        //Largeur cumulée des éléments visibles dans la barre de contrôle à l'exclusion du slider
        //dont on peut déduire la largeur disponible pour le slider.
        //LargeurDisponible = playerWidth - controlsElementsWidth - controlsPadding
        //Si cette valeur est inférieure à celle donnée par l'option railMinWidthForNormalUI,
        //on bascule vers l'interface réduite.
        controlsElementsWidth,
        timeoutGetControlsElementsWidth,
        //Animation de la barre temporelle
        updateTimeRailAnimation,
        //Variable mise à jour sur l'évènement durationchange au cas où l'option skipTime ait été donnée en pourcentage.
        //Elle retient la valeur du skip à effectuer exprimée en secondes
        skipTime,
        //Enregistre la position temporelle courante de la vidéo arrondie à la seconde inférieure.
        //Le cas échéant, permet de relancer la lecture de la vidéo à l'endroit où elle a été
        //stoppée par le lancement d'un autre lecteur.
        floorCurrentTime = 0,
        //Variable mise à jour sur l'événement timeupdate
        //Provoque un reset de l'animation de la barre temporelle 
        //si elle diffère de plus d'une demi seconde de la position temporelle effective
        prevCurrentTime = 0,
        //Variable enregistrant la présence du pointeur sur les contrôles.
        //Si true, on bloque la disparition de la barre de contrôle.
        pointerOverControls = false,
        //Stocke le buffer du média
        //Si on détecte une différence entre buffered et media.buffered
        //on reconstruit les zones rectangulaires qui mettent en évidence les parties chargées dans la barre temporelle.
        buffered,
        //Variable passée à true sur les événements seeking, waiting et loadeddata.
        //Si true, on bloque la disparition de la barre de contrôle.
        //Retourne à false sur les événements play, playing, seeked et canplay
        isBuffering = false,
        //setTimeout contrôlant la disparition de la barre de contrôle
        hideControlsTimeOut,
        //Largeur de l'élément seeking = $('.amst__seeking'), actualisée au premier mouvement de la souris sur la barre temporelle
        //Necessaire pour positionner l'élément ainsi que son background
        seekingWidth,
        //Largeur de l'élément seekingTouch = $('.amst__seeking-touch'), actualisée au premier swipe horizontal sur la vidéo
        //Necessaire pous positionner l'élément ainsi que son background
        seekingTouchWidth,
        //Largeur de la vignette déterminée après le chargement de l'image spécifiée 
        //en divisant la largeur de cette image par le nombre de vignettes déclaré en paramètre
        thumbWidth = 0,
        volumeBeforeMute
    //Objet stockant les écouteurs posés sur l'événement click des boutons previous et next
    //via la méthode on.
    this.events = {'next':[], 'previous':[]}


/************************************************
 *                                              *
 *          FIN INSERTION DANS LE DOM           *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                     PLAY                     *
 *                                              *
 ************************************************/
    //Fonction déclenchée par l'évènement 'amstEvent__play' généré par la méthode publique play()
    function _play(){
      //https://developers.google.com/web/updates/2016/03/play-returns-promise
      let playPromise = media.play()
      if (playPromise) playPromise.catch(()=>{
        //We try again
        setTimeout(()=>{
          playPromise = media.play()
          playPromise.catch(()=>_pause())
        }, 50)
      })
      //Si une autre instance est en cours de lecture, on la reset
      if (AmstramgramVideoPlayer.currentPlayer && AmstramgramVideoPlayer.currentPlayer != self) AmstramgramVideoPlayer.currentPlayer.reset()
      //On déclare l'instance comme lecteur courant
      AmstramgramVideoPlayer.currentPlayer = self
      container.focus()
      //Mise à jour du bouton
      playPauseButton.setAttributes({
        class: 'amst__pause',
        title: self.params.pauseLabel,
        'aria-label': self.params.pauseLabel
      })
      //On cache le layer comprenant le gros bouton play
      layerPlay.classList.add('amst__hidden')
      //On programme la disparition de la barre de controle
      if (!pointerOverControls) _hideControls({detail:{delayed:true}})
    }
    //On écoute l'évènement 'amstEvent__play' généré par la méthode play()
    container.on('amstEvent__play', _play, false)
/************************************************
 *                                              *
 *                  FIN PLAY                    *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                    PAUSE                     *
 *                                              *
 ************************************************/
    //Fonction déclenchée par l'évènement 'amstEvent__pause' généré par la méthode publique pause()
   function _pause(){
      media.pause()
      //Mise à jour du bouton
      playPauseButton.setAttributes({
        class: '',
        title: self.params.playLabel,
        'aria-label': self.params.playLabel
      })
      //On affiche le layer comprenant le gros bouton play
      layerPlay.classList.remove('amst__hidden')
      //On affiche la barre de contrôle.
      _showControls()
      container.focus()
    }
    //On écoute le custom event 'amstEvent__pause' généré par la méthode pause()
    container.on('amstEvent__pause', _pause, false)
/************************************************
 *                                              *
 *                  FIN PAUSE                   *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                    RESET                     *
 *                                              *
 ************************************************/
    function _reset(){
      /*La fonction est appelée si une autre instance passe en lecture
      et que le présent lecteur avait auparavant été lancé.
      Elle assure le reset complet de la source et le passage de preload en none
      de manière à éviter tout problème avec les dispositifs qui limitent le nombre
      de préchargements de videos sur une même page (Androïd entre autres).
      Pour simuler une pause, on enregistre l'image courante de la vidéo
      et on l'affiche dans un canvas à la place du poster.
      */
      //Dimensionnement du canvas
      layerPosterCanvas.width = media.videoWidth
      layerPosterCanvas.height = media.videoHeight
      //Copie de l'image dans le canvas
      layerPosterCanvas.getContext('2d').drawImage(media, 0, 0, layerPosterCanvas.width, layerPosterCanvas.height)
      //On affiche le layer-poster. Le poster qui constitue le background est caché par le canvas.
      layerPoster.classList.remove('amst__hidden')
      //On reset le lecteur
      container.classList.remove('amst__loadedmetadata')
      media.src = ''
      media.preload = 'none'
      media.src = self.params.src
    }
    //On écoute l'évènement 'amstEvent__' généré par la méthode reset()
    container.on('amstEvent__reset', _reset, false)
/************************************************
 *                                              *
 *                  FIN RESET                   *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                HIDECONTROLS                  *
 *                                              *
 ************************************************/
    /*Fonction déclenchée par le custom event 'amstEvent__hideControls' généré par la méthode publique hideControls()
    @param {e} Custom Event
    event.detail : 
      - delayed (boolean) - default false
      - forced (boolean) - default false
    Passé à true, delayed programme la disparition de la barre de controle 
    après un temps défini par l'option hideControlsDelay.
    Passé à true, forced force la disparition de la barre de controle 
    alors même que la vidéo est en pause.
    Il est uniquement employé sur les écrans tactiles lors du swipe horizontal 
    qui fait fonction de recherche.
    La disparition avec délai se réalise via un bête setTimeout qui relance la fonction
    elle même.
    */
    function _hideControls(e){
      let delayed = e?e.detail.delayed:false,
          forced = e?e.detail.forced:false
      if (media.paused && !forced) {
        //La barre de contrôle reste systématiquement visible
        //à moins d'être sur tactile et que l'utilisateur opère un swipe horizontal
        //pour se déplacer dans le temps.
        return
      } else if (delayed || isBuffering || pointerOverControls) {
        //Si le paramètre delayed vaut true ou qu'un buffering est en cours
        //ou que le pointeur est positionné sur la barre de contrôle :
        //on annule l'éventuel timeout en cours et on en lance un nouveau
        if (hideControlsTimeOut) clearTimeout(hideControlsTimeOut)
        hideControlsTimeOut = setTimeout(()=>_hideControls(), self.params.hideControlsDelay)
      } else {
        //Sinon, on cache...
        container.focus()
        controls.style[transformPrefix] = 'translateX(-50%) scaleY(0)'
      }
    }
    //On écoute le custom event 'amstEvent__hideControls' généré par la méthode hideControls()
    container.on('amstEvent__hideControls', _hideControls, false)
/************************************************
 *                                              *
 *              FIN HIDECONTROLS                *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                SHOWCONTROLS                  *
 *                                              *
 ************************************************/
    function _showControls(){
      //On annule l'éventuelle programmation en cours
      if (hideControlsTimeOut) clearTimeout(hideControlsTimeOut)
      controls.style[transformPrefix] = ''
      //Si la vidéo est en lecture, on programme la disparition de la barre
      if (!media.paused) _hideControls({detail:{delayed:true}})
    }
    //On écoute l'évènement 'amstEvent__showControls' généré par la méthode showControls()
    container.on('amstEvent__showControls', _showControls, false)
/************************************************
 *                                              *
 *              FIN SHOWCONTROLS                *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                UPDATEBUTTONS                 *
 *    MAJ PREVIOUS/NEXT/DOWNLOAD/FULLSCREEN     *
 *                                              *
 ************************************************/
    /*
    Mise en place des écouteurs d'événements click sur les boutons previous et next.
    L'événement déclenche les écouteurs posés via la méthode on.
    */
    $('.amst__next').on('click', function(){
      [...self.events['next']].forEach(listener => listener.bind(this));
    })
    $('.amst__previous').on('click', function(){
      [...self.events['previous']].forEach(listener => listener.bind(this));
    })
    /*
    Chacun des boutons next, previous, download, volume et fullscreen peut être désactivé ou caché.
    Par ailleurs, les boutons next, previous et download disposent d'un label configurable.
    Les boutons fullscreen et volumeButton disposent eux de deux labels configurables
    pour accompagner leur changement d'état éventuel (mute et unmute pour volumeButton, in et out pour fullscreen).
    Les fonctions publiques previous(), next(), download(), fullscreen() et volumeButton() génèrent
    chacunes un événement dédié qui déclenchent respectivement les fonctions 
    _previous(), _next(), _download(), _fullscreen() et _volumeButton(),
    lesquelles assurent la mise à jour du bouton ciblé.
    On prévoit deux variables pour les titres associés au bouton fullscreen
    afin de pouvoir le mettre à jour lors des entrées/sorties du mode plein écran
    */
    let enterFullScreenLabel, exitFullScreenLabel
    //On déclare une fonction getMovie pour réagir au click éventuel sur le bouton download.
    //L'écouteur n'est placé que si le bouton porte en option les paramètres disabled:false et hidden:false.
    //Dans les autres cas, il est retiré.
    function getMovie(){
      window.location = self.src.substring(0, self.src.lastIndexOf('/')) + '/index.php?file=' + self.src.substring(self.src.lastIndexOf('/') + 1)
    }
    $('.amst__next').on('click', function(){
      [...self.events['next']].forEach(listener => listener.apply(this));
    })
    $('.amst__previous').on('click', function(){
      [...self.events['previous']].forEach(listener => listener.apply(this));
    })
    /*
    Mise à jour des class et attributs du bouton
    name : nom du bouton
    label : label du bouton
    */
    function updateButtonsAttributes(name, label){
      const lowerCaseName = name.toLowerCase(),//pour volumeButton
            buttonContainer = $(`.amst__${lowerCaseName}`), 
            button = $(`.amst__${lowerCaseName} > button`)
      //Mise à jour de l'attribut HTML disabled en fonction de l'option disabled.
      if (self.params[name].disabled === true) {
        button.setAttribute('disabled','')
      } else {
        button.removeAttribute('disabled')
      }
      //Mise à jour de la class en fonction de l'option hidden.
      if (self.params[name].hidden === true) {
        buttonContainer.classList.add('amst__hidden')
      } else {
        buttonContainer.classList.remove('amst__hidden')
      }
      //On cache le potentiométre si le bouton de volume est disabled ou hidden.
      if (name == 'volumeButton' && volumeSlider) {
        if (self.params.volumeButton.disabled === true || self.params.volumeButton.hidden === true) {
          volumeSlider.classList.add('amst__hidden')
        } else {
          volumeSlider.classList.remove('amst__hidden')
        }
      }

      //Mis à jour du label
      button.setAttributes({
        title: label,
        'aria-label': label
      })
      getControlsElementsWidth()
    }
    function updateAllButtons(){//Fonction appelée lors de la mise à jour de la source
      _previous()
      _next()
      _download()
      _volumeButton()
      if (fullscreenAPI) _fullscreen()
    }
    function _previous(){
      updateButtonsAttributes('previous', self.params.previous.label)
    }
    function _next(){
      updateButtonsAttributes('next', self.params.next.label)
    }
    function _download() {
      if (self.params.download.disabled === false && self.params.download.hidden === false) {
        //On pose l'écouteur
        $('.amst__download>button').on('click', getMovie, false)
      } else {
        //On retire l'écouteur
        $('.amst__download>button').off('click', getMovie)
      }
      updateButtonsAttributes('download', self.params.download.label)
    }
    function _fullscreen(){
      enterFullScreenLabel = self.params.fullscreen.label.enter
      exitFullScreenLabel = self.params.fullscreen.label.exit
      updateButtonsAttributes('fullscreen', (AmstramgramVideoPlayer.currentFullScreenPlayer==self)?exitFullScreenLabel:enterFullScreenLabel)
    }
    function _volumeButton(){
      updateButtonsAttributes('volumeButton', (self.volume==0)?self.params.volumeButton.label.unmute:self.params.volumeButton.label.mute)
    }
    //On écoute les événements générés par les setters previous, next, download et fullscreen
    container.on('amstEvent__previousButton', _previous, false)
    container.on('amstEvent__nextButton', _next, false)
    container.on('amstEvent__fullscreenButton', _fullscreen, false)
    container.on('amstEvent__downloadButton', _download, false)
    container.on('amstEvent__volumeButton', _volumeButton, false)
/************************************************
 *                                              *
 *             FIN UPDATEBUTTONS                *
 *    MAJ PREVIOUS/NEXT/DOWNLOAD/FULLSCREEN     *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                    SOURCE                    *
 *                                              *
 ************************************************/
    function _src(e) {
      let mySrc = e.detail
      //Le cas échéant, on transforme  le paramètre passé au setter en objet
      mySrc = (typeof mySrc === 'object')?mySrc:{src:mySrc}
      // if (isNaN(mySrc.volumeGroup)) mySrc.volumeGroup = self.params.volumeGroup
      if (!isNaN(mySrc.volume) && (mySrc.volumeForced === true || !storage.getItem(`amst_volumegroup${mySrc.volumeGroup}`))) {
        //Si un volume a été spécifié et que 
        //l'option volumeForced est présente ou que le volumeGroup ne figure pas dans sessionStorage
        self.params.volume = mySrc.volume
        storage.setItem(`amst_volumegroup${mySrc.volumeGroup}`, mySrc.volume)
      } else if (storage.getItem(`amst_volumegroup${mySrc.volumeGroup}`)) {
        self.params.volume = storage.getItem(`amst_volumegroup${mySrc.volumeGroup}`)
      }
      //On ne conserve dans mySrc que les propriétés relevantes. 
      const srcValidParameters = ['autoplay', 'crossorigin', 'download', 'duration', 'format', 'fullscreen', 'loop', 'next', 'playsinline', 'poster', 'preload', 'previous', 'src', 'skipTime', 'thumbnails', 'volumeButton', 'volumeGroup']
      mySrc = srcValidParameters.reduce((obj, name)=>{
        if (srcValidParameters.includes(name) && mySrc[name] != undefined) {
          obj[name] = mySrc[name]
        }
        return obj;
      }, {})
      //S'il s'agit d'un changement de source
      if (media.getAttribute('src')) {
        container.classList.add('amst_container_transition')
        //On reset le player
        self.media.pause()
        prevCurrentTime = 0
        floorCurrentTime = 0
        buffered = undefined
        //On supprime l'ensemble des attributs HTML présents dans le tag <video>
        while (media.attributes.length > 0) media.removeAttribute(media.attributes[0].name)
        //Reset des paramètres autoplay, crossorigin, loop, playsinline, thumnails
        const arr = ['autoplay', 'crossorigin', 'loop', 'playsinline', 'thumbnails']
        arr.forEach(p=>self.params[p] = AmstramgramVideoPlayer.defaultOptions[p])
        //Reset des class sur le container
        container.classList.remove('amst__thumbnails','amst__loadedmetadata')
        //Reset des vignettes
        thumbWidth = 0
        seekingWidth = undefined
        seeking.removeAttribute('style')
        seekingTouchWidth = undefined
        seekingTouch.removeAttribute('style')
        //Mise à jour des paramètres de l'instance.
        self.params = mergeDeep(self.params, mySrc)
      }
      //Le cas échéant, on charge l'image contenant les vignettes
      if (self.params.thumbnails.src) {
        let thumb = new Image()
        const thumbEvent = function(e){
          thumb.removeEventListener('load', thumbEvent)
          thumb.removeEventListener('error', thumbEvent)
          if (e.type == 'load') {
            //Si la source de l'image est valide
            container.classList.add('amst__thumbnails')
            //On détermine la largeur des vignettes
            thumbWidth = thumb.naturalWidth/self.params.thumbnails.number
            //On applique le style résultant aux éléments seeking et et seekingTouch
            let css = {width: `${thumb.naturalWidth/self.params.thumbnails.number}px`, height: `${thumb.naturalHeight}px`, 'background-image':`url("${self.params.thumbnails.src}")`}
            seeking.css(css)
            seekingTouch.css(css)
          } else {
            self.params.thumbnails.src = undefined
          }
        }
        thumb.addEventListener('error', thumbEvent, false)
        thumb.addEventListener('load', thumbEvent, false)
        thumb.src = self.params.thumbnails.src
      }
      //Initialisation/Mise à jour des attributs du tag video
      let attributes = {
        src: self.params.src,
        preload: (IS_MOBILE)?'none':self.params.preload
      }
      if (self.params.playsinline === true) {
        attributes.playsinline = '',
        attributes['webkit-playsinline'] = ''
      }
      if (self.params.loop === true) {
        attributes.loop = ''
      }
      if (self.params.crossorigin) {
        attributes.crossorigin = self.params.crossorigin
      }
      media.setAttributes(attributes)
      //Initialisation/Mise à jour du volume
      self.volume = (IS_MOBILE && self.params.volume > 0)?1:self.params.volume
      if (!volumeBeforeMute) {
        volumeBeforeMute = (media.volume == 0)?0.1:media.volume
        if (IS_MOBILE) volumeBeforeMute = 1
      }
      //Initialisation/Mise à jour du format
      container.style.paddingBottom = 1 / self.params.format * 100 + '%'
      //Initialisation/Mise à jour du poster
      if (self.params.poster) {
        layerPoster.style.backgroundImage = `url("${self.params.poster}")`
        layerPoster.classList.remove('amst__hidden')
      }
      //Initialisation/Mise à jour des informations temporelles
      $('.amst__duration').innerHTML = secondsToTimeCode(self.params.duration)
      $('.amst__currenttime').innerHTML = secondsToTimeCode(0, (self.params.duration > 3600));
      //Mise à jour des boutons
      updateAllButtons()
      //Si autoplay, on lance la lecture
      if (self.params.autoplay === true) {
        _play()
      }
    }
    //On écoute le custom event 'amstEvent__src' généré par la méthode src()
    container.on('amstEvent__src', _src, false)
    //Initialisation de la source
    _src({detail:this.params})
/************************************************
 *                                              *
 *                  FIN SOURCE                  *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *               ÉVÈNEMENTS MEDIA               *
 *                                              *
 ************************************************/
    media
      .on('mousemove', ()=>_showControls(), passive?{passive:true}:false)
      .on('loadedmetadata', ()=>{
        let myFormat = this.params.format = media.videoWidth / media.videoHeight
        //Actualisation de la taille du container en fonction du format réel de la vidéo
        if (AmstramgramVideoPlayer.currentFullScreenPlayer == self) {
          w.dispatchEvent(new CustomEvent('optimizedResize'))
        } else {
          container.style.paddingBottom = 1 / myFormat * 100 + '%'
        }
        container.classList.add('amst__loadedmetadata')
        //Si le lecteur a été reseté du fait du lancement d'un autre lecteur
        //on replace la tête de lecture au temps où elle s'était arrétée
        media.currentTime = floorCurrentTime
      })
      .on('loadeddata', ()=>{
        //Pour iOS sur reset du player
        media.currentTime = floorCurrentTime
      })
      .on('durationchange', ()=>{
        this.params.duration = media.duration
        //Mise à jour de skipTime
        skipTime = (typeof(this.params.skipTime)=='string' && this.params.skipTime.slice(-1)=='%')?parseFloat(this.params.skipTime) * media.duration / 100:parseFloat(this.params.skipTime)
        //Mise à jour des champs indicateurs de temps
        if (media.duration >= 3600) {//Si la durée du media est supérieure à 1 heure
          //La classe amst__long augmente la largeur des containers indicateurs de temps
          container.classList.add('amst__long')
        } else {
          container.classList.remove('amst__long')
        }
        slider.setAttribute('aria-valuemax', media.duration)
        $('.amst__duration').innerHTML = secondsToTimeCode(media.duration)
        $('.amst__currenttime').innerHTML = secondsToTimeCode(floorCurrentTime, (media.duration > 3600))
        //On reprend une mesure des contrôles au cas où le container ait gagné ou perdu la class amst__long 
        getControlsElementsWidth()
      })
      .on('progress', updateBuffer)//Mise à jour du canvas indicateur de buffering
      .on('timeupdate', ()=>{
        //L'évènement est aussi déclenché lorsqu'on reset la source du media,
        //ce qui se produit au reset du player effectué suite au lancement de la lecture d'un autre player.
        //Dans ce cas, la propriété duration du media n'est pas définie.
        if (isNaN(media.duration)) return
        updateBuffer()//Mise à jour du canvas indicateur de buffering
        slider.setAttribute('aria-valuenow', media.currentTime)
        let mediaFloorCurrentTime = Math.floor(media.currentTime)
        if (floorCurrentTime != mediaFloorCurrentTime) {
          //On n'actualise le champs indicateur du temps courant que si nécessaire
          //c'est à dire si l'arrondi à la seconde du temps courant diffère de celui qu'on a précédemment pris soin d'enregistrer
          floorCurrentTime = mediaFloorCurrentTime
          let time = secondsToTimeCode(floorCurrentTime, (media.duration > 3600))
          $('.amst__currenttime').innerHTML = time
          slider.setAttribute('aria-valuetext', time)
        }
        if (prevCurrentTime == 0 || Math.abs(media.currentTime - prevCurrentTime) > 0.5) {
          cancelAnimationFrame(updateTimeRailAnimation)
          updateTimeRail()
        }
        prevCurrentTime = media.currentTime
      })
      .on('ended', ()=>{
        media.currentTime = 0
        this.pause()
      })
      .on('pause', ()=>cancelAnimationFrame(updateTimeRailAnimation))
      .on('playing', ()=>{
        //On force la fonction updateTimeRail en passant prevCurrentTime à 0.
        prevCurrentTime = 0
        layerPoster.classList.add('amst__hidden')
      })
      .on('seeked', ()=>{
        //L'évènement est ausssi déclenché à la suite de l'évènement ended.
        //Dans ce cas, currentTime vaut 0, la vidéo est en pause et on affiche le poster
        if (floorCurrentTime == 0 && this.paused) {
          layerPosterCanvas.width = 0
          layerPosterCanvas.height = 0
          layerPoster.classList.remove('amst__hidden')
        }
      })
      .on('play playing seeked canplay', ()=>{
        isBuffering = false
        container.classList.remove('amst__buffering')
      })
      .on('seeking waiting loadeddata', ()=>{
        isBuffering = true
        container.classList.add('amst__buffering')
      })
/************************************************
 *                                              *
 *             FIN ÉVÈNEMENTS MEDIA             *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                 UPDATEBUFFER                 *
 *                                              *
 ************************************************/
    //Initialisation du canvas indicateur de buffering
    const loadedBar = $('.amst__loaded-bar'),
          loadedBarHeight = loadedBar.offsetHeight
    let ctxLoadedBar = loadedBar.getContext('2d')
    loadedBar.height = loadedBarHeight
    ctxLoadedBar.fillStyle = loadedBar.css('color')
    //Mise à jour du canvas indicateur de buffering appelée sur les évènements progress et timeupdate
    function updateBuffer(){
      //Comparaison de deux objets TimeRanges
      function compareTimeRanges(t1, t2){
        if (!t1 || !t2 || t1.length != t2.length) {
          //Si l'un des objets n'existe pas ou si leurs longueurs diffèrent, on renvoie false
          return false
        } else {
          for (let i = 0; i < t1.length; i++) {
            //Comparaison de chacun des éléments contenus dans les TimeRanges
            //Si on trouve une différence, on arrete et on renvoie false
            if (t1.start(i) != t2.start(i) || t1.end(i) != t2.end(i)) {
              i = t1.length
              return false
            }
          }
        }
        return true
      }
      //Si le timeRanges renvoyé par la propriété buffered du média est différent de celui déjà enregistré
      //On actualise le canvas indicateur de buffering
      if (!compareTimeRanges(media.buffered, buffered)) {
        ctxLoadedBar.clearRect(0, 0, loadedBar.width, loadedBar.height)
        let inc = loadedBar.width / media.duration
        for (let i = 0; i < media.buffered.length; i++) {
          let start = media.buffered.start(i) * inc,
              width = (media.buffered.end(i) * inc) - start
          new AmstRoundedRect(ctxLoadedBar, loadedBarHeight, start, width)
        }
        buffered = media.buffered
      }
    }
/************************************************
 *                                              *
 *              FIN UPDATEBUFFER                *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *               UPDATETIMERAIL                 *
 *                                              *
 ************************************************/
    //On fixe le scaleX de timeCurrent à la valeur correspondant au ratio : currentTime/duration
    //Pour handle, on réalise l'opération équivalente en jouant sur la valeur de son translateX.
    //Si le media est en lecture, on réitère l'opération via un requestAnimationFrame
    //On enregistre le rayon de handle
    let handleRadius = 0.5 * handle.offsetWidth
    function updateTimeRail(){
      let trans = (media.paused && !media.seeking)?'all .15s ease-in':'none',
          t = media.currentTime,
          T = media.duration,
          //Si la source change, media.duration risque de ne pas être définie.
          //Dans ce cas, ratio vaut 0
          ratio = isNaN(T)?0:(t / T).toFixed(4),
          translate = (ratio * sliderWidth) - handleRadius
      translate = Math.max(translate, 0)
      translate = Math.min(translate, sliderWidth - 2 * handleRadius) + 'px'
      if (media.paused) {
        //Mise à jour de timeCurrent
        timeCurrent.css({[transitionPrefix]:trans, [transformPrefix]:`scaleX(${ratio})`})
        //Mise à jour de handle
        handle.css({[transitionPrefix]:trans, [transformPrefix]:`translateX(${translate})`})
      } else {
        //Mise à jour de timeCurrent
        timeCurrent.css({[transitionPrefix]:trans, [transformPrefix]:`scaleX(${ratio})`})
        //Mise à jour de handle
        handle.css({[transitionPrefix]:trans, [transformPrefix]:`translateX(${translate})`})
        updateTimeRailAnimation = requestAnimationFrame(updateTimeRail)
      }
    }
/************************************************
 *                                              *
 *             FIN UPDATETIMERAIL               *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *         ÉVTS TACTILES SUR LA VIDÉO           *
 *                                              *
 ************************************************/
    /*
    À la suite d'un évènement 'touchstart', on place un écouteur sur l'évènement 'touchend'
    Cet écouteur est retiré si un évènement touchmove est déclenché.
    Si la vidéo est en pause :
      - on affiche le gros bouton Play au centre et la barre de contrôle.
      - un tap passe la vidéo en lecture, le gros bouton Play est caché 
          et la barre de contrôle disparait au bout d'un temps défini par l'option hideControlsDelay.
      - un slide horizontal affiche le seeking et, le cas échéant, la vignette 
          mais fait disparaitre la barre de controle.
          Celle-ci réapparait à la fin du slide, la vidéo reste en pause et sa tête de lecture est positionnée
          au temps correspondant à l'endroit où le slide a cessé.
    Si la vidéo est en lecture :
      - un tap passe la vidéo en pause et on affiche le gros bouton Play ainsi que la barre de contrôle.
      - si la barre de contrôle est apparente, un slide vertical vers le bas la fait disparaitre.
      - si la barre de contrôle est cachée, un slide vertical vers le haut la fait apparaitre.
      - un slide horizontal affiche le seeking et, le cas échéant, la vignette. Si elle est apparente, la barre de contrôle est cachée.
          À la fin du slide, la lecture reprend au temps correspondant à l'endroit où le slide a cessé.
    */
    $$([media, layerLoading, layerSeekingTouch, layerPlay])
      .on('touchstart', function(e){
        const target = $(e.target),
              startTime = new Date().getTime(),
              //Durée maximale, exprimée en ms, comprise entre touchstart et touchend pour que 
              //l'évènement résultant soit considéré comme un click si aucun touchmove n'a été détecté.
              maxDelay = 800,
              //Position temporelle exprimée en pourcentage par rapport à la durée du média
              timeRatio = (media.duration)?media.currentTime/media.duration:undefined
        let startX = e.changedTouches[0].pageX,//Abscisse de l'évènement
            startY = e.changedTouches[0].pageY,//Ordonnée de l'évènement
            distX = 0,//Variable destinée à stocker la distance parcourue sur l'axe X
            distY = 0,//Variable destinée à stocker la distance parcourue sur l'axe Y
            //Variable incrémentée d'un pas à chaque fois qu'on détecte un déplacement horizontal
            //et décrémentée d'un pas à chaque fois qu'on détecte un déplacement vertical
            horizontalMove = 0,
            seekingRatio = undefined,//Variable définie uniquement dans le cas d'un déplacement horizontal
            toggleControls = false//Variable passant à true s'il s'agit d'un déplacement vertical
        target.on('touchend', touchEnd, passive?{passive:true}:false)
        target.on('touchmove', touchMove, passive?{passive:false}:false)
        function touchMove(e){
          //Si la vidéo n'est pas chargée et n'a donc pas de durée définie
          //Ou si la vidéo est en pause et qu'on a détecté un swipe vertical,
          //on ne fait rien.
          //Ainsi, s'il s'agit d'un swipe vertical, on ne bloque pas le scroll.
          if (!media.duration || (self.paused && horizontalMove < -5)) return
          //Dans tous les autres case, on bloque le scroll éventuel.
          e.preventDefault()
          //Mesure des distances
          distX = e.changedTouches[0].pageX - startX
          distY = e.changedTouches[0].pageY - startY
          //Mise à jour de horizontalMove en fonction du mouvement détecté
          if (Math.abs(distX) > Math.abs(distY)) {//Horizontal
            horizontalMove ++
          } else {//Vertical
            horizontalMove --
          }
          if (horizontalMove >= 5) {//Si le mouvement horizontal se confirme
            seekingRatio = Math.min(Math.max(timeRatio + (distX / playerWidth),0),0.999)
            if (!seekingTouchWidth) seekingTouchWidth = seekingTouch.offsetWidth
            const translate = Math.min(Math.max(seekingRatio * playerWidth - 0.5 * seekingTouchWidth, 0), playerWidth - seekingTouchWidth) + 'px'
            let css = {[transformPrefix]:`translateX(${translate})`}
            if (self.params.thumbnails.src) {
              css['backgroundPosition'] = - Math.floor(seekingRatio * 100) * thumbWidth + 'px 0'
            }
            seekingTouch.css(css)
            $('.amst__seeking-touch-cache').style[transformPrefix] = `scaleX(${seekingRatio})`
            $('.amst__seeking-touch > span').innerHTML = secondsToTimeCode(media.duration * seekingRatio, (media.duration > 3600))
            if (horizontalMove == 5) {
              //On affiche le layer seeking
              layerSeekingTouch.classList.add('amst__show')
              //on cache la barre de contrôle sans délai et ce même si la vidéo est en pause
              _hideControls({detail:{delayed: false, forced:true}})
            }
          }
          if (-5 == horizontalMove) {//Si le mouvement vertical se confirme
            toggleControls = true
            if (distY < 0) {
              _showControls()
            } else {
              _hideControls()
            }
          }
        }
        function touchEnd(){
          if (seekingRatio != undefined) {//Si seeking et donc swipe horizontal
            //On place la tête de lecture au temps résultant
            media.currentTime = media.duration * seekingRatio
            //On cache le layer seeking
            layerSeekingTouch.classList.remove('amst__show')
            _showControls()
          } else if (!toggleControls) {//Si aucun mouvement n'a été détecté
            //Si le touchend intervient avant le délai maximum défini par maxDelay
            if (maxDelay > new Date().getTime() - startTime) {
              //On bascule entre pause et lecture
              self.togglePlayPause()
            } /*else { TODO : afficher le menu contextuel
              showMenu()
            }*/
          }
          target.off('touchend', touchEnd)
          target.off('touchmove', touchMove)
        }
      }, passive?{passive:false}:false)
/************************************************
 *                                              *
 *        FIN ÉVTS TACTILES SUR LA VIDÉO        *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                ÉVTS GÉNÉRAUX                 *
 *                                              *
 ************************************************/
    //Si l'on est pas sur un écran tactile, un click sur la vidéo passe celle-ci en pause
    //même si un buffering est en cours.
    $$([media, layerLoading]).on('click', ()=>this.pause(), false)
    //Tout évènement souris provoque l'ajout de la classe 'keyboard-inactive' au container
    //Cette classe empêche l'affichage d'une bordure sur les éléments qui ont le focus
    container.on('touchstart mousedown', ()=>{container.classList.remove('amst__keyboard-active')}, passive?{passive:true}:false)
    // Un click sur le bouton Play/Pause déclenche une bascule Play/Pause   
    $('.amst__playpause').on('click', ()=>this.togglePlayPause())
    //Un click sur le gros bouton Play au centre de la vidéo déclenche une lecture 
    layerPlay.on('click', ()=>this.play())
/************************************************
 *                                              *
 *               FIN ÉVTS GÉNÉRAUX              *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *         AFFICHER/CACHER LES CONTRÔLES        *
 *                                              *
 ************************************************/
    //Si le pointeur est sur la barre de contrôle, on bloque la disparition de la barre
    //S'il sort de la zone, on rétablit la disparition
    //Rien ne se passe si l'on est sur tactile
    controls
      .on(myPointerEnter, (e)=>{
        if (myPointerType == 'touch' || (e.pointerType && e.pointerType == 'touch')) return false
        _showControls()
        pointerOverControls = true
      })
      .on(myPointerLeave, (e)=>{
        if (myPointerType == 'touch' || (e.pointerType && e.pointerType == 'touch')) return false
        pointerOverControls = false
        _hideControls({detail:{delayed:true}})
      })
/************************************************
 *                                              *
 *      FIN AFFICHER/CACHER LES CONTRÔLES       *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *             ÉVÉNEMENTS SUR RAIL              *
 *                                              *
 ************************************************/
    /*
    Afin de faciliter la vie du visiteur, le rail dispose d'une hauteur de 35px.
    Un clic ou un move amène le curseur à la position de l'évènement
    et la tête de lecture de vidéo au temps correspondant.
    On pose un écouteur sur l'évènement myPointerDown qui correspond à mousedown sur desktop
    et à touchstart sur tactile.
    */
    rail.on(myPointerDown, ()=>{
      //Si la vidéo n'est pas chargée, on abandonne...
      if (isNaN(media.duration)) return false
      //Sinon, on pose un écouteur sur l'évènement myPointerMove (mousemove/touchmove)
      //et un autre sur myPointerUp (mouseup/touchend) et mypointerLeave (mouseleave)
      rail.on(myPointerMove, moveHandle, passive?{passive:true}:false)
      rail.on(myPointerUp + ' ' +  myPointerLeave, cleanTimeSliderMoveEvents, false)
    }, passive?{passive:true}:false)
    function moveHandle(e) {
      //On détermine l'abscisse de la position où l'évènement se produit
      //et on en déduit la position temporelle résultante de la tête de lecture
      let eventX = (e.changedTouches)?e.changedTouches[0].clientX:e.clientX,
          x = eventX - sliderLeft,
          translate = x / sliderWidth
      media.currentTime = translate * media.duration
    }
    function cleanTimeSliderMoveEvents(e){
      //Si la vidéo n'est pas en pause et que le pointeur ne survole plus la barre de contrôle,
      //on programme la disparition de ladite barre.
      if (!self.paused && !pointerOverControls) _hideControls({detail:{delayed:true}})
      //On opère le déplacement de la tête de lecture ce qui provoque celui du curseur
      moveHandle(e)
      //On retire les écouteurs.
      rail.off(myPointerMove, moveHandle)
      rail.off(myPointerUp + ' ' +  myPointerLeave, cleanTimeSliderMoveEvents)
    }
/************************************************
 *                                              *
 *           FIN ÉVÉNEMENTS SUR RAIL            *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *         ÉVÉNEMENTS SOURIS SUR SLIDER         *
 *                                              *
 ************************************************/
    //Lorsque la souris survole la barre de lecture, on fait apparaître le curseur
    //indiquant la position temporelle correspondante ainsi que la vignette si thumbnails.src est défini.
    throttle(myPointerMove, 'optimizedPointerMove', slider)
    //L'élément seeking se déplace avec le pointeur et on actualise son contenu affiché en conséquence
    slider.on('optimizedPointerMove', (e)=>{
      //Si l'évènement est de source tactile ou que la vidéo n'est pas chargée, on l'ignore
      if (myPointerType == 'touch' || (e.pointerType && e.pointerType == 'touch') || isNaN(media.duration)) return false
      //Si la largeur de l'élément seeking n'a pas encore été déterminée,
      //on initialise la variable seekingWidth
      if (!seekingWidth) seekingWidth = seeking.offsetWidth
      let seekingWrapperPosition = e.detail.clientX - sliderLeft
      const seekingRatio = seekingWrapperPosition / sliderWidth,
            thumbBackgroundPosition = - Math.floor(seekingRatio * 100) * thumbWidth + 'px',
            seekingWrapperHalfWidth = 0.5 * seekingWidth - 6
      if (self.params.thumbnails.src) seeking.style.backgroundPosition = thumbBackgroundPosition + ' 0'
      $('.amst__cursor').style[transformPrefix] = `translateX(${seekingWrapperPosition}px)`
      //On fait en sorte que le wrapper ne déborde pas aux extrémités de la barre temporelle
      seekingWrapperPosition = Math.max(seekingWrapperPosition, seekingWrapperHalfWidth)
      seekingWrapperPosition = Math.min(seekingWrapperPosition, sliderWidth - seekingWrapperHalfWidth)
      $('.amst__seeking-wrapper').style[transformPrefix] = `translateX(${seekingWrapperPosition}px)`
      $('.amst__seeking > span').innerHTML = secondsToTimeCode(seekingRatio * media.duration, (media.duration > 3600))
    })
/************************************************
 *                                              *
 *            FIN SOURIS SUR SLIDER             *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                 VOLUMECHANGE                 *
 *                                              *
 ************************************************/
    media.on('volumechange', ()=>{
      if (!IS_MOBILE) {
        const vol = parseInt(media.volume * 100)
        volumeSlider.setAttributes({
          'aria-valuenow': vol,
          'aria-valuetext': vol + '%',
        })
        if (videoVolumeOrientation == 'horizontal') {
          $('.amst__volume-current').style.width = vol + '%'
        } else {
          $('.amst__volume-handle').style.bottom = vol + '%'
        }
      }
      //Mise à jour en cas de mute/demute
      if (media.volume == 0) {
        media.muted = true
        volumeButton.setAttributes({
          title: self.params.volumeButton.label.unmute,
          'aria-label': self.params.volumeButton.label.unmute,
          class: 'amst__unmute'
        })
      } else {
        media.muted = false
        volumeBeforeMute = media.volume
        if (volumeButton.classList.contains('amst__unmute')) {
          volumeButton.removeAttribute('class')
          volumeButton.setAttributes({
            title: self.params.volumeButton.label.mute,
            'aria-label': self.params.volumeButton.label.mute,
          })
        }
      }
      //Stockage du volume pour le groupe correspondant
      if (storage && self.params.volumeGroup > -1) {
        storage.setItem(`amst_volumegroup${self.params.volumeGroup}`, self.volume)
      }
      self.params.volume = self.volume
      //Propagation du changement de volume au éventuels autres players du même volumeGroup
      if (self.params.volumeGroup > -1 && AmstramgramVideoPlayer.players.length > 1) {
        AmstramgramVideoPlayer.players.forEach((player)=>{
          if (player != self && player.params.volumeGroup == self.params.volumeGroup && player.volume != self.volume) {
            player.volume = self.volume
          }
        })
      }
    })
/************************************************
 *                                              *
 *              FIN VOLUMECHANGE                *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *             VOLUME CLICK SUR HP              *
 *                                              *
 ************************************************/
    volumeButton.on('click', ()=>{
      if (media.muted) {
        media.volume = volumeBeforeMute
        media.muted = false
      } else {
        media.volume = 0
        media.muted = true
      }
    })
/************************************************
 *                                              *
 *           FIN VOLUME CLICK SUR HP            *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *   VOLUME POTENTIOMÈTRE - SOURIS & CLAVIER    *
 *                                              *
 ************************************************/
    if (!IS_MOBILE) {
      volumeSlider.on(myPointerDown,()=>{
        volumeSlider
          .on(myPointerMove, updateVolume)
          .on(myPointerLeave, cleanVolumeEvents)
          .on(myPointerUp, updateVolume)
          .on(myPointerUp, cleanVolumeEvents)
      })
      const updateVolume = function(e){
        let ratio
        if (videoVolumeOrientation == 'horizontal') {
          ratio = Math.max(0, e.clientX - volumeRect.left)
          ratio =  ratio / volumeRect.width
          ratio = (ratio > 0.96)?1:ratio
        } else {
          volumeSlider.style.cursor = 'ns-resize'
          ratio = volumeRect.height - e.clientY + volumeRect.top
          ratio = Math.max(0 ,Math.min(ratio, 100)) / 100
        }
        self.volume = ratio
      }
      const cleanVolumeEvents = function(){
        volumeSlider
          .off(myPointerMove, updateVolume)
          .off(myPointerLeave, cleanVolumeEvents)
          .off(myPointerUp, updateVolume)
          .off(myPointerUp, cleanVolumeEvents)
        if (videoVolumeOrientation == 'vertical') {
          volumeSlider.style.cursor = ''
        }
      }
      //évènements clavier
      container.on('keydown', function(e){
        container.classList.add('amst__keyboard-active')
        _showControls()
        if ([37,38,39,40,77].includes(e.which)) e.preventDefault()
        if (e.which > 36 && e.which < 41) {
          if ((e.which == 38 || e.which == 40) && d.activeElement != volumeSlider) {
            if (videoVolumeOrientation == 'vertical') {
              volumeSlider.on('transitionend', function onTransitionEnd(){
                this.removeEventListener('transitionend', onTransitionEnd)
                this.focus()
              })
              volumeButton.focus()
            } else volumeSlider.focus();
          }
          if ((e.which == 37 || e.which == 39) && d.activeElement != slider) {
            slider.focus()
          }
        }
        switch (e.which) {
          case 77://M->Mute/Unmute
            if (self.params.volumeButton.disabled !== true && self.params.volumeButton.hidden !== true) {
              volumeButton.dispatchEvent(new MouseEvent('click'))
              volumeButton.focus()
            }
            break
          case 40://Arrow Down
            if (self.params.volumeButton.disabled !== true && self.params.volumeButton.hidden !== true) {
              self.volume = Math.max(0, self.volume - 0.05)
            }
            break
          case 38://Arrow Up
            if (self.params.volumeButton.disabled !== true && self.params.volumeButton.hidden !== true) {
              self.volume = Math.min(1, self.volume + 0.05)
            }
            break
          case 37://Arrow Left
            self.currentTime = Math.max(0, self.currentTime - skipTime)
            break
          case 39://Arrow Right
            self.currentTime = Math.min(self.duration, self.currentTime + skipTime)
            break
          case 32://Space
            if (d.activeElement == playPauseButton) {
              return
            } else if (d.activeElement.nodeName != 'BUTTON') {
              e.preventDefault()
              self.togglePlayPause()
            }
            break
        }
      }, false)
    }
/************************************************
 *                                              *
 *          FIN VOLUME POTENTIOMÈTRE            *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                 FULLSCREEN                   *
 *                                              *
 ************************************************/
    /*
    Lorsqu'on passe en plein écran, les propriétés pageXOffset et pageYOffset de window sont modifiées.
    Si l'on ne prend pas de précautions, à la sortie du plein écran, la page aura perdu son scroll initial.
    On intialise donc deux variables scrollX et scrollY dans lesquelles on stockera les valeurs de scroll
    avant le passage en plein écran pour pouvoir les rétablir à la sortie.
    Au passage en mode plein écran, on pose un écouteur spécifique sur l'événement resize.
    Dans ce mode, le display du wrapper passe en flex et on pose un margin:auto sur le container
    afin d'assurer son centrage horizontal et vertical.
    Si l'écran est plus large que la vidéo, le container est centré horizontalement, sa hauteur est fixée à 100%, 
    son padding-bottom est annulé et sa largeur est déterminée grâce au format de la vidéo.
    Dans le cas contraire, le container est centré verticalement, son padding-bottom est donné par le format de la vidéo et sa largeur fixée à 100%.
    À la sortie du plein écran, on assure un nettoyage des styles ajoutés.
    */
    if (fullscreenAPI) {
      let scrollX = 0, 
          scrollY = 0
      const fullScreenButton = $('.amst__fullscreen>button')
      fullScreenButton.on('click', ()=>{
        if (d[fullscreenAPI.fullscreenElement] !== null) {//On est en mode plein écran
          //On en sort
          d[fullscreenAPI.exitFullscreen]()
        } else {//On n'est pas en mode plein écran
          //On mémorise la position dans la page pour pouvoir la rétablir à la sortie du plein écran
          scrollX = w.pageXOffset
          scrollY = w.pageYOffset
          //On passe en plein écran
          wrapper[fullscreenAPI.requestFullscreen]()
          // container[fullscreenAPI.requestFullscreen]()
          //On initialise la propriété currentFullScreenPlayer de la class
          AmstramgramVideoPlayer.currentFullScreenPlayer = self
        }
      })
      //Ecoute de l'évènement fullscreenchange
      d.addEventListener(fullscreenAPI.fullscreenchange, function(){
        if (d[fullscreenAPI.fullscreenElement] == wrapper) {//Si le player passe en plein écran
          //Écoute du resize
          w.addEventListener('optimizedResize', resizeFullScreen)
          wrapper.classList.add('amst__isfullscreen')
          //On enlève la transition sur la padding du container
          container.classList.add('amst__notransition')
          //Mise à jour du bouton et de ses labels
          fullScreenButton.setAttributes({
            title: exitFullScreenLabel,
            'aria-label': exitFullScreenLabel,
            class:' amst__unfullscreen'
          })
          resizeFullScreen()
        } else if (AmstramgramVideoPlayer.currentFullScreenPlayer == self){//Si le player sort du plein écran
          //On retire l'écouteur sur le resize
          w.removeEventListener('optimizedResize', resizeFullScreen)
          //On reset les dimensions éventuellement spécifiées par la fonction resizeFullScreen
          container.setAttribute('style',`padding-bottom:${1 / self.params.format * 100}%`)
          wrapper.classList.remove('amst__isfullscreen')
          //Mise à jour du bouton et de ses labels
          fullScreenButton.setAttributes({
            title: enterFullScreenLabel,
            'aria-label': enterFullScreenLabel,
            class: ''
          })
          //On se repositionne sur la page
          setTimeout(()=>{
            w.scroll(scrollX, scrollY)
            //On remet la transition sur le padding du container
            setTimeout(()=>{container.classList.remove('amst__notransition')},50)
          },50)
          //On reset la propriété currentFullScreenPlayer de la class
          AmstramgramVideoPlayer.currentFullScreenPlayer = undefined
        }
      }, false);
      const resizeFullScreen = function() {
        if (w.innerWidth / w.innerHeight > self.params.format) {//Si l'écran est plus large que la vidéo
          container.css({
            width: w.innerHeight * self.params.format + 'px',
            height: '100%',
            'paddingBottom': 0
          })
        } else {
          container.css({
            width: '100%',
            height: 'auto',
            'paddingBottom': 1 / self.params.format * 100 + '%'
          })
        }
        resize()
      }
    }
/************************************************
 *                                              *
 *                FIN FULLSCREEN                *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                    RESIZE                    *
 *                                              *
 ************************************************/
    /*
    On effectue une mesure des éléments HTML
    Cette opération est pondérée par un setTimeout afin d'éviter les redondances.
    Elle est en effet appelée à chaque fois qu'un bouton est mis à jour.
    Si plusieurs boutons sont modifiés en même temps, elle n'est ainsi effectuée qu'une fois.
    */
    function getControlsElementsWidth(){
      if (timeoutGetControlsElementsWidth) clearTimeout(timeoutGetControlsElementsWidth)
      timeoutGetControlsElementsWidth = setTimeout(function(){
        controlsElementsWidth = 0
        $$('.amst__controls>div:not(.amst__rail):not(.amst__hidden):not(.amst__time-duration)').forEach(el=>{
          if (el.classList.contains('amst__time')) {
            controlsElementsWidth += (2 * el.offsetWidth)
          } else {
            controlsElementsWidth += el.offsetWidth
          }
        })
      resize()
      },1)
    }
    
    w.addEventListener('optimizedResize', resize)
    w.addEventListener('optimizedScroll', resize)

    function resize(){
      playerWidth = container.offsetWidth
      if (playerWidth - controlsPadding - controlsElementsWidth < AmstramgramVideoPlayer.defaultOptions.railMinWidthForNormalUI) {
        container.classList.add('amst__compact')
      } else {
        container.classList.remove('amst__compact')
      }
      let sliderRect = slider.getBoundingClientRect()
      sliderLeft = sliderRect.left
      sliderWidth = sliderRect.width
      updateTimeRail()
      //Si le format de la source est modifiée, l'abscisse du potentiomètre de volume en mode vertical 
      //ne sera fixée qu'à la fin de l'animation posée sur le padding-bottom du container.
      if (!IS_MOBILE) {
        const updateVolumeRect = function(e) {
          volumeRect = $('.amst__volume-total').getBoundingClientRect()
          if (e && e.target == container) {
            container.off('transitionend', updateVolumeRect)
          }
        }
        container.on('transitionend', updateVolumeRect, false)
        updateVolumeRect()
      }
    }
/************************************************
 *                                              *
 *                  FIN RESIZE                  *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                 FINALISATION                 *
 *                                              *
 ************************************************/
    //La fonction pointerDetected() écoute l'évènement 'pointerDetected' dispatché par la class
    //lorsque le type de pointeur a été détecté.
    function pointerDetected(){
      container.removeEventListener('pointerDetected', pointerDetected)
      if (_pointerType != 'touch') container.classList.add('amst__no-touch')
    }
    //Si la class n'a pas encore détecté le type de pointeur, on se prépare à réagir à sa future détection
    if (_pointerType == 'unknown') {
      container.addEventListener('pointerDetected', pointerDetected, false)
    } else if (_pointerType != 'touch') {
      container.classList.add('amst__no-touch')
    }
    //On ajoute l'instance dans le tableau regroupant toutes les autres instances de players
    AmstramgramVideoPlayer.players.push(this)
    
    if (params && typeof params.onInit === "function") {
      setTimeout(function(){params.onInit(self)},0)
    }
  }
/************************************************
 *                                              *
 *                  FIN RESIZE                  *
 *               FIN CONSTRUCTOR                *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                GETTERS/SETTERS               *
 *                                              *
 ************************************************/
  set src(src){
    /*
    src est :
      - soit une chaine renvoyant vers la source vidéo
      - soit un objet de la forme 
        {
          src: 'chemin du fichier vidéo',
          format: 'rapport largeur/hauteur de la vidéo',
          poster: 'chemin du fichier poster',
          volume: 'volume',
          duration: 'durée de la vidéo en seconde',
          skipTime: 'valeur de l'incrément temporel lorsque l'utilisateur appuie sur les flèches gauche ou droite de son clavier'
          thumbnails: 'chemin du fichier des vignettes',
          previous: objet,
          next: objet,
          fullscreen: objet,
          download: objet,
        }
    */
    this.container.dispatchEvent(new CustomEvent('amstEvent__src',{'detail': src}))
  }
  get src(){
    return this.media.getAttribute('src')
  }

  get paused(){
    return this.media.paused
    // return this.media.isPlaying
  }
  
  get duration(){
    return this.media.duration
  }

  set currentTime(t) {
    if (this.media.duration && t >= 0 && t <= this.media.duration) {
      this.media.currentTime = t
    }
  }
  get currentTime(){
    return this.media.currentTime
  }

  set volume(vol){
    this.media.volume = vol
  }
  get volume(){
    return this.media.volume
  }
/************************************************
 *                                              *
 *             FIN GETTERS/SETTERS              *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                  MÉTHODES                    *
 *                                              *
 ************************************************/
  pause(){
    this.container.dispatchEvent(new CustomEvent('amstEvent__pause'))
  }

  play(){
    this.container.dispatchEvent(new CustomEvent('amstEvent__play'))
  }

  reset(){
    this.pause()
    this.container.dispatchEvent(new CustomEvent('amstEvent__reset'))
  }
 
  togglePlayPause(){
    if (this.paused) {
      this.play()
    } else {
      this.pause()
    }
  }

  hideControls(delayed = false, forced = false){
    this.container.dispatchEvent(new CustomEvent('amstEvent__hideControls',{'detail':{delayed: delayed, forced: forced}}))
  }

  showControls(){
    this.container.dispatchEvent(new CustomEvent('amstEvent__showControls'))
  }

  previous(opt){
    if (isObject(opt)) {
      //Mise à jour des paramètres
      this.params = mergeDeep(this.params, {previous:opt})
      //Génération de l'événement qui va provoquer la mise à jour
      this.container.dispatchEvent(new CustomEvent('amstEvent__previousButton'))
    }
  }
  next(opt){
    if (isObject(opt)) {
      this.params = mergeDeep(this.params.next, {next:opt})
      this.container.dispatchEvent(new CustomEvent('amstEvent__nextButton'))
    }
  }
  fullscreen(opt){
    if (isObject(opt)) {
      this.params = mergeDeep(this.params, {fullscreen:opt})
      this.container.dispatchEvent(new CustomEvent('amstEvent__fullscreenButton'))
    }
  }
  download(opt){
    if (isObject(opt)) {
      this.params = mergeDeep(this.params, {download:opt})
      this.container.dispatchEvent(new CustomEvent('amstEvent__downloadButton'))
    }
  }
  volumeButton(opt){
    if (isObject(opt)) {
      this.params = mergeDeep(this.params, {volumeButton:opt})
      this.container.dispatchEvent(new CustomEvent('amstEvent__volumeButton'))
    }
  }
  on(event, listener){
    if (event == 'next' || event == 'previous') {
      this.events[event].push(listener)
    }
  }
  off(event, listener) {
    if (event == 'next' || event == 'previous') {
        const idx = this.events[event].indexOf(listener);
        if (idx > -1) {
          this.events[event].splice(idx, 1);
        }
    }
  }
}
/************************************************
 *                                              *
 *             FIN GETTERS/SETTERS              *
 *                  FIN CLASS                   *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *             PROPRIÉTÉS GLOBALES              *
 *                                              *
 ************************************************/
AmstramgramVideoPlayer.currentPlayer = undefined
AmstramgramVideoPlayer.players = []
AmstramgramVideoPlayer.defaultOptions = {
  autoplay: false,
  crossorigin: 'anonymous',
  download: {label:'Télécharger', disabled:false, hidden:false},
  duration: 120,
  format: 16/9,
  fullscreen: {label:{enter:'Plein écran', exit:'Quitter le plein écran'}, disabled:false, hidden:false},
  loop: false,
  next: {label:'Suivant', disabled:true, hidden:true},
  playsinline: true,
  poster: undefined,
  preload: 'none',
  previous: {label:'Précédent', disabled:true, hidden:true},
  skipTime: '1%',
  thumbnails: {src:undefined, number:100},
  volume: 0.8,
  volumeButton: {label:{mute:'Désactiver le son', unmute:'Activer le son'}, disabled:false, hidden:false},
  //Players properties
  volumeGroup: 0,
  hideControlsDelay: 5000,
  videoVolumeOrientation: 'vertical',
  railMinWidthForNormalUI: 600,
  //Global properties
  appLabel:'Lecteur Vidéo',
  pauseLabel:'Pause',
  playLabel:'Lecture',
  volumeHelpLabel:'Utilisez les flèches Haut/Bas du clavier pour augmenter ou diminuer le volume.',
  volumeSliderLabel:'Potentiomètre de volume',
}
/************************************************
 *                                              *
 *           FIN PROPRIÉTÉS GLOBALES            *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                   BUILDUI                    *
 *                                              *
 ************************************************/
function buildUI(params){
  let videoVolumeHTMLString = '',
      volumeSliderHTMLString = ''
  if (!IS_MOBILE) {
    volumeSliderHTMLString = `
      <div class="amst__volume-slider" aria-label="${params.volumeSliderLabel}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" aria-valuetext="100%" role="slider" aria-orientation="${params.videoVolumeOrientation}" tabindex="0" title="${params.volumeHelpLabel}">
        <span class="amst__offscreen">${params.volumeHelpLabel}</span>
        <div class="amst__volume-total">
          <div class="amst__volume-current" style="height: 100%;"></div>`
    if(params.videoVolumeOrientation != 'horizontal') {
      volumeSliderHTMLString += `<div class="amst__volume-handle" style="bottom: 100%; margin-bottom: -3px;"></div>`
    }
    volumeSliderHTMLString += `</div></div>`
  }
  videoVolumeHTMLString = `
    <div class="amst__button amst__volumebutton">
      <button type="button" tabindex="0"></button>`
  if (params.videoVolumeOrientation != 'horizontal') {
    videoVolumeHTMLString += (volumeSliderHTMLString + '</div>')
  } else {
    videoVolumeHTMLString += ('</div>' + volumeSliderHTMLString)
  }

  let buildUIStr = `
    <span class="amst__offscreen">${params.appLabel}</span>
    <div class="amst__container" tabindex="0" role="application" aria-label="${params.appLabel}">
      <div class="amst__mediaelement">
        <video></video>
      </div>
    <div class="amst__layers">
      <div class="amst__layer-poster">
        <canvas></canvas>
      </div>
      <div class="amst__layer-loading">
        <div class="amst__loading">
          <span class="amst__svg"></span>
        </div>
      </div>
      <div class="amst__layer-play">
        <div class="amst__svg" role="button" tabindex="0" aria-label="${params.playLabel}" aria-pressed="false"></div>
      </div>
      <div class="amst__layer-seeking-touch">
        <div class="amst__seeking-touch-cache"></div>
        <span class="amst__time amst__seeking-touch">
          <span></span>
        </span>
      </div>
    </div>
    <div class="amst__controls">
      <div class="amst__button amst__previous">
        <button type="button" title="${params.previous.label}" aria-label="${params.previous.label}" tabindex="0"></button>
      </div>
      <div class="amst__button amst__playpause">
        <button type="button" title="${params.playLabel}" aria-label="${params.playLabel}" tabindex="0"></button>
      </div>
      <div class="amst__button amst__next">
        <button type="button" title="${params.next.label}" aria-label="${params.next.label}" tabindex="0"></button>
      </div>
      <div class="amst__time" role="timer" aria-live="off">
        <span class="amst__currenttime">00:00</span>
      </div>
      <div class="amst__rail">
        <span class="amst__slider" role="slider" tabindex="0">
          <span class="amst__buffering-bar"></span>
          <canvas class="amst__loaded-bar"></canvas>
          <span class="amst__currenttime-bar"></span>
          <span class="amst__handle"><span></span></span>
          <span class="amst__cursor"><span></span></span>
          <span class="amst__seeking-wrapper">
            <span class="amst__time amst__seeking">
              <span>00:00</span>
            </span>
          </span>
        </span>
      </div>
      <div class="amst__time amst__time-duration">
        <span class="amst__duration">00:00</span>
      </div>`
  buildUIStr += videoVolumeHTMLString
  if (fullscreenAPI) buildUIStr +=  `        
      <div class="amst__button amst__fullscreen">
        <button type="button" title="${params.fullscreen.label}" aria-label="${params.fullscreen.label}" tabindex="0"></button>
      </div>`
  buildUIStr += `
      <div class="amst__button amst__download">
        <button type="button" title="${params.download.label}" aria-label="${params.download.label}" tabindex="0"></button>
      </div>
    </div>
  `
  return buildUIStr
}
/************************************************
 *                                              *
 *                 FIN BUILDUI                  *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                 UTILITAIRES                  *
 *                                              *
 ************************************************/
function secondsToTimeCode(t, long){
  t = Math.round(t)
  let h = Math.floor(t / 3600),
      m = Math.floor((t - h * 3600) / 60),
      s = Math.round(t % 60)
  h = (h>9)?h+':':(h>0)?'0'+h+':':long?'00:':''
  m = (m>9)?m:'0'+m
  s = (s>9)?s:'0'+s
	return h + m +  ':' + s
}

//http://js-bits.blogspot.com/2010/07/canvas-rounded-corner-rectangles.html
class AmstRoundedRect{
  constructor(ctx, h, x, w) {
    let y = 0, r = 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
  }
}

let throttle = (type, name, obj = w)=>{
  let running = false,
      func = (e)=>{
        if (running) return
        running = true
        requestAnimationFrame(()=>{
          obj.dispatchEvent(new CustomEvent(name, {detail:e}))
          running = false
        })
      }
  obj.addEventListener(type, func)
};
throttle('resize', 'optimizedResize')
throttle('scroll', 'optimizedScroll')

//https://stackoverflow.com/a/37164538
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, source) {
  let output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] })
        else
          output[key] = mergeDeep(target[key], source[key])
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}
/************************************************
 *                                              *
 *               FIN UTILITAIRES                *
 *                                              *
 *          /////////////////////////           *
 *                                              *
 *                   $ et $$                    *
 *                                              *
 ************************************************/
let _$ = (context)=>{
  let $ = function(selector) {
    let el = (typeof selector === 'string')?context.querySelector(selector):selector
    if (el) {
      el.css = (newCSS)=>{
        if (typeof newCSS === 'string') {
          let v = w.getComputedStyle(el, null).getPropertyValue(newCSS)
          return isNaN(parseFloat(v))?v:(parseFloat(v))
        } else {
          Object.assign(el.style, newCSS)
          return el		
        }
      }
      el.setAttributes = (attrs)=>{
        Object.keys(attrs).forEach(key=>el.setAttribute(key, attrs[key]))
      }
      el.on = function(events, handler, options = false){
        events.split(' ').forEach(e=>el.addEventListener(e, handler, options));
        return el		
      }
      el.off = function(events, handler){
        events.split(' ').forEach(e=>el.removeEventListener(e, handler));
        return el		
      }
    }
    return el
  }
  return $
}

let _$$ = (context)=>{
  let $$ = (selector)=>{
    let els = (Array.isArray(selector))?selector:Array.from(context.querySelectorAll(selector))
    els.css = (newCSS)=>{
      if (typeof newCSS === 'string') {
        let v = window.getComputedStyle(els[0], null).getPropertyValue(newCSS)
        return isNaN(parseFloat(v))?v:(parseFloat(v))
      } else {
        els.forEach(el=>{
          Object.assign(el.style, newCSS)
        })
        return els		
      }
    }
    els.on = function(events, handler, options = false){
      els.forEach(el=>{
        events.split(' ').forEach(e=>el.addEventListener(e, handler, options));
      })
      return els		
    }
    els.off = function(events, handler){
      els.forEach(el=>{
        events.split(' ').forEach(e=>el.removeEventListener(e, handler));
      })
      return els		
    }
    let r = (els.length)?els:null
    return r
  }
  return $$
}
export default AmstramgramVideoPlayer;
/************************************************
 *                                              *
 *              THIS IS THE END...              *
 *                                              *
 ************************************************/