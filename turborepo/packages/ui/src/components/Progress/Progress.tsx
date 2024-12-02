import React from 'react'
import styles from './Progress.module.scss'
import { Box } from 'components/Boxes'

export interface ProgressProps {
  percentage: number
}

export const Progress = ({ percentage = 0 }: ProgressProps) => {
  const getStyles = (value: number) => {
    if (value >= 90 && value <= 100) return 'step01'
    else if (value >= 84 && value <= 89) return 'step02'
    else if (value >= 58 && value <= 83) return 'step03'
    else if (value >= 32 && value <= 57) return 'step04'
    else return 'step05'
  }

  return (
    <Box className={styles.progress}>
      <Box className={styles.bar}>
        <span
          className={styles[getStyles(percentage)]}
          style={{ width: `${percentage}%` }}
        ></span>
      </Box>
    </Box>
  )
}
