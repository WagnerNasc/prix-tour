import styled, { css, keyframes } from 'styled-components'

interface ButtonProps {
  isLoading?: boolean
}

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  width: 100%;
`

export const Title = styled.h2`
  text-align: center;
`

export const FieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Input = styled.input`
  height: 2.2rem;
  padding: 2px 8px;
  font-size: 1rem;
  font-weight: 400;
  border: 1px solid;
  border-color: #cccccc;
  border-radius: 4px;
`

export const ErrorDiv = styled.div`
  color: red;
  font-size: 0.9rem;
  justify-content: start;
`

export const Button = styled.button<ButtonProps>`
  border: none;
  padding: 1rem;
  background-color: #363636;
  color: white;
  border-radius: 5px;
  width: 120px;
  font-weight: 700;
  font-size: 0.82rem;
  margin: auto;
  content: 'Cadastrar';

  &:hover {
    background-color: #3f414e;
  }

  ${props =>
    props.isLoading &&
    css`
      cursor: not-allowed;
      background-color: #363636;
      animation: spin 1s linear infinite;
      content: '';
    `}
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.div`
  display: flex;
  margin: auto;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  animation: ${spin} 0.6s linear infinite;
`
