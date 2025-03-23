import {Routes, Route} from 'react-router'
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

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog/>} />
        <Route path="/catalog/:cologneId" element={<CologneDetails/>} />
        <Route path="/brands" element={<Brands/>} />
        <Route path="/brands/:brandId" element={<BrandDetails/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
