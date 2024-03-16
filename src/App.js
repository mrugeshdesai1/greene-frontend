import './App.scss';
import {BrowserRouter,Routes,Route, Form} from 'react-router-dom';
import { useContext } from "react";
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Authentication from './pages/Authentication/Authentication';
import Register from './pages/Register/Register';
import Subscribe from './pages/Subscribe/Subscribe';
import AuthContext from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Profile from './pages/Profile/Profile';

function App() {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/authenticate' element={<Authentication />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/profile' element={<ProtectedRoute user={currentUser}><Profile/></ProtectedRoute>}/>
          <Route path='/subscribe' element={<ProtectedRoute user={currentUser}><Subscribe /></ProtectedRoute>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
