import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Explore from "./pages/customer/Explore";
import Restaurant from "./pages/customer/Restaurant";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";
import OrderDetail from "./pages/customer/OrderDetail";
import Profile from "./pages/customer/Profile";
import Favorites from "./pages/customer/Favorites";

// Restaurant Dashboard
import Dashboard from "./pages/restaurant/Dashboard";
import RestaurantOrders from "./pages/restaurant/Orders";
import Menu from "./pages/restaurant/Menu";
import RestaurantSettings from "./pages/restaurant/Settings";

// Delivery
import DeliveryHome from "./pages/delivery/Home";
import ActiveDelivery from "./pages/delivery/ActiveDelivery";
import DeliveryHistory from "./pages/delivery/History";
import DeliveryEarnings from "./pages/delivery/Earnings";
import DeliveryProfile from "./pages/delivery/Profile";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Customer */}
              <Route path="/explore" element={<Explore />} />
              <Route path="/restaurant/:id" element={<Restaurant />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />

              {/* Restaurant Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/orders" element={<RestaurantOrders />} />
              <Route path="/dashboard/menu" element={<Menu />} />
              <Route path="/dashboard/settings" element={<RestaurantSettings />} />

              {/* Delivery */}
              <Route path="/delivery" element={<DeliveryHome />} />
              <Route path="/delivery/active" element={<ActiveDelivery />} />
              <Route path="/delivery/history" element={<DeliveryHistory />} />
              <Route path="/delivery/earnings" element={<DeliveryEarnings />} />
              <Route path="/delivery/profile" element={<DeliveryProfile />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
