export interface ColProps extends React.ComponentProps<'li'> {
  children: React.ReactNode
  onClick?: () => void
}

export const Col = ({ children, onClick, ...rest }: ColProps) => {
  return (
    <li onClick={onClick} {...rest}>
      {children}
    </li>
  )
}
