import { createContext, useContext, useState } from 'react'
import { Toast, ToastProps, ToastType } from './Toast'

interface ToastContextProps {
  success: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
}

const ToastContext: React.Context<ToastContextProps> = createContext({
  success: (message: string, duration?: number) => {},
  info: (message: string, duration?: number) => {},
  error: (message: string, duration?: number) => {},
})

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastProps>({
    show: false,
    message: '',
  })

  const handleToast = (type: ToastType) => (message: string, duration?: number) => {
    setToast({ show: true, message: message, type: type, duration: duration })
  }

  return (
    <ToastContext.Provider
      value={{
        success: handleToast('success'),
        info: handleToast('info'),
        error: handleToast('error'),
      }}
    >
      {children}
      {toast.show && (
        <Toast onClose={() => setToast({ show: false, message: '' })} {...toast} />
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
