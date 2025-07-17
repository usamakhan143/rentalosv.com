import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Search from "./pages/search/Search";
import CarDetail from "./pages/cars/CarDetail";
import Profile from "./pages/user/Profile";
import MyTrips from "./pages/user/MyTrips";
import TripDetail from "./pages/trip/TripDetail";
import MyCars from "./pages/host/MyCars";
import AddCar from "./pages/host/AddCar";
import EditCar from "./pages/host/EditCar";
import HostBookings from "./pages/host/HostBookings";
import AdminPanel from "./pages/admin/AdminPanel";
import Settings from "./pages/user/Settings";
import BecomeHost from "./pages/BecomeHost";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

// Notification Component
import NotificationToast from "./components/NotificationToast";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cars/:id" element={<CarDetail />} />
                <Route path="/become-host" element={<BecomeHost />} />
                <Route path="/how-it-works" element={<HowItWorks />} />

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
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
