import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import './App.css';
import Login from './comps/login';
import MainPage from './comps/mainPage';
import { selectIsUserLoggedIn } from './reducers/userReducer';
import { useSelector } from 'react-redux';

function App() {

  const isLogged = useSelector(selectIsUserLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={ isLogged ? <MainPage /> : <Navigate to='/login'/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


