import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import FAQ from './components/FAQ';
import { useEffect } from 'react';

function App() {

  return (
    <AppContextProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 9000
        }}
      />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/newinvoice' element={<Invoice />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify/:token' element={<Verify />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/details' element={<Details />} />
          <Route path='#faq' element={<FAQ />} />
        </Routes>
        <Footer />
    </AppContextProvider>
  );
}

export default App;
