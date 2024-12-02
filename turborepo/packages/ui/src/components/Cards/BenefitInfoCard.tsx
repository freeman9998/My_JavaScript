import React from 'react'
import styles from './BenefitInfoCard.module.scss'
import { ContentCard } from 'components/Card'
import { Badge } from 'components/Badge'
import { OneAppHealthUserGradeType } from 'components/Grade'
import { BenefitProgress } from 'components/BenefitProgress'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import { Button } from 'components/Button'
import { InfoBox } from 'components/InfoBox'
import { isEmpty } from 'utils'
import { Pill } from 'components/Button'

export interface BenefitInfoCardProps {
  username: string
  userGrade: OneAppHealthUserGradeType
  empId?: string
  isSignedUp?: boolean
  showAll?: boolean
  onShowAllClick?: () => void
  onServiceJoin?: () => void
}

const UserBenefitCount = {
  B: 9,
  BH: 17,
  BS: 43,
  BSF: 44,
  BSFP: 48,
  BSP: 48,
}

export const BenefitInfoCard = (props: BenefitInfoCardProps) => {
  const {
    username = '',
    userGrade = 'B',
    empId = '',
    isSignedUp = true,
    showAll = false,
    onShowAllClick,
    onServiceJoin,
  } = props

  const getDescriptionMessage = (grade: OneAppHealthUserGradeType) => {
    if (grade === 'B')
      return '스탠다드 등급으로 업그레이드 시 추가로 최대 34개의 서비스를 누리실 수 있어요.'
    else if (grade === 'BH')
      return '스탠다드 등급으로 업그레이드 시 추가로 최대 26개의 서비스를 누리실 수 있어요.'
    else if (grade === 'BS')
      return '패밀리 등급 업그레이드 시 가족도 함께 주요 서비스를 누릴 수 있어요.'
    else if (grade === 'BSF')
      return '프리미엄 등급으로 업그레이드 시 추가로 4개의 서비스를 누리실 수 있어요.'
    else if (grade === 'BSFP')
      return '360Health가 제공하는 모든 서비스를 누리실 수 있어요.'
    else if (grade === 'BSP')
      return '패밀리 등급 혜택을 제외한 360Health의 모든 서비스를 누리실 수 있어요.'
  }

  const handleShowAllClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onShowAllClick) {
      event.preventDefault()
      onShowAllClick()
    }
  }

  return (
    <ContentCard className={styles.benefitCard}>
      <Box className={styles.rows}>
        <Box className={styles.bheader}>
          <Badge
            grade={userGrade === 'BH' ? 'B' : userGrade}
            isSignedUp={isSignedUp}
          />
          {userGrade === 'BH' && <Badge grade={userGrade} />}
        </Box>
        <Typography.SubTitle type="default" size="lg" className={styles.txt}>
          <Typography.SubTitle type="default" size="lg" className={styles.str}>
            {username}
          </Typography.SubTitle>
          님이 이용할 수 있는 <br className={styles.onlyMob} />
          혜택이{' '}
          <Typography.SubTitle className={styles[userGrade]} size="lg">
            {`${userGrade !== 'B' && userGrade !== 'BH' ? '최대 ' : ''}${
              UserBenefitCount[userGrade]
            }개`}
          </Typography.SubTitle>{' '}
          있어요.
        </Typography.SubTitle>
        {!isEmpty(empId) && (
          <Box className={styles.infoBox}>
            <InfoBox>
              <Typography.SubTitle
                size="sm"
                className={styles.infoTitle}
                type="secondary"
              >
                안내
              </Typography.SubTitle>
              <Typography.Text size="sm" type="secondary">
                메트라이프생명 임직원 복리후생 프로그램의 대상으로 헬스케어 프리미엄
                등급을 제공합니다.
              </Typography.Text>
            </InfoBox>
          </Box>
        )}
      </Box>
      <Box className={styles.progress}>
        <BenefitProgress userGrade={userGrade} />
        <Typography.Text className={styles.desc} size="sm" type="info">
          {getDescriptionMessage(userGrade)}
        </Typography.Text>
      </Box>
      <Box className={styles.showAll}>
        {showAll && (
          <a href="#" onClick={handleShowAllClick}>
            <Pill label="모든혜택" />
          </a>
        )}
      </Box>
      {!isSignedUp && (
        <Box className={styles.serviceBtn}>
          <Button onClick={() => onServiceJoin?.()}>서비스 가입하기</Button>
        </Box>
      )}
    </ContentCard>
  )
}
