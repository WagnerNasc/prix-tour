import { Box, Button, Grommet, Layer, ThemeType } from 'grommet'
import React from 'react'
import Forms from './forms/forms'
import styled from 'styled-components'

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

const Modal = () => {
  const [show, setShow] = React.useState(false)
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
            onClickOutside={() => setShow(false)}
          >
            <FormSection>
              <Forms />
            </FormSection>
          </Layer>
        )}
      </Box>
    </Grommet>
  )
}

export default Modal
