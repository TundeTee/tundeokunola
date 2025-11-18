import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage.jsx';
import HomePage from './pages/HomePage';
import UserLayout from './layout/UserLayout';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PricingsPage from './pages/PricingsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminAuth from './pages/AdminAuth.jsx';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<UserLayout/>}>
       <Route index element={<HomePage />} />
       <Route path='about' element={ <AboutPage />} />
       <Route path='services' element={ <ServicesPage />} />
       <Route path='pricing' element={ <PricingsPage />} />
       <Route path='blog' element={ <BlogPage/>} />
       <Route path='contact' element={ <ContactPage />} />
       <Route path="/admin/auth" element={<AdminAuth />} />
       <Route path="/admin" element={<AdminPage />} />
       </Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
