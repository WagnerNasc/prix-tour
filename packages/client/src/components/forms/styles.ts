import styled from 'styled-components'

export const FormSection = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`

export const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  margin: 0;
`

export const FieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Input = styled.input`
  height: 2rem;
  padding-left: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
`

export const ErrorDiv = styled.div`
  color: red;
  font-size: 0.9rem;
  justify-content: start;
`

export const Button = styled.button`
  border: none;
  padding: 1rem;
  background-color: #363636;
  color: white;
  border-radius: 5px;
  width: 5vw;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 0.82rem;

  &:hover {
    background-color: #3f414e;
  }
`
