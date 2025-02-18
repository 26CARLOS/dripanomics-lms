import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth-context/index.jsx'
import InstructorProvider from './context/instructor-context/index.jsx'
import StudentProvider from './context/student-context'
import {Toaster} from "@/components/ui/toaster"
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
<HelmetProvider>
  <AuthProvider>
    <InstructorProvider>
      <StudentProvider>
        <App/>
        <Toaster/>
      </StudentProvider>
    </InstructorProvider>
  </AuthProvider>
  </HelmetProvider>
</BrowserRouter>
)
