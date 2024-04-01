import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/index.tsx'
import { GlobalStyle } from './styles/global.ts'
import { FiltersProvider } from './contexts/MapsContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <FiltersProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </FiltersProvider>
    </BrowserRouter>
  </React.StrictMode>
)
