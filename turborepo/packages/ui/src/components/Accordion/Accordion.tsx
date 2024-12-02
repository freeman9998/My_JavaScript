import React, { useEffect, useState } from 'react'
import styles from './Accordion.module.scss'
import stylesV2 from './AccordionV2.module.scss'
import { AccordionSummary } from './AccordionSummary'
import { AccordionDetails } from './AccordionDetails'
import { Box } from 'components/Boxes'

export interface AccordionProps {
  isExpand?: boolean
  summary: React.ReactNode
  detail?: undefined | React.ReactNode
  checked?: undefined | boolean
  fixedExpand?: boolean
  onExpand: (isExpand: boolean) => void
  onClick?: () => void
  onCheck?: (checked: boolean) => void
}

export const Accordion = ({
  isExpand = false,
  summary,
  detail = undefined,
  checked = undefined,
  fixedExpand = false,
  onExpand,
  onClick,
  onCheck,
}: AccordionProps) => {
  return (
    <Box className={stylesV2.accordionWrap}>
      <AccordionSummary
        isExpand={isExpand}
        hasDetail={typeof detail !== 'undefined'}
        checked={checked}
        fixedExpand={fixedExpand}
        onExpand={(expand: boolean) => onExpand?.(expand)}
        onClick={onClick}
        onCheck={chk => onCheck?.(chk)}
      >
        {summary}
      </AccordionSummary>
      {isExpand && detail && <AccordionDetails>{detail}</AccordionDetails>}
    </Box>
  )
}
