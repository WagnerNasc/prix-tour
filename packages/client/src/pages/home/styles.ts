import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { device } from '../../styles/breakpoints'

export const Header = styled.header`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;

  @media ${device.sm} {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 32px;
  }
`

export const Logo = styled.img`
  content: url(${logo});
  width: 150px;
  height: 150px;
  cursor: pointer;
`

export const Filters = styled.div`
  display: flex;
  gap: 2rem;
`
