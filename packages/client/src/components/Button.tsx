import styled from 'styled-components'

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.eclipse};
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  height: 56px;
  width: 56px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors['grey-medium']};
  }
`
