import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";
import { LoginModalProvider } from "./contexts/LoginModalContext";
import { SignupModalProvider } from "./contexts/SignupModalContext";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Search from "./pages/search/Search";
import CarDetail from "./pages/cars/CarDetail";
import Profile from "./pages/user/Profile";
import MyTrips from "./pages/user/MyTrips";
import Favorites from "./pages/user/Favorites";
import Inbox from "./pages/user/Inbox";
import ChangePassword from "./pages/user/ChangePassword";
import ChangePhone from "./pages/user/ChangePhone";
import TripDetail from "./pages/trip/TripDetail";
import MyCars from "./pages/host/MyCars";
import AddCar from "./pages/host/AddCar";
import EditCar from "./pages/host/EditCar";
import ListYourCar from "./pages/host/ListYourCar";
import Calendar from "./pages/host/Calendar";
import Booked from "./pages/host/Booked";
import History from "./pages/host/History";
import HostInbox from "./pages/host/Inbox";
import VehicleListings from "./pages/host/VehicleListings";
import VehicleSettings from "./pages/host/VehicleSettings";
import Earnings from "./pages/business/Earnings";
import Performance from "./pages/business/Performance";
import Ratings from "./pages/business/Ratings";
import Transactions from "./pages/business/Transactions";
import HostBookings from "./pages/host/HostBookings";
import AdminPanel from "./pages/admin/AdminPanel";
import Settings from "./pages/user/Settings";
import BecomeHost from "./pages/BecomeHost";
import HowItWorks from "./pages/HowItWorks";
import Legal from "./pages/Legal";
import InsuranceProtection from "./pages/InsuranceProtection";
import HostTools from "./pages/HostTools";
import Calculator from "./pages/Calculator";
import About from "./pages/About";
import Team from "./pages/Team";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import CarMake from "./pages/CarMake";
import AdminSetup from "./pages/AdminSetup";
import ContactSupport from "./pages/ContactSupport";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

// Notification Component
import NotificationToast from "./components/NotificationToast";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <LoginModalProvider>
            <SignupModalProvider>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/cars/:id" element={<CarDetail />} />
                    <Route path="/become-host" element={<BecomeHost />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route
                      path="/insurance"
                      element={<InsuranceProtection />}
                    />
                    <Route path="/host-tools" element={<HostTools />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/press" element={<Press />} />
                    <Route path="/contact-support" element={<ContactSupport />} />
                    <Route path="/:make" element={<CarMake />} />
                    <Route path="/admin-setup" element={<AdminSetup />} />

                    {/* Protected Routes - Require Authentication */}
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/my-trips"
                      element={
                        <ProtectedRoute>
                          <MyTrips />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/trip/:id"
                      element={
                        <ProtectedRoute>
                          <TripDetail />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <ProtectedRoute>
                          <Settings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/favorites"
                      element={
                        <ProtectedRoute>
                          <Favorites />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/inbox"
                      element={
                        <ProtectedRoute>
                          <Inbox />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/change-password"
                      element={
                        <ProtectedRoute>
                          <ChangePassword />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/change-phone"
                      element={
                        <ProtectedRoute>
                          <ChangePhone />
                        </ProtectedRoute>
                      }
                    />

                    {/* Host Routes */}
                    <Route
                      path="/my-cars"
                      element={
                        <ProtectedRoute>
                          <MyCars />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/add-car"
                      element={
                        <ProtectedRoute>
                          <AddCar />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/edit-car/:id"
                      element={
                        <ProtectedRoute>
                          <EditCar />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/host-bookings"
                      element={
                        <ProtectedRoute>
                          <HostBookings />
                        </ProtectedRoute>
                      }
                    />

                    {/* Host Dashboard Routes */}
                    <Route
                      path="/list-your-car"
                      element={
                        <ProtectedRoute>
                          <ListYourCar />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/calendar"
                      element={
                        <ProtectedRoute>
                          <Calendar />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/trips/booked"
                      element={
                        <ProtectedRoute>
                          <Booked />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/trips/history"
                      element={
                        <ProtectedRoute>
                          <History />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/host/inbox"
                      element={
                        <ProtectedRoute>
                          <HostInbox />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/vehicles/listings"
                      element={
                        <ProtectedRoute>
                          <VehicleListings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/vehicles/settings"
                      element={
                        <ProtectedRoute>
                          <VehicleSettings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/business/earnings"
                      element={
                        <ProtectedRoute>
                          <Earnings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/business/performance"
                      element={
                        <ProtectedRoute>
                          <Performance />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/business/ratings"
                      element={
                        <ProtectedRoute>
                          <Ratings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/business/transactions"
                      element={
                        <ProtectedRoute>
                          <Transactions />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Routes */}
                    <Route
                      path="/admin/*"
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminPanel />
                        </ProtectedRoute>
                      }
                    />

                    {/* Error Pages */}
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <NotificationToast />
              </div>
            </SignupModalProvider>
          </LoginModalProvider>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
