
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './components/theme/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
