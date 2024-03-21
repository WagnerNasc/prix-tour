import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../utils/hooks/onClickOutside';

const SideBarContainer = styled.div<{ $show?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 25vw;
  background-color: #eeeeee;
  transform: ${props => (props.$show ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  padding: 2rem;
  z-index: 10;
`;

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 100px;
  height: 50px;
`;

const SideBar = () => {
  const [show, setShow] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setShow(false));

  return (
    <>
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
  );
};

export default SideBar;
