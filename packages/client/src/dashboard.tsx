import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { Dashboards } from "./pages/Dashboards";

export function Dashboard() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
      <GlobalStyle/>
        <Dashboards/>
      </ThemeProvider>
    </>
  )
}


