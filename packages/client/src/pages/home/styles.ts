import styled from 'styled-components';
import logo from '../../assets/logo.png';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Logo = styled.img`
  content: url(${logo});
  width: 150px;
  height: 150px;
`;

export const Filters = styled.div`
  display: flex;
  gap: 3rem;
`;
