import styled from 'styled-components'

export const ResultBox = styled.div`
  max-height: 150px;
  max-width: 300px;
  overflow: auto;
  position: absolute;
  z-index: 10;
  padding-top: 0.5rem;
  font-size: 1.1rem;
  background-color: white;
  border-radius: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: #888 #f5f5f5;

  /* For Webkit browsers */
  &::-webkit-scrollbar {
    width: thin;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
  }

  &::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }
`
