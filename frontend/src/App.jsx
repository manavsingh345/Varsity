import './App.css'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './landing_page/home/HomePage.jsx';
import Signup from './landing_page/signup/Signup.jsx';
import Login from './landing_page/signup/Login.jsx';

import AboutPage from './landing_page/about/AboutPage.jsx';
import ProductsPage from './landing_page/products/ProductsPage.jsx';
import PricingPage from './landing_page/pricing/PricingPage.jsx';
import Support from './landing_page/support/Support.jsx';
import NotFound from './landing_page/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/product' element={<ProductsPage />}></Route>
        <Route path='/pricing' element={<PricingPage />}></Route>
        <Route path='/support' element={<Support />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
