
export const Link = ({ href, children, ...props }) => {
  // Destructure and ignore `isExternal` and any other non-DOM props
  const { isExternal, ...rest } = props
  return <a href={href} {...rest}>{children}</a>
}