import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Statistics from './components/Statistics';
import Contact from './components/Contact';
import Products from './components/Products';
import CartPage from './pages/CartPage';

import AdminLayout from './pages/admin/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import OrdersView from './pages/admin/OrdersView';
import ProductsManager from './pages/admin/ProductsManager';
import AdminLogin from './pages/admin/AdminLogin';

function Storefront() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-background">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Marquee />
        <About />
        <Services />
        <Statistics />
        <Contact />
      </main>
    </div>
  );
}

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ReturnPolicy from './pages/ReturnPolicy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Storefront />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      
      {/* Legal Pages */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/return-policy" element={<ReturnPolicy />} />
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="orders" element={<OrdersView />} />
        <Route path="products" element={<ProductsManager />} />
      </Route>
    </Routes>
  );
}

export default App;
