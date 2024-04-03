import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/index.tsx'
import { GlobalStyle } from './styles/global.ts'
import { FiltersProvider } from './contexts/MapsContext.tsx'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <FiltersProvider>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </FiltersProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
