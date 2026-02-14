import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap pertama
import './index.css';                         // Reset kedua
import './App.css';            
import 'bootstrap-icons/font/bootstrap-icons.css';               // Custom Oranye terakhir
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)