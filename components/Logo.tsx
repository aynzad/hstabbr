interface Props {
  className?: string
  width?: number
  height?: number
}
export function Logo({
  className = 'fill-white',
  width = 180,
  height = 90
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 219 143"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M213.1 84.7 161 55.5l.3-.4 12.8-15.7a1.8 1.8 0 0 0-2.2-2.7l-18.2 9A12.5 12.5 0 0 1 136 31.5l4.8-19.7a1.8 1.8 0 0 0-3.2-1.5l-12.5 16a12.5 12.5 0 0 1-22-5L98.8 1.3a1.8 1.8 0 0 0-3.5 0L91 21.2a12.5 12.5 0 0 1-22.1 5l-12.5-16c-.5-.6-1.4-.8-2.2-.5-.7.4-1.1 1.3-1 2L58 31.6a12.5 12.5 0 0 1-17.7 14.1l-18.2-9a1.8 1.8 0 0 0-2.5 2.3l.4.7 12.6 15.8a12.5 12.5 0 0 1 .3 15.3c-2.4 3-6 4.8-10 4.8-4.5 0-21-.1-20.6-.2-.8 0-1.6.5-1.8 1.4-.2.8.2 1.6 1 2l18.3 8.8a12.5 12.5 0 0 1-.3 22.7L1 118.5c-.7.4-1.1 1.2-1 2 .2.9 1 1.5 1.8 1.5h38l-5.5 5.5A8.7 8.7 0 1 0 46.6 140L64.4 122h65.2l17.8 17.9a8.7 8.7 0 0 0 12.4-12.4l-5.5-5.4h16.8a6.3 6.3 0 0 0 4.3-11l34.2-6a11 11 0 0 0 3.5-20.4Zm-3.1 10c-.2 1-1 1.7-1.9 1.8l-40.5 7c.1-3.7-3-28.5-9-39.3l50.2 28.1c.9.5 1.3 1.4 1.2 2.4Z" />
      <path d="M181.2 92.9a5 5 0 1 0 0-10.1 5 5 0 0 0 0 10Z" />
    </svg>
  )
}
