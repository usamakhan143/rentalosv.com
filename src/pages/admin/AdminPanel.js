import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Users,
  Car,
  BarChart3,
  DollarSign,
  MessageSquare,
  Shield,
  AlertTriangle,
} from "lucide-react";

// Admin Components
import AdminDashboard from "./AdminDashboard";
import UserManagement from "./UserManagement";
import CarModeration from "./CarModeration";
import FinancialOverview from "./FinancialOverview";
import SupportTickets from "./SupportTickets";

const AdminPanel = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: BarChart3,
      exact: true,
    },
    {
      path: "/admin/users",
      label: "User Management",
      icon: Users,
    },
    {
      path: "/admin/cars",
      label: "Car Moderation",
      icon: Car,
    },
    {
      path: "/admin/financial",
      label: "Financial Overview",
      icon: DollarSign,
    },
    {
      path: "/admin/support",
      label: "Support Tickets",
      icon: MessageSquare,
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary-600" />
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
          </div>

          <nav className="mt-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary-50 text-primary-700 border-r-2 border-primary-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${active ? "text-primary-600" : "text-gray-400"}`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Alert Section */}
          <div className="mt-8 px-6">
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-warning-600 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-warning-800">
                    Admin Access
                  </h3>
                  <p className="text-xs text-warning-700 mt-1">
                    You have full administrative privileges. Use with caution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="users/*" element={<UserManagement />} />
            <Route path="cars/*" element={<CarModeration />} />
            <Route path="financial/*" element={<FinancialOverview />} />
            <Route path="support/*" element={<SupportTickets />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
