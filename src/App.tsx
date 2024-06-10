
import './App.css'



import RequireAuth from './components/RequireAuth'
import AppRouter from './AppRoutes';
import { AuthProvider } from './AuthProvider';
import AppBar from './components/header/AppBar';

import {  BrowserRouter as Router } from 'react-router-dom';

function App() {


  return (
    <div className="App">
     <AuthProvider>
      
          <AppRouter />
       
      </AuthProvider>
    </div>
  )
}

export default App
