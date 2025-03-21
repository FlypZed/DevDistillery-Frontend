import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Board from './components/pages/Board'
import Tasks from './components/pages/Tasks'
import { ThemeProvider } from '@mui/material/styles'
import { customMUITheme } from './AppThemeStyles'



function App() {
  return (
    <ThemeProvider theme={customMUITheme}>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/board" element={<Board />} /> 
        <Route path="/tasks" element={<Tasks />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App