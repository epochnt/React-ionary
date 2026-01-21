import { Link } from 'react-router'

export default function Button({
  children,
  to,
  disabled,
  size = 'primary',
  onClick,
}) {
  const Tag = to ? Link : 'button'
  const styles = {
    primary: ' px-4 py-3 md:px-6 md:py-3',
    small: ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    rounded: 'px-2.5 py-1 md:px-3 md:py-1.5 text-sm',
  }
  return (
    <Tag
      {...{ disabled, to }}
      className={
        `inline-block rounded-full bg-yellow-400 font-semibold text-stone-800
        uppercase transition-colors duration-300 hover:bg-yellow-300
        focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-1
        focus:outline-none disabled:cursor-not-allowed ` + styles[size]
      }
      onClick={onClick}
    >
      {children}
    </Tag>
  )
}
