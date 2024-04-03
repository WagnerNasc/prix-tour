import React, { useMemo, useRef } from 'react'
import Forms from './forms/forms'
import styled from 'styled-components'
import { points } from './map/Marker'
import { Button } from './Button'
import { useOnClickOutside } from '../utils/hooks/onClickOutside'
import { device } from '../styles/breakpoints'

const FormSection = styled.div`
  max-height: 100%;
  padding: 1.5rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const StyledDiv = styled.div`
  width: 30%;

  @media ${device.sm} {
    width: 80%;
  }
`

interface ModalProps {
  isOpen: boolean
  newPoint?: points
  setNewPoint?: React.Dispatch<React.SetStateAction<points>>
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ isOpen, newPoint, setNewPoint, setModalOpen }: ModalProps) => {
  const [show, setShow] = React.useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useMemo(() => {
    setShow(isOpen)
  }, [isOpen])

  useOnClickOutside(ref, () => {
    setNewPoint?.({ key: '', lat: 0, lng: 0 })
    setModalOpen?.(false)
    setShow(false)
  })

  return (
    <div>
      <Button onClick={() => setShow(true)}>+</Button>
      {show && (
        <ModalContainer>
          <StyledDiv ref={ref}>
            <FormSection>
              <Forms
                newPoint={newPoint}
                isModalOpen={isOpen => setModalOpen?.(isOpen)}
              />
            </FormSection>
          </StyledDiv>
        </ModalContainer>
      )}
    </div>
  )
}

export default Modal
