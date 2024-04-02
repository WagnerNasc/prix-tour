import { Box, Button, Grommet, Layer, ThemeType } from 'grommet'
import React, { useMemo } from 'react'
import Forms from './forms/forms'
import styled from 'styled-components'
import { points } from './Marker'

const customTheme: ThemeType = {
  button: {
    size: {
      large: {
        border: {
          radius: '5px',
        },
      },
    },

    hover: {
      background: '#3f414e',
    },
  },
}

const FormSection = styled.div`
  max-width: 40vw;
  max-height: 100%;
  padding: 1.5rem;
`

interface ModalProps {
  isOpen: boolean
  newPoint?: points
  setNewPoint?: React.Dispatch<React.SetStateAction<points>>
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ isOpen, newPoint, setNewPoint, setModalOpen }: ModalProps) => {
  const [show, setShow] = React.useState(false)

  useMemo(() => {
    setShow(isOpen)
  }, [isOpen])
  return (
    <Grommet theme={customTheme}>
      <Box>
        <Button
          primary
          label="+"
          color={'#363636'}
          size="large"
          onClick={() => setShow(true)}
        />
        {show && (
          <Layer
            onEsc={() => setShow(false)}
            onClickOutside={() => {
              setNewPoint?.({ key: '', lat: 0, lng: 0 })
              setModalOpen?.(false)
              setShow(false)
            }}
          >
            <FormSection>
              <Forms
                newPoint={newPoint}
                isModalOpen={isOpen => setModalOpen?.(isOpen)}
              />
            </FormSection>
          </Layer>
        )}
      </Box>
    </Grommet>
  )
}

export default Modal
