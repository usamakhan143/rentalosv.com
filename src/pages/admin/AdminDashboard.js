import React, { useState, useEffect } from "react";
import {
  Users,
  Car,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
    activeTrips: 0,
    newUsersThisMonth: 0,
    conversionRate: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch total users
      const usersQuery = query(collection(db, "users"));
      const usersSnapshot = await getDocs(usersQuery);
      const totalUsers = usersSnapshot.size;

      // Fetch total cars
      const carsQuery = query(collection(db, "cars"));
      const carsSnapshot = await getDocs(carsQuery);
      const totalCars = carsSnapshot.size;

      // Fetch total bookings
      const bookingsQuery = query(collection(db, "bookings"));
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const totalBookings = bookingsSnapshot.size;

      // Calculate total revenue (from completed bookings)
      let totalRevenue = 0;
      bookingsSnapshot.forEach((doc) => {
        const booking = doc.data();
        if (booking.status === "completed" && booking.totalCost) {
          totalRevenue += booking.totalCost;
        }
      });

      // Fetch pending car approvals
      const pendingCarsQuery = query(
        collection(db, "cars"),
        where("status", "==", "pending"),
      );
      const pendingCarsSnapshot = await getDocs(pendingCarsQuery);
      const pendingApprovals = pendingCarsSnapshot.size;

      // Fetch active trips
      const activeTripsQuery = query(
        collection(db, "bookings"),
        where("status", "==", "active"),
      );
      const activeTripsSnapshot = await getDocs(activeTripsQuery);
      const activeTrips = activeTripsSnapshot.size;

      // Calculate new users this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      let newUsersThisMonth = 0;
      usersSnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.createdAt && user.createdAt.toDate() >= startOfMonth) {
          newUsersThisMonth++;
        }
      });

      // Calculate conversion rate (bookings/users)
      const conversionRate =
        totalUsers > 0 ? ((totalBookings / totalUsers) * 100).toFixed(1) : 0;

      setStats({
        totalUsers,
        totalCars,
        totalBookings,
        totalRevenue,
        pendingApprovals,
        activeTrips,
        newUsersThisMonth,
        conversionRate,
      });

      // Fetch recent activity (latest bookings)
      const recentBookingsQuery = query(
        collection(db, "bookings"),
        orderBy("createdAt", "desc"),
        limit(5),
      );
      const recentBookingsSnapshot = await getDocs(recentBookingsQuery);
      const recentBookings = [];

      for (const doc of recentBookingsSnapshot.docs) {
        const booking = doc.data();
        // Fetch user details
        const userDoc = await getDocs(
          query(collection(db, "users"), where("uid", "==", booking.renterId)),
        );
        const userData = userDoc.docs[0]?.data();

        recentBookings.push({
          id: doc.id,
          ...booking,
          userName: userData
            ? `${userData.firstName} ${userData.lastName}`
            : "Unknown User",
        });
      }

      setRecentActivity(recentBookings);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color = "primary",
    change = null,
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p
              className={`text-xs mt-1 ${change.positive ? "text-success-600" : "text-error-600"}`}
            >
              {change.positive ? "+" : ""}
              {change.value}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning-100 text-warning-800";
      case "confirmed":
        return "bg-primary-100 text-primary-800";
      case "active":
        return "bg-success-100 text-success-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-error-100 text-error-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of your car sharing platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          color="primary"
        />
        <StatCard
          title="Total Cars"
          value={stats.totalCars.toLocaleString()}
          icon={Car}
          color="secondary"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings.toLocaleString()}
          icon={CheckCircle}
          color="success"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="success"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon={AlertCircle}
          color="warning"
        />
        <StatCard
          title="Active Trips"
          value={stats.activeTrips}
          icon={Clock}
          color="primary"
        />
        <StatCard
          title="New Users (This Month)"
          value={stats.newUsersThisMonth}
          icon={TrendingUp}
          color="success"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={Star}
          color="primary"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Bookings
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivity.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.userName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.carTitle || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${booking.totalCost?.toLocaleString() || "0"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.createdAt?.toDate().toLocaleDateString() || "N/A"}
                  </td>
                </tr>
              ))}
              {recentActivity.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No recent bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
