import { Link } from 'react-router'

export default function CustomLink({ tag = 'button', to, onClick, children }) {
  const Tag = to ? Link : tag
  return (
    <Tag
      className="text-blue-500 hover:text-blue-600 hover:underline"
      {...{ to, onClick }}
    >
      {children}
    </Tag>
  )
}
