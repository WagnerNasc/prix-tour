import styled from 'styled-components'

type LayoutProps = {
  children: JSX.Element[] | JSX.Element
}

const Div = styled.div`
  margin: 2rem 2rem;
`

const Layout = ({ children }: LayoutProps) => {
  return <Div>{children}</Div>
}

export default Layout
