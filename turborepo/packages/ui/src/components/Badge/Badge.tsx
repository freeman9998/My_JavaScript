import React, { useEffect, useState } from 'react'
import styles from './Badge.module.scss'
import cn from 'classnames'
import {
  FutureUserGrades,
  OneAppFutureUserGradeType,
  OneAppHealthUserGradeType,
  UserGrades,
} from 'components/Grade'
import { Tags } from 'components/Tags'

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
 * premiumn(WBP) : mldarkblue3
 */
export interface BadgeProps {
  grade?: OneAppHealthUserGradeType | OneAppFutureUserGradeType
  isSignedUp?: boolean
}
type ServiceType = 'health' | 'future'
export const Badge = ({ grade = undefined, isSignedUp = true }: BadgeProps) => {
  const [gradeObj, setGradeObj] = useState<{
    label: string
    className: string
    type: ServiceType
  }>()

  useEffect(() => {
    if (grade) {
      if (Object.keys(UserGrades).includes(grade)) {
        setGradeObj({
          label: UserGrades[grade as OneAppHealthUserGradeType].en,
          className: `health_${UserGrades[
            grade as OneAppHealthUserGradeType
          ].en.toLowerCase()}`,
          type: 'health',
        })
      } else {
        setGradeObj({
          label: FutureUserGrades[grade as OneAppFutureUserGradeType].en,
          className: `future_${FutureUserGrades[
            grade as OneAppFutureUserGradeType
          ].en.toLowerCase()}`,
          type: 'future',
        })
      }
    }
  }, [grade])

  return (
    <Tags
      classname={cn({
        [styles[`${gradeObj?.className}`] as string]: isSignedUp,
        [styles.isNotSignedUp as string]: !isSignedUp,
      })}
      label={
        !isSignedUp
          ? gradeObj?.type === 'future'
            ? '360Future'
            : '360Health'
          : grade === 'BH'
          ? 'Happy pack'
          : gradeObj?.label || ''
      }
      rounded="xl"
      color={grade === 'BH' ? 'darkyellow' : undefined}
      labelColor={grade === 'BH' ? 'black' : undefined}
    />
  )
}
