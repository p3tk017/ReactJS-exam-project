import {Routes, Route} from 'react-router'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Catalog from './components/catalog-component/Catalog'
import Brands from './components/brands-component/Brands'
import About from './components/about-component/About'

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog/>} />
        <Route path="/brands" element={<Brands/>} />
        <Route path="/about" element={<About/>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
