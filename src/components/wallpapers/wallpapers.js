import React, { useRef } from 'react'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash-es/clamp'

import './wallpapers.scss'

import img from '../../assets/images/image1.jpg'
import img2 from '../../assets/images/image2.jpg'
import img3 from '../../assets/images/image3.jpg'

import download from '../../assets/icons/download.png'

const pages = [img, img2, img3]
const isOnMob = window.innerWidth <= 600
const vhToPixel = value => (window.innerHeight * value) / 100

function Wallpapers() {

  const my_width = isOnMob? vhToPixel(45) : vhToPixel(36)
  const index = useRef(0)
  const [images, set] = useSprings(pages.length, (i) => ({
    x: i * my_width,
    scale: 1,
    display: 'block'
  }))
  const bind = useDrag(({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (active && distance > my_width / 1.6){
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)))
    }
    set((i) => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * my_width + (active ? mx : 0)
      const scale = active ? 1 - distance / my_width / 2 : 1
      return { x, scale, display: 'block' }
    })
  })

  return (
    <div className="wallpapers">
      {images.map(({ x, display, scale }, i) => (
        <animated.div className="wallpapers__image-wrapper" key={i} style={{ display, x, scale }}{...bind()} >
          <animated.img className="wallpapers__image" draggable="false" src={pages[i]}/>
          <animated.a className="wallpapers__image-button" href={pages[i]} target="_blank" rel="noreferrer" download>
            <animated.img src={download} draggable="false"/>
          </animated.a>
        </animated.div>
      ))
      }
    </div>
  );
}

export default Wallpapers;