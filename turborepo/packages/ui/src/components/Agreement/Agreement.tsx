import React, { useState, useEffect } from 'react'
import styles from './Agreement.module.scss'
import cn from 'classnames'
import { AgreementItem, IAgreementItem } from './AgreementItem'
import { Section } from 'components/Section'
import { CheckBox } from 'components/CheckBox'
import { Box } from 'components/Boxes'
import { List } from 'components/List'

export interface AgreementCheckValue {
  [key: string]: boolean | AgreementCheckValue
}
export interface AgreementProps {
  value: AgreementCheckValue
  agreementItems: IAgreementItem[]
  useAllCheck?: boolean
  onChange: (id: string, checked: boolean) => void
  onClick?: (id: string) => void
  onAllCheck?: (checked: boolean) => void
}

export const Agreement = (props: AgreementProps) => {
  const {
    value: checkValues,
    agreementItems = [],
    useAllCheck = false,
    onChange,
    onClick,
    onAllCheck,
  } = props

  const [allCheck, setAllCheck] = useState<boolean>(false)

  useEffect(() => {
    const result = Object.values(checkValues)
      .map(v =>
        typeof v === 'boolean'
          ? v
          : Object.values(v)
              .map(v => (typeof v === 'boolean' ? v : Object.values(v)))
              .flat(),
      )
      .flat()

    setAllCheck(!result.includes(false))
  }, [checkValues])

  return (
    <Section className={styles.agreementItem}>
      {useAllCheck && (
        <Box className={cn(styles.allItem, { [styles.on as string]: allCheck })}>
          <CheckBox
            label="전체 동의"
            checked={allCheck}
            onChange={(checked: boolean) => onAllCheck?.(checked)}
          />
        </Box>
      )}

      <List className={styles.mlist}>
        {agreementItems.map((item: IAgreementItem, index: number) => (
          <List.Item key={index}>
            <AgreementItem
              checked={checkValues[item.id]}
              depth={1}
              {...item}
              onChange={onChange}
              onClick={() => onClick?.(item.id)}
              onClickChildren={(id: string) => onClick?.(id)}
            />
          </List.Item>
        ))}
      </List>
    </Section>
  )
}
