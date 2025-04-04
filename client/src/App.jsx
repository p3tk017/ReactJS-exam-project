import {Routes, Route} from 'react-router'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from './contexts/userContext'
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
import CologneCreate from './components/cologne-create-component/CologneCreate'
import EditBrand from './components/edit-brand-component/EditBrand'
import DeleteBrand from './components/delete-brand-component/DeleteBrand'

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
    <UserContext.Provider value={{user, setUser}}>
      <Header isLogged={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog/>} />
        <Route path="/catalog/:cologneId" element={<CologneDetails/>} />
        <Route path="/brands" element={<Brands/>} />
        <Route path="/brands/:brandId" element={<BrandDetails />} />
        <Route path="/brands/create" element={!user ? <Navigate to="/" /> : <BrandCreate/>} />
        <Route path="/brands/edit/:brandId" element={!user ? <Navigate to="/" /> : <EditBrand/>} />
        <Route path="/brands/add-cologne/:brandId" element={<CologneCreate/>} />
        <Route path="/brands/delete/:brandId" element={<DeleteBrand/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/logout" element={<Logout setUser={setUser} />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>

      <Footer />
    </UserContext.Provider>
  )
}

export default App