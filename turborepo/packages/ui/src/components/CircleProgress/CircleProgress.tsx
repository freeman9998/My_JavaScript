import React, { useEffect, useState } from 'react'
import styles from './CircleProgress.module.scss'
import cn from 'classnames'
import { Icon } from 'components/Icon'
import { Box } from 'components/Boxes'

export type StatusType = 'normal' | 'danger' | 'none'
export type CircleSize = 'medium' | 'large'

export interface CircleProgressProps {
  id: string
  icon?: React.ReactNode
  percentage: number
  color?: string
  status?: StatusType
  size?: CircleSize
}

export const CircleProgress = ({
  id,
  icon,
  percentage = 0,
  color,
  status,
  size = 'medium',
}: CircleProgressProps) => {
  const RADIUS = size === 'medium' ? 41 : 58
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS

  const [progressValue, setProgressValue] = useState<number>(0)
  const [progressColor, setProgressColor] = useState<string>('#dd2224')
  const handleProgress = (percentage: number) => {
    const progress = percentage / (100 + (size === 'medium' ? 30 : 18))
    const dashoffset = CIRCUMFERENCE * (1 - progress)
    setProgressValue(dashoffset)

    if (!color) {
      if (percentage < 32) {
        setProgressColor('#dd2224')
      } else if (percentage >= 32 && percentage < 58) {
        setProgressColor('#db0a5b')
      } else if (percentage >= 58 && percentage < 84) {
        setProgressColor('#e1b212')
      } else if (percentage >= 84 && percentage < 90) {
        setProgressColor('#00aca0')
      } else {
        setProgressColor('#91c65e')
      }
    } else {
      setProgressColor(color)
    }
  }

  useEffect(() => {
    handleProgress(percentage)
  }, [percentage])

  return (
    <Box
      className={cn(
        styles.circleProgress,
        { [styles.danger as string]: status === 'danger' },
        { [styles.complete as string]: status === 'normal' },
        { [styles.large as string]: size === 'large' },
      )}
    >
      {icon && (
        <Box className={styles.ico}>
          <Icon icon={icon} alt="" ariaHidden />
        </Box>
      )}
      <Box className={styles.progressChart}>
        <svg
          width={size === 'medium' ? '82' : '115'}
          height={size === 'medium' ? '82' : '115'}
          viewBox={`0 0 ${size === 'medium' ? '82' : '115'} ${
            size === 'medium' ? '82' : '115'
          }`}
        >
          <defs>
            <linearGradient id={`gradient${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={progressColor} />
              <stop offset="100%" stopColor={progressColor} />
            </linearGradient>
          </defs>
          <circle
            className={styles.meter}
            cx={size === 'medium' ? '41' : '57'}
            cy={size === 'medium' ? '41' : '57'}
            r={size === 'medium' ? '33' : '50'}
            strokeWidth="14"
          />
          <circle
            className={styles.value}
            cx={size === 'medium' ? '41' : '57'}
            cy={size === 'medium' ? '41' : '57'}
            r={size === 'medium' ? '33' : '50'}
            strokeWidth="14"
            stroke={`url(#gradient${id})`}
            strokeDashoffset={progressValue}
            strokeDasharray={CIRCUMFERENCE}
          />
        </svg>
      </Box>
    </Box>
  )
}
