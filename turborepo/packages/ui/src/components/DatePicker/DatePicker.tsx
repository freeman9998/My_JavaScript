import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import style from './DatePicker.module.scss'
import ReactDatePicker from 'react-datepicker'

/**
 * react-datepicker의 default props를 by-pass 하지 않고
 * 필요한 기능만 property로 정의
 *
 * why? 기본 oneApp의 datepicker의 UI가 bottomSheet 위에서 next interaction(확인버튼으로 인한 value의 변경시점)으로 동작하기에
 * 컴포넌트 내에서 자체 selected를 바꿔줘야 하는 이슈
 * range select에 대한 기획이 없으며 이처럼 다양한 case에 대한 error 예외처리가 필요하기에 필요한 기능만 정의
 *
 * 기능 필요시 컴포넌트 문의
 *
 * @param {Date | undefined | null} selected 선택한 날짜(기본값: today), 단일선택 (react-datepicker 주입)
 * @param {Date} minDate 선택가능 최소날짜, 단일선택 (react-datepicker 주입)
 * @param {Date} maxDate 선택가능 최대날짜, 단일선택 (react-datepicker 주입)
 * @param {{ start: Date; end: Date }[]} excludeDateIntervals 선택 불가능 날짜(범위), 단일선택 (react-datepicker 주입)
 * @param {function} onChange 날짜 선택시 발생 event, 단일선택
 */
export interface CalendarProps {
  // datepickerProps: DatePickerProps
  selected?: Date | undefined | null
  minDate?: Date
  maxDate?: Date
  excludeDateIntervals?: { start: Date; end: Date }[]
  onChange: (date: Date | null) => void
}

export const DatePicker = ({
  // datepickerProps: { selected = undefined, ...rest },
  selected = undefined,
  minDate,
  maxDate,
  excludeDateIntervals,
  onChange,
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined | null>(selected)

  return (
    <ReactDatePicker
      className={style.datepicker_wrap}
      // {...rest}
      inline
      selected={selectedDate}
      minDate={minDate}
      maxDate={maxDate}
      excludeDateIntervals={excludeDateIntervals}
      onChange={(props: any) => {
        setSelectedDate(props)
        onChange(props)
      }}
    />
  )
}
