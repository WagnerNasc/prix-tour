import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { ToastContainer } from 'react-toastify';
import { CustomerProvider } from "./contexts/CustomerContext";
import { Customers } from "./pages/Customers";

export function Customer() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle/>
          <CustomerProvider>
            <Customers/>
          </CustomerProvider>
          <ToastContainer />
      </ThemeProvider>
    </>
  )
}


