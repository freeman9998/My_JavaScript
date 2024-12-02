export interface RowProps extends React.ComponentProps<'ul'> {
  children: React.ReactNode
}

export const Row = ({ children, ...rest }: RowProps) => {
  return <ul {...rest}>{children}</ul>
}
