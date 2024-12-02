import React from 'react'
import styles from './AccordionDetails.module.scss'
import cn from 'classnames'
import { Box } from 'components/Boxes'

export interface AccordionDetailsProps {
  children: React.ReactNode
}

export const AccordionDetails = ({ children }: AccordionDetailsProps) => {
  return (
    <Box className={styles.accordionDetails}>{children}</Box>
  )
}
