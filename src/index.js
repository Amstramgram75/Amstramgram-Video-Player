import './css/main.scss'
import styles from "./css/main.scss"
import {$, $$} from './js/utils'
import AmstramgramVideoPlayer from '../app/js/amstramgramVideoPlayer'
import '../app/css/amstramgramVideoPlayer.scss'

const
  // Récupération des constantes déclarées en css
  // Largeur Max du viewport pour basculer le menu en mode hamburger
  MOBILE_WIDTH = parseFloat(styles.MOBILE_WIDTH),
  w = window,
  d = document,
  b = d.body

d.addEventListener("DOMContentLoaded", main)

function main(){
  console.log('INIT', $(b), MOBILE_WIDTH)
  w.addEventListener('resize', resize, false)
  w.addEventListener('scroll', scroll, false)
  new AmstramgramVideoPlayer($('video'))
  resize()
}

function resize(){
  console.log('resize')
}