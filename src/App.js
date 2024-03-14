import './App.scss';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Authentication from './pages/Authentication/Authentication';
import Register from './pages/Register/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/authenticate' element={<Authentication />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
