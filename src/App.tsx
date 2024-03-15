
import './App.css'



import RequireAuth from './components/RequireAuth'
import AppRouter from './AppRoutes';
import { AuthProvider } from './AuthProvider';
import AppBar from './components/AppBar';

import {  BrowserRouter as Router } from 'react-router-dom';

function App() {


  return (
    <div className="App">
     <AuthProvider>
        <Router> {/* Оберните все в Router */}
          {/* <AppBar /> */}
          <AppRouter />
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
