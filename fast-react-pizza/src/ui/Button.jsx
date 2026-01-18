import { Link } from 'react-router'

export default function Button({ children, to, disabled }) {
  const Tag = to ? Link : 'button'
  return (
    <Tag
      {...{ disabled, to }}
      className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold
        text-stone-800 uppercase transition-colors duration-300
        hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300
        focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed
        sm:px-6 sm:py-3"
    >
      {children}
    </Tag>
  )
}
