import React, { useState } from 'react'
import indicatorStyle from '../Indicator/Indicator.module.scss'
import styles from './Swiper.module.scss'

import { Swiper as SwiperReact, SwiperSlide, SwiperClass } from 'swiper/react'
import { Autoplay, Pagination, A11y, EffectCreative } from 'swiper/modules'
import { Indicator } from 'components/Indicator'

import 'swiper/css'
import 'swiper/css/pagination'
// import 'swiper/scss'
// import 'swiper/scss/pagination'

interface SwiperProps {
  autoPlay?: boolean
  showMore?: boolean
  vertical?: boolean
  autoScrollHeight?: number // vertical option시 첫 아이템 스크롤시 최상단(헤더포함)으로 이동되도록 하기위한 높이
  children: React.ReactNode
}
export const Swiper = ({
  autoPlay = true,
  showMore = false,
  vertical = false,
  autoScrollHeight = 0,
  children,
}: SwiperProps) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [isPlay, setIsPlay] = useState<boolean>(autoPlay)
  const [verticalIsEnd, setVerticalIsEnd] = useState<boolean>(false)

  return (
    <SwiperReact
      style={vertical ? { height: '121.5vw' } : {}}
      spaceBetween={16}
      slidesPerView={showMore ? 1.2 : 1}
      pagination={
        vertical
          ? false
          : { clickable: true, el: `.${indicatorStyle.customPagination}` }
      }
      autoplay={vertical ? false : autoPlay ? { delay: 5000 } : false}
      a11y={{ paginationBulletMessage: '{{index}}번째 슬라이드' }}
      modules={vertical ? [A11y, EffectCreative] : [Pagination, A11y, Autoplay]}
      direction={vertical ? 'vertical' : 'horizontal'}
      effect={vertical ? 'creative' : 'slide'}
      creativeEffect={
        vertical
          ? {
              prev: {
                scale: 0.9,
                translate: [0, 0, -100], // x, y, z
                // opacity: 0.5,
              },
              next: {
                scale: 1,
                translate: [0, '100%', 0],
                // opacity: 1,
              },
            }
          : {}
      }
      onSwiper={(swiper: SwiperClass) => setSwiper(swiper)}
      onTouchEnd={({ swipeDirection }: SwiperClass) => {
        if (vertical) {
          if (verticalIsEnd && swipeDirection === 'next') {
            window.scrollTo({
              top: document.body.scrollHeight + document.body.clientHeight,
              behavior: 'smooth',
            })
          }
        }
      }}
      onSlideChangeTransitionEnd={({
        isEnd,
        swipeDirection,
        ...rest
      }: SwiperClass) => {
        if (vertical) {
          if (swipeDirection === 'next' && isEnd) {
            setVerticalIsEnd(true)
          }
        }
      }}
      onSlideChangeTransitionStart={({
        activeIndex,
        swipeDirection,
        ...rest
      }: SwiperClass) => {
        if (vertical) {
          if (swipeDirection === 'next') {
            if (activeIndex === 1) {
              window.scrollTo({ top: autoScrollHeight, behavior: 'smooth' })
            }
          } else {
            if (verticalIsEnd) {
              window.scrollTo({ top: autoScrollHeight, behavior: 'smooth' })
              setVerticalIsEnd(false)
            }

            if (activeIndex === 0) {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }
        }
      }}
    >
      {React.Children.map(children, render => (
        <SwiperSlide>{render}</SwiperSlide>
      ))}
      {!vertical && (
        <Indicator
          isPlay={isPlay}
          autoPlay={autoPlay}
          onPlay={() => {
            if (swiper?.autoplay) {
              swiper.autoplay.start()
              setIsPlay(true)
            }
          }}
          onPause={() => {
            if (swiper?.autoplay) {
              swiper.autoplay.stop()
              setIsPlay(false)
            }
          }}
        />
      )}
    </SwiperReact>
  )
}
