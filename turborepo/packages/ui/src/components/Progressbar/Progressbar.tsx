import React from 'react'
import styles from './Progressbar.module.scss'
import { Box } from 'components/Boxes'

export interface ProgressbarProps {
  percentage: number
}

export const Progressbar = (props: ProgressbarProps) => {
  return (
    <Box className={styles.progressbar}>
      <Box className={styles.bar} style={{ width: `${props.percentage}%` }}></Box>
    </Box>
  )
}
