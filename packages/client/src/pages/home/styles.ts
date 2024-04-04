import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { device } from '../../styles/breakpoints'

export const Header = styled.header`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1rem 0;

  @media ${device.sm} {
    flex-direction: column;
    gap: 32px;
    margin-bottom: 32px;
  }
`

export const Logo = styled.img`
  content: url(${logo});
  width: 100px;
  height: 100px;
  cursor: pointer;
`

export const Filters = styled.div`
  display: flex;
  gap: 2rem;
`
