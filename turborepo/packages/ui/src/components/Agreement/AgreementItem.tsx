import React, { useState } from 'react'
import cn from 'classnames'
import styles from './AgreementItem.module.scss'

import { CheckBox } from 'components/CheckBox'
import { Typography } from 'components/Typography'
import { List } from 'components/List'
import PageMore from 'assets/icons/ico-page-more.svg'
import ArrowDown from 'assets/icons/ico-arrow-down.svg'
import { Box } from 'components/Boxes'
import { Icon } from 'components/Icon'
import { AgreementCheckValue } from './Agreement'
import { isEmpty } from 'utils'

type Depth3Type = 'default' | 'advertisement'
export interface IAgreementItem {
  id: string
  label: string
  required?: boolean
  children?: IAgreementItem[]
  hasLink?: boolean // 링크여부(=하위 요소가 없다. = accordion X)
  fixedExpand?: boolean // 펼침이 고정여부
  detailType?: Depth3Type // 3depth 타입(=> 3depth의 영역이 개별적이다 = accordion의 기본 형태가 아니다.)
}

export interface AgreementItemProps extends IAgreementItem {
  checked: boolean | AgreementCheckValue | undefined
  depth: number
  onChange: (id: string, checked: boolean) => void
  onClick?: () => void
  onClickChildren?: (id: string) => void
}

export const AgreementItem = (props: AgreementItemProps) => {
  const {
    id,
    checked = false,
    depth = 1,
    label = '',
    required = false,
    children,
    hasLink = true,
    fixedExpand = false,
    detailType = 'default',
    onChange,
    onClick,
    onClickChildren,
  } = props

  const [expanded, setExpanded] = useState<boolean>(fixedExpand)

  const handleExpand =
    (hasLink: boolean) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (hasLink) {
        onClick?.()
      } else {
        setExpanded(!expanded)
      }
    }

  const getValues: any = (value: AgreementCheckValue) => {
    return Object.values(value)
      .map(v => (typeof v === 'boolean' ? v : getValues(v)))
      .flat()
  }

  const isChecked = (value: boolean | AgreementCheckValue) => {
    if (typeof value === 'boolean') {
      return value
    } else {
      return !getValues(value).includes(false)
    }
  }

  const handleChange = (id: string) => (checked: boolean) => {
    onChange(id, checked)
  }

  return (
    <Box className={styles.agreementWrap}>
      <Box className={styles.agreementSummary}>
        <Summary
          id={id}
          checked={isChecked(checked)}
          label={label}
          required={required}
          depth={depth}
          onChange={handleChange(id)}
        />
        <Box
          className={cn(styles.arrowBtn, {
            [styles.isExpand as string]: expanded && !fixedExpand,
          })}
        >
          <a href="#" onClick={handleExpand(hasLink)}>
            <Icon icon={hasLink ? PageMore : ArrowDown} alt="" />
          </a>
        </Box>
      </Box>

      {expanded && (
        <Box className={styles.agreementDetails}>
          {detailType === 'default' ? (
            <Detail
              checkeds={checked as AgreementCheckValue}
              children={children as IAgreementItem[]}
              onChange={onChange}
              onClick={(id: string) => onClickChildren?.(id)}
            />
          ) : (
            <Advertisement
              checkeds={checked as AgreementCheckValue}
              children={children as IAgreementItem[]}
              onChange={onChange}
            />
          )}
        </Box>
      )}
    </Box>
  )
}

interface SummaryProps extends IAgreementItem {
  checked: boolean
  depth: number
  onChange: (checked: boolean) => void
}

const Summary = ({
  checked = false,
  depth = 1,
  label = '',
  required = false,
  onChange,
}: SummaryProps) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onChange(!checked)
  }

  return (
    <Box className={styles.summary}>
      <CheckBox checked={checked} shape="no-border" onChange={onChange} />
      <a href="#" className={styles.link} onClick={handleClick}>
        {depth === 1 ? (
          <>
            <Typography.SubTitle
              size="sm"
              className={cn(
                required ? styles.required : styles.selected,
                styles.fixed,
              )}
              type="primary"
            >
              {required ? '(필수)' : '(선택)'}
            </Typography.SubTitle>
            <Typography.SubTitle size="sm" className={styles.slabel}>
              {label}
            </Typography.SubTitle>
          </>
        ) : (
          <>
            <Typography.Text
              size="sm"
              className={cn(
                required ? styles.required : styles.selected,
                styles.fixed,
              )}
              type="primary"
            >
              {required ? '(필수)' : '(선택)'}
            </Typography.Text>
            <Typography.Text size="sm" className={styles.slabel}>
              {label}
            </Typography.Text>
          </>
        )}
      </a>
    </Box>
  )
}

interface DetailProps {
  checkeds: AgreementCheckValue
  children: IAgreementItem[]
  onChange: (id: string, checked: boolean) => void
  onClick?: (id: string) => void
}

const Detail = ({ checkeds, children, onChange, onClick }: DetailProps) => {
  const isChecked = (id: string, value: boolean | AgreementCheckValue) => {
    if (typeof value === 'boolean') {
      return value
    } else {
      return value[id]
    }
  }

  return (
    <>
      {!isEmpty(children) && (
        <List className={styles.slist}>
          {children.map((child: IAgreementItem, index: number) => (
            <List.Item key={index}>
              <AgreementItem
                checked={isChecked(child.id, checkeds)}
                depth={2}
                {...child}
                onChange={onChange}
                onClick={() => onClick?.(child.id)}
              />
            </List.Item>
          ))}
        </List>
      )}
    </>
  )
}

interface AdvertisementProps {
  checkeds: AgreementCheckValue
  children: IAgreementItem[]
  onChange: (id: string, checked: boolean) => void
}
const Advertisement = ({ checkeds, children, onChange }: AdvertisementProps) => {
  const handleCheck = (id: string) => (checked: boolean) => {
    onChange(id, checked)
  }

  const handleClick =
    (id: string, checked: boolean) =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()

      onChange(id, checked)
    }

  return (
    <Box className={styles.checkBoxGroupWrap}>
      {children.map(item => (
        <React.Fragment key={item.id}>
          <Box className={styles.citem}>
            <CheckBox
              checked={checkeds[item.id] as boolean}
              shape="no-border"
              onChange={handleCheck(item.id)}
            />
            <a href="#" onClick={handleClick(item.id, !checkeds[item.id])}>
              <Typography.Text size="sm" type="secondary">
                {item.label}
              </Typography.Text>
            </a>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  )
}
