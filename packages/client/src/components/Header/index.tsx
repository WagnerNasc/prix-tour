import { CustomerRouteButton, HeaderContainer, HeaderContent } from "./styles";
import logoImage from "../../assets/logo.jpg"
import * as Dialog from '@radix-ui/react-dialog'
import { OrderlyService } from "../OrderlyService";
import { Link } from "react-router-dom";

export function Header() {
  return(
    <HeaderContainer>
      <HeaderContent>
        <div className="brand">
          <Link to={'/'}>
            <img src={logoImage} alt="logo"/>
          </Link>
          
          <span> Prix Tour </span>
        </div>
        <div className="menu">
          <CustomerRouteButton>
              <Link to={'/dashboard'}>Dashboard</Link>
          </CustomerRouteButton>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <CustomerRouteButton>Rota de atendimento</CustomerRouteButton>
            </Dialog.Trigger>
            <OrderlyService/>
          </Dialog.Root>
        </div>
      </HeaderContent>  
    </HeaderContainer>
  )
}