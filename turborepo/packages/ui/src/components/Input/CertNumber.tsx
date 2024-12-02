import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import styles from './CertNumber.module.scss'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import { Input, InputRef } from 'components/Input'
import { Timer, TimerRef } from 'components/Timer'
import { isEmpty, isNumber } from 'utils'
import { HelperText } from 'components/HelperText'
import { usePopup } from 'components/Popup'

type ErrorType = '' | 'timeOver' | 'incorrect'

export interface CertNumberProps {
  onComplete: (value: string) => void
  onTimeOver: () => void
  onRequestCertNumber: () => void
  onRedirectBack: () => void
  onFocusEvent?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlurEvent?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export interface CertNumberRef {
  setIncorrectError: () => void
  onFocusFirst: () => void
  getCertNumber: () => {}
  setTimeOverError: () => void
}

interface CertInput {
  ref: React.RefObject<InputRef>
  value: string
  beforeRef?: React.RefObject<InputRef>
  nextRef?: React.RefObject<InputRef>
}

const CertNumberComponent: ForwardRefRenderFunction<
  CertNumberRef,
  CertNumberProps
> = (props, ref) => {
  const {
    onComplete,
    onTimeOver,
    onRequestCertNumber,
    onRedirectBack,
    onFocusEvent,
    onBlurEvent,
  } = props

  const { alert, hidePopup } = usePopup()

  const inputRef1 = useRef<InputRef>(null)
  const inputRef2 = useRef<InputRef>(null)
  const inputRef3 = useRef<InputRef>(null)
  const inputRef4 = useRef<InputRef>(null)
  const inputRef5 = useRef<InputRef>(null)
  const inputRef6 = useRef<InputRef>(null)
  const timerRef = useRef<TimerRef>(null)

  const [certInputs, setCertInputs] = useState<CertInput[]>([
    { ref: inputRef1, value: '', beforeRef: undefined, nextRef: inputRef2 },
    { ref: inputRef2, value: '', beforeRef: inputRef1, nextRef: inputRef3 },
    { ref: inputRef3, value: '', beforeRef: inputRef2, nextRef: inputRef4 },
    { ref: inputRef4, value: '', beforeRef: inputRef3, nextRef: inputRef5 },
    { ref: inputRef5, value: '', beforeRef: inputRef4, nextRef: inputRef6 },
    { ref: inputRef6, value: '', beforeRef: inputRef5, nextRef: undefined },
  ])

  const [error, setError] = useState<ErrorType>('')
  const [isExtension, setIsExtension] = useState<boolean>(false)
  const [incorrectCount, setIncorrectCount] = useState<number>(0)
  const [reRequestCount, setReRequestCount] = useState<number>(0)

  useImperativeHandle(ref, () => ({
    // 인증번호 불일치시
    setIncorrectError() {
      setError('incorrect')

      const count = incorrectCount + 1
      setIncorrectCount(count)

      if (count < 5) {
        alert({
          title: '안내',
          message: (
            <>
              인증번호가 일치하지 않아요.
              <br />
              확인 후 다시 입력해 주세요.({count}/5)
            </>
          ),
          onOk: (key: string) => {
            hidePopup(key)

            const lastInput = certInputs.at(-1)
            lastInput?.ref.current?.onFocus()
          },
        })
      } else {
        if (count >= 5) {
          if (reRequestCount >= 5) {
            alert({
              title: '안내',
              message: (
                <>
                  인증번호 인증에 실패했어요.
                  <br />
                  본인인증 후 다시 해주세요.
                </>
              ),
              onOk: (key: string) => {
                hidePopup(key)
                onRedirectBack()
              },
            })
          } else {
            alert({
              title: '안내',
              message: (
                <>
                  연속 5회 인증번호가 일치하지 않아요.
                  <br />
                  인증번호를 재발송 후 진행해 주세요.
                </>
              ),
              onOk: hidePopup,
            })
          }
        }
      }
    },
    onFocusFirst() {
      const [firstInput] = certInputs
      firstInput?.ref.current?.onFocus()
    },
    // 입력된 인증번호 받기
    getCertNumber() {
      const values = certInputs.map(item => item.value)
      if (values.join('').length === 6) {
        if (error !== 'timeOver') {
          return values.join('')
        }
      }

      return ''
    },
    //타임오버에러시 처리
    setTimeOverError(){
      timerRef.current?.onStop()
    }
  }))

  const handlePasteCertNumber = (index: number, value: string) => {
    if (index < 5 && isNumber(value)) {
      const data = value.split('').slice(0, 6 - index)
      const array = Array(6)
        .fill('')
        .map((v, i) => {
          return index > i ? v : data[i - index]
        })

      setCertInputs(prev =>
        prev.map((item, i) => {
          if (array[i]) {
            return { ...item, value: array[i] }
          } else {
            return item
          }
        }),
      )

      const cursorIndex = array.findIndex(v => isEmpty(v))
      if (cursorIndex > -1) {
        const input = certInputs.find((_, i) => i === cursorIndex)
        input?.ref.current?.onFocus()
      } else {
        certInputs.at(-1)?.ref.current?.onFocus()
      }
    }
  }

  const handleChange =
    (index: number, nextRef?: React.RefObject<InputRef>) => (value: string) => {
      if (value.length <= 1) {
        if (isEmpty(value)) {
          // 입력값 지울경우
          setCertInputs(prev =>
            prev.map((item, i: number) => (i === index ? { ...item, value } : item)),
          )
        } else {
          /**
           * 입력값이 있을때 & 기존 입력값이 없을때
           * (=기존 입력값이 있을때 maxLength=1을 수동으로 처리하기 때문에 값 변경을 막는다
           * 이유: 인증번호 자동 붙여넣기가 onPaste이벤트가 아니라 onChange이벤트가 발생하기에 input에 maxLength=1 설정 불가)
           */
          setCertInputs(prev =>
            prev.map((item, i: number) => (i === index ? { ...item, value } : item)),
          )
        }

        if (!isEmpty(value)) {
          if (nextRef) nextRef.current?.onFocus()
        }
      } else {
        handlePasteCertNumber(index, value)
      }

      if (error === 'incorrect') {
        setError('')
      }
    }

  const handlePaste =
    (index: number) => (event: React.ClipboardEvent<HTMLInputElement>) => {
      const clipboardData = event.clipboardData.getData('text')

      handlePasteCertNumber(index, clipboardData)
    }

  const handleMove = (ref?: React.RefObject<InputRef>) => () => {
    if (ref) {
      ref.current?.onFocus()
    }
  }

  const handleFinishTimer = () => {
    setError('timeOver')
    onTimeOver()
  }

  const handleExtension = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (error === 'timeOver') {
      alert({
        title: '안내',
        message:
          '인증 시간이 초과되어 시간 연장을 할 수 없어요. 인증번호 재발송을 진행해주세요.',
        onOk: hidePopup,
      })
    } else if (incorrectCount >= 5) {
      alert({
        title: '안내',
        message: (
          <>
            연속 5회 인증번호가 일치하지 않을 경우 시간연장을 지원하지 않아요.
            <br />
            인증번호를 재발송 후 진행해주세요.
          </>
        ),
        onOk: hidePopup,
      })
    } else {
      setIsExtension(true)
      // setIncorrectCount(0) //연장했을경우 틀린횟수 초기화 하지 않도록 수정요구
      timerRef.current?.onExtension(180)
    }
  }

  const handleRequestCertNumber = () => {
    setCertInputs(prev =>
      prev.map(item => {
        return { ...item, value: '' }
      }),
    )
    setError('')
    setIsExtension(false)
    setIncorrectCount(0)
    timerRef?.current?.onStart()

    const count = reRequestCount + 1
    setReRequestCount(count)
    onRequestCertNumber()

    const message =
      count < 5 ? (
        <>
          {`인증번호를 ${count}회 재발송했어요.`}
          <br />
          확인 후 다시 입력해 주세요.({count}/5)
        </>
      ) : (
        <>
          인증번호 재발송은 5회 제공해 드려요.
          <br />
          인증번호 확인 후 신중하게 입력해 주세요.
        </>
      )

    alert({
      title: '안내',
      message: message,
      onOk: (key: string) => {
        hidePopup(key)
        const [firstInput] = certInputs
        firstInput?.ref.current?.onFocus()
      },
    })
  }

  useEffect(() => {
    setTimeout(() => {
      const [firstInput] = certInputs
      firstInput?.ref.current?.onFocus()
    }, 500)
  }, [])

  useEffect(() => {
    const values = certInputs.map(item => item.value)
    if (values.join('').length === 6) {
      if (error !== 'timeOver') {
        onComplete(values.join(''))
      }
    }
  }, [certInputs])

  const divRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Box ref={divRef} className={styles.certified}>
        <Typography.Text size="sm" className={styles.label}>
          인증번호
        </Typography.Text>
        <Box className={styles.rela}>
          <Box className={styles.number}>
            {certInputs.map((input: CertInput, index: number) => (
              <Input
                key={index}
                ref={input.ref}
                type="cert"
                value={input.value}
                disabled={incorrectCount === 5 || error === 'timeOver'}
                placeholder={String(index + 1)}
                status={!isEmpty(error) ? 'error' : 'info'}
                onChange={handleChange(index, input.nextRef)}
                onKeyPressEnter={handleMove(input.nextRef)}
                onKeyPressBackspace={handleMove(input.beforeRef)}
                onPaste={handlePaste(index)}
                onFocusEvent={onFocusEvent}
                onBlurEvent={onBlurEvent}
              />
            ))}
          </Box>

          <Box className={styles.timeWrap}>
            <Box className={styles.timer}>
              {/* 입력시간 초과 오류 메세지 or 타이머 표기 */}
              {error === 'timeOver' ? (
                <Box className={styles.timeOver}>
                  <HelperText type="error">
                    인증번호 입력 시간을 초과하였습니다.
                  </HelperText>
                </Box>
              ) : (
                incorrectCount < 5 && (
                  <Timer ref={timerRef} seconds={180} onFinish={handleFinishTimer} />
                )
              )}
            </Box>
            {!isExtension && (
              <a className={styles.linkExtension} href="#" onClick={handleExtension}>
                <HelperText type="success">연장</HelperText>
              </a>
            )}
          </Box>
        </Box>
      </Box>
      {reRequestCount < 5 && (
        <Box className={styles.btnTxt}>
          <a href="#" onClick={handleRequestCertNumber}>
            <Typography.Text size="md" type="primary">
              인증번호를 다시 받을래요.
            </Typography.Text>
          </a>
        </Box>
      )}
    </>
  )
}

export const CertNumber = forwardRef(CertNumberComponent)
