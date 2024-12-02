import React from 'react'
import styles from './AccordionSummary.module.scss'
import IcoAdd from '@assets/icons/ic_utility_add.svg'
import IcoMinus from '@assets/icons/ic_utility_minus.svg'
import PageMore from '@assets/icons/ico-page-more.svg'
import { Box } from 'components/Boxes'
import { CheckBox } from 'components/CheckBox'
import { Icon } from 'components/Icon'

export interface AccordionSummaryProps {
  isExpand: boolean
  hasDetail?: boolean
  checked?: undefined | boolean
  fixedExpand?: boolean
  children: React.ReactNode
  onExpand: (isExpand: boolean) => void
  onClick?: () => void
  onCheck?: (checked: boolean) => void
}

export const AccordionSummary = ({
  isExpand = false,
  hasDetail = false,
  checked = undefined,
  fixedExpand = false,
  children,
  onExpand,
  onClick,
  onCheck,
}: AccordionSummaryProps) => {
  const handleExpand = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hasDetail && !fixedExpand) {
      event.preventDefault()
      onExpand(!isExpand)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasDetail && !fixedExpand) {
      // onExpand(!isExpand)
    } else {
      event.preventDefault()
      onClick?.()
    }
  }

  const handleClickSummary = (event: React.MouseEvent<HTMLDivElement>) => {
    if (typeof checked === 'boolean' && onCheck) {
      event.preventDefault()
      event.stopPropagation()
      onCheck(!checked)
    }
  }

  return (
    <Box className={styles.accordionSummary} tabIndex={0} onClick={handleExpand}>
      <Box className={styles.accordionCont}>
        {typeof checked === 'boolean' && (
          <CheckBox checked={checked} onChange={props => onCheck?.(props)} />
        )}
        <Box onClick={handleClickSummary}>{children}</Box>
      </Box>
      <Box className={styles.accordionIcon}>
        <a href="#" onClick={handleClick}>
          <Icon
            icon={
              hasDetail && !fixedExpand ? (isExpand ? IcoMinus : IcoAdd) : PageMore
            }
            alt=""
          />
        </a>
      </Box>
    </Box>
  )
}
