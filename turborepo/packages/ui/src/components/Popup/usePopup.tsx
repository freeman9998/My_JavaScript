import React, { createContext, useContext, useState, useEffect } from 'react'
import { Popup, PopupProps } from './Popup'
import { v4 as uuidv4 } from 'uuid'
import { isEmpty } from 'utils'

interface AlertProps {
  title?: string | React.ReactNode
  message: string | React.ReactNode
  okLabel?: string
  onOk: (key: string) => void
}

interface ConfirmProps extends AlertProps {
  cancelLabel?: string
  onCancel?: () => void
}

interface ShowPopupProps extends Omit<PopupProps, 'open'> {
  onOk?: (key: string) => void
  content: (key: string) => React.ReactNode
}

interface PopupContextProps {
  alert: (props: AlertProps) => string
  confirm: (props: ConfirmProps) => string
  showPopup: (props: ShowPopupProps) => string
  hidePopup: (key: string | string[]) => void
  hidePopupAll: () => void
}

const PopupContext: React.Context<PopupContextProps> = createContext({
  alert: (props: AlertProps) => '',
  confirm: (props: ConfirmProps) => '',
  showPopup: (props: ShowPopupProps) => '',
  hidePopup: (key: string | string[]) => {},
  hidePopupAll: () => {},
})

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [popups, setPopups] = useState<PopupProps[]>([])
  const handleAlert = (props: AlertProps) => {
    const { title, message, okLabel, onOk } = props

    const popupKey = uuidv4()
    setPopups(prev => {
      return [
        ...prev,
        {
          key: popupKey,
          open: true,
          title,
          content: message,
          okButtonProps: { label: okLabel },
          onOk: () => onOk(popupKey),
        },
      ]
    })
    return popupKey
  }

  const handleConfirm = (props: ConfirmProps) => {
    const { title, message, okLabel, onOk, cancelLabel, onCancel } = props
    const popupKey = uuidv4()
    setPopups(prev => {
      return [
        ...prev,
        {
          key: popupKey,
          open: true,
          title,
          content: message,
          okButtonProps: { label: okLabel },
          cancelButtonProps: { label: cancelLabel },
          onOk: () => onOk(popupKey),
          onCancel: () => {
            onCancel?.()
            handleHide(popupKey)
          },
        },
      ]
    })
    return popupKey
  }

  const handleShow = (props: ShowPopupProps) => {
    const { content, onOk, onCancel, ...rest } = props
    const popupKey = uuidv4()
    setPopups(prev => {
      return [
        ...prev,
        {
          ...rest,
          key: popupKey,
          content: content(popupKey),
          open: true,
          onOk: () => {
            onOk?.(popupKey)
          },
          onCancel: () => {
            onCancel?.()
            handleHide(popupKey)
          },
        },
      ]
    })
    return popupKey
  }

  const handleHide = (keys: string | string[]) => {
    setPopups(prev =>
      prev.map(item => {
        if (typeof keys === 'string') {
          return item.key === keys ? { ...item, open: false } : item
        } else {
          return keys.includes(item.key) ? { ...item, open: false } : item
        }
      }),
    )
  }

  const handleHideAll = () => {
    setPopups(prev => prev.map(item => ({ ...item, open: false })))
  }

  useEffect(() => {
    const result = popups.filter(item => !item.open)
    if (!isEmpty(result)) {
      setPopups(prev => prev.filter(item => item.open))
    }
  }, [popups])

  return (
    <PopupContext.Provider
      value={{
        alert: handleAlert,
        confirm: handleConfirm,
        showPopup: handleShow,
        hidePopup: handleHide,
        hidePopupAll: handleHideAll,
      }}
    >
      {children}
      {popups.map(popup => (
        <Popup
          {...popup}
          onClose={() => {
            popup.onClose?.()
            handleHide(popup.key)
          }}
        />
      ))}
    </PopupContext.Provider>
  )
}

export const usePopup = () => useContext(PopupContext)
