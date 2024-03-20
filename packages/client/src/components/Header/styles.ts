import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: ${props => props.theme["gray-900"]};
  padding: 2.5rem 0 3rem;

  span {
    font: 2rem "Roboto", sans-serif;
  }
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .brand {
    display: flex;
    column-gap: 5%;
    align-items: center;
  }

  .brand > span {
    width: 10em;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a > img {
    border-radius: 50%;
  }

  .menu {
    display: flex;
    row-gap: 50px;
  }

  .menu > * {
    margin-right: 1rem; /* Ajuste o espaçamento entre os botões */
  }
`

export const CustomerRouteButton = styled.button`
  height: 50px;
  border: 0;
  background: ${props => props.theme["blue-500"]};
  color: ${props => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s;
  gap: calc(20px + 10%);


  &:hover {
    background: ${props => props.theme["gray-700"]};
  }
`

