import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import routes from './routes/routes.jsx'
import axios from 'axios'
import AuthProvider from './context/AuthContext.jsx'

// axios.defaults.baseURL = import.meta.env.VITE_API_URL
// axios.interceptors.request.use(function(config){
//   config.headers.Authorization = `Bearer ${}`
//   return config;
// })
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
