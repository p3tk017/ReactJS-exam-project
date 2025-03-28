import {Routes, Route} from 'react-router'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Catalog from './components/catalog-component/Catalog'
import Brands from './components/brands-component/Brands'
import About from './components/about-component/About'
import Contact from './components/contact-component/Contact'
import Register from './components/register-component/Register'
import Login from './components/login-component/Login'
import NotFound from './components/404-component/404'
import CologneDetails from './components/cologne-details-component/CologneDetails'
import BrandDetails from './components/brand-details-component/BrandDetails'
import Logout from './components/logout-component/Logout'
import BrandCreate from './components/create-brand-component/CreateBrand'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
          fetch("http://localhost:3030/users/me", {  
              headers: {"X-Authorization": token},
          })
          .then(res => res.json())
          .then(userData => setUser(userData))
          .catch(() => setUser(null));  
      }
  }, []);

  return (
    <>
      <Header isLogged={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog/>} />
        <Route path="/catalog/:cologneId" element={<CologneDetails/>} />
        <Route path="/brands" element={<Brands/>} />
        <Route path="/brands/:brandId" element={<BrandDetails user={user}/>} />
        <Route path="/brands/create" element={!user ? <Navigate to="/" /> : <BrandCreate user={user}/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/logout" element={<Logout setUser={setUser} />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App