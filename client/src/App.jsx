import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppContextProvider from './Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Invoice from './pages/Invoice';
import Verify from './pages/Verify';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import Details from './pages/Details';

function App() {
  return (
    <AppContextProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/newinvoice' element={<Invoice />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify/:token' element={<Verify />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/details' element={<Details />} />
        </Routes>
        <Footer />
      </Router>
    </AppContextProvider>
  );
}

export default App;
