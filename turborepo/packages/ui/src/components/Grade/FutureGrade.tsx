import React from 'react'
import styles from './FutureGrade.module.scss'
import { Badge, BadgeProps } from 'components/Badge'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import cn from 'classnames'
import { Icon } from 'components/Icon'
import IconNoSign from '@assets/icons/future_noSignedUp.svg'
import IconWelcome from '@assets/icons/future_welcome.svg'
import IconBasic from '@assets/icons/future_basic.svg'
import IconPremium from '@assets/icons/future_premium.svg'

/**
 * grade 별 color
 * [360Health]
 * basic(B) : green(#A4CE4E)
 * standard(BS) : new_green(#0B8201)
 * family(BSF) : blue_02(#007ABC)
 * premiumn(BSFP, BSP) : dark_blue_01(#0061A0)
 *
 * [360Future]
 * welcome(W) : mlbaseteal
 * basic(WB) : mlblue2
 * premiumn(WBP) : mldarkblue3
 */

export type OneAppFutureUserGradeType = 'W' | 'WB' | 'WBP'
export const FutureUserGrades = {
  W: { ko: '웰컴', en: 'Welcome', icon: IconWelcome },
  WB: { ko: '베이직', en: 'Basic', icon: IconBasic },
  WBP: { ko: '프리미엄', en: 'Premium', icon: IconPremium },
}

export type FutureGradeType = 'Welcome' | 'Basic' | 'Premium'
export const FutureGrades: { [key: string]: string } = {
  W: 'Welcome',
  B: 'Basic',
  P: 'Premium',
}

export interface FutureGradeProps extends BadgeProps {
  userGrade?: OneAppFutureUserGradeType
  label?: string
  isSignedUp?: boolean
  onClick?: () => void
}

export const FutureGrade = (props: FutureGradeProps) => {
  const { userGrade = 'W', isSignedUp = true, label = undefined, onClick } = props
  return (
    <Box className={styles.gradeWrap}>
      <Box className={styles.gradeItem} onClick={() => onClick?.()}>
        <Box
          className={cn(styles.icon, { [styles.noAnimation as string]: label === undefined })}
        >
          <Icon
            icon={!isSignedUp ? IconNoSign : FutureUserGrades[userGrade].icon}
            alt=""
            ariaHidden={true}
          />
          {typeof label === 'string' && (
            <Typography.SubTitle className={styles.value} size="lg" type="white">
              {label}
            </Typography.SubTitle>
          )}
        </Box>
      </Box>
      <Badge grade={userGrade} isSignedUp={isSignedUp} />
    </Box>
  )
}
