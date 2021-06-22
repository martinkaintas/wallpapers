import React, { useRef, useState, useEffect } from 'react'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash-es/clamp'
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import axios from 'axios';

import './wallpapers.scss'

import download from '../../assets/icons/download.png'

const isOnMob = window.innerWidth <= 600
const vhToPixel = value => (window.innerHeight * value) / 100

function Wallpapers() {

  const [gallery, setGallery] = useState(null)

  useEffect(() => {
    axios.get('https://res.cloudinary.com/martincloud/image/list/wallpapers.json')
      .then(res => {
        setGallery(res.data.resources);
      });
  }, []);

  const my_width = isOnMob ? vhToPixel(50) : vhToPixel(36)
  const index = useRef(0)
  const [images, set] = useSprings(15, (i) => ({
    x: i * my_width,
    scale: 1,
    display: 'block'
  }))

  const bind = useDrag(({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (active && distance > my_width / 2.3) {
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, gallery.length - 1)))
    }
    set((i) => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * my_width + (active ? mx : 0)
      const scale = active ? 1 - distance / my_width / 2 : 1
      return { x, scale, display: 'block' }
    })
  })

  const getImage = i => {
    if (gallery != null) {
      return gallery[i].public_id
    }
    return null
  }

  const getLink = i => {
    if (gallery != null) {
      return `https://res.cloudinary.com/martincloud/image/upload/fl_attachment:wallpaper_${i}/${gallery[i].public_id}.jpg`
    }
    return null
  }

  if (gallery == null)
    return <div>loading</div>

  return (
    <div className="wallpapers">
      <CloudinaryContext cloudName="martincloud">
        {images.map(({ x, display, scale }, i) => (
          <animated.div className="wallpapers__image-wrapper" key={i} style={{ display, x, scale }}{...bind()} >
            <Image className="wallpapers__image" draggable="false" cloudName="martincloud" secure="true" upload_preset="my_unsigned_preset" publicId={getImage(i)}>
              <Transformation width="600" crop="thumb" />
            </Image>
            <animated.a className="wallpapers__image-button" href={getLink(i)} target="_blank" rel="noreferrer">
              <animated.img src={download} draggable="false" />
            </animated.a>
          </animated.div>
        ))
        }
      </CloudinaryContext>
    </div >
  );
}

export default Wallpapers;