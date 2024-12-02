import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

function App() {

  return (
    <div className='flex h-screen justify-center bg-slate-50 '>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard/>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
