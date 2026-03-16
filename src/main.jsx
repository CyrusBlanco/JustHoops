import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HoopsProvider } from './context/HoopsContext'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HoopsProvider>
        <App />
      </HoopsProvider>
    </AuthProvider>
  </React.StrictMode>,
)