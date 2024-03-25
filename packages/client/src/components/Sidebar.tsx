import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useOnClickOutside } from '../utils/hooks/onClickOutside'

const SideBarContainer = styled.div<{ $show?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 25vw;
  background-color: #ecf0f1;
  transform: ${props => (props.$show ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  padding: 2rem;
  z-index: 10;
`

const Backdrop = styled.div<{ $show?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  z-index: 5;
  opacity: ${props => (props.$show ? 1 : 0)};
  visibility: ${props => (props.$show ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 100px;
  height: 50px;
`

const SideBar = () => {
  const [show, setShow] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setShow(false))

  return (
    <>
      <Backdrop $show={show} />
      <SideBarContainer ref={ref} $show={show}>
        <img src="https://via.placeholder.com/150" alt="Imagem da atração" />
        <h1>Nome da atração</h1>
        <h2>Descrição</h2>
        <p></p>
        <h2>Localidade</h2>
        <p></p>
      </SideBarContainer>
      <Button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'} Detalhes
      </Button>
    </>
  )
}

export default SideBar
