import React from 'react'
import cn from 'classnames'
import styles from './Indicator.module.scss'
import { Box } from 'components/Boxes'
import { Icon } from 'components/Icon'
import Play from '@assets/icons/ico-swiper-play.svg'
import Stop from '@assets/icons/ico-swiper-stop.svg'

export interface IndicatorProps {
  isPlay: boolean
  autoPlay?: boolean
  onPlay: () => void
  onPause: () => void
}

export const Indicator = ({
  isPlay = true,
  autoPlay = false,
  onPlay,
  onPause,
}: IndicatorProps) => {
  return (
    <Box className={styles.paginationWrap}>
      {autoPlay && (
        <button
          type="button"
          className={cn(styles.playBtn, { [styles.stop as string]: isPlay })}
          onClick={isPlay ? onPause : onPlay}
        >
          {/*<Icon*/}
          {/*  icon={isPlay ? Stop : Play}*/}
          {/*  alt={isPlay ? '일시정지' : '재생'}*/}
          {/*  onClick={isPlay ? onPause : onPlay}*/}
          {/*/>*/}
          {isPlay ? '일시정지' : '재생'}
        </button>
      )}

      <span className={styles.customPagination} />
    </Box>
  )
}
