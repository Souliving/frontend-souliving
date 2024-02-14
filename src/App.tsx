
import './App.css'



import RequireAuth from './components/RequireAuth'
import AppRouter from './AppRoutes';
import { AuthProvider } from './AuthProvider';



function App() {
  

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
    
  )
}

export default App
