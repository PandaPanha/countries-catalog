import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Modal from './components/CountryModal';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Modal/>
    <App />
  </StrictMode>,
)
