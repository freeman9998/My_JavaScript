import React from 'react'
import styles from './Grade.module.scss'
import { Badge, BadgeProps } from 'components/Badge'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import cn from 'classnames'
import IconNoSign from '@assets/icons/bg-heart-noSignedUp.svg'
import IconBasic from '@assets/icons/bg-heart-basic.svg'
import IconStandard from '@assets/icons/bg-heart-standard.svg'
import IconFamily from '@assets/icons/bg-heart-family.svg'
import IconPremium from '@assets/icons/bg-heart-allpremium.svg'
import { Icon } from 'components/Icon'

/**
 * grade 별 color
 * [360Health]
 * basic(B) : green(#A4CE4E)
 * happy pack(BH) : green(#A4CE4E)
 * standard(BS) : new_green(#0B8201)
 * family(BSF) : blue_02(#007ABC)
 * premiumn(BSFP, BSP) : dark_blue_01(#0061A0)
 *
 * [360Future]
 * welcome(W) : mlbaseteal
 * basic(WB) : mlblue2
 * premiumn(WBP) : gradient4_v2
 */

export type OneAppHealthUserGradeType = 'B' | 'BH' | 'BS' | 'BSF' | 'BSFP' | 'BSP'
export const UserGrades = {
  B: { ko: '베이직', en: 'Basic', icon: IconBasic },
  BH: { ko: '해피팩', en: 'HappyPack', icon: IconBasic },
  BS: { ko: '스탠다드', en: 'Standard', icon: IconStandard },
  BSF: { ko: '패밀리', en: 'Family', icon: IconFamily },
  BSFP: { ko: '프리미엄', en: 'Premium', icon: IconPremium },
  BSP: { ko: '프리미엄', en: 'Premium', icon: IconPremium },
}
export type HealthGradeType = 'Basic' | 'Standard' | 'Family' | 'Premium'
export const HealthGrades: { [key: string]: string } = {
  B: 'Basic',
  S: 'Standard',
  F: 'Family',
  P: 'Premium',
}

export interface GradeProps extends BadgeProps {
  userGrade?: OneAppHealthUserGradeType
  label?: string
  isSignedUp?: boolean
  onClick?: () => void
}

export const Grade = (props: GradeProps) => {
  const { userGrade = 'B', isSignedUp = true, label = 'UP', onClick } = props
  return (
    <Box className={styles.gradeWrap}>
      <Box className={styles.gradeItem} onClick={() => onClick?.()}>
        <Box className={styles.icon}>
          <Icon
            icon={!isSignedUp ? IconNoSign : UserGrades[userGrade].icon}
            alt=""
            ariaHidden={true}
          />
          <Typography.SubTitle className={styles.value} size="md" type="white">
            {label}
          </Typography.SubTitle>
        </Box>
      </Box>
      <Badge grade={userGrade === 'BH' ? 'B' : userGrade} isSignedUp={isSignedUp} />
    </Box>
  )
}
