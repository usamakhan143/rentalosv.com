import React, { useState, useEffect, useCallback } from "react";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  RefreshCw,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Button from "../../components/ui/Button";

const FinancialOverview = () => {
  const [financialData, setFinancialData] = useState({
    totalRevenue: 0,
    totalCommission: 0,
    totalPayouts: 0,
    pendingPayouts: 0,
    monthlyRevenue: [],
    recentTransactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30"); // days

  const fetchFinancialData = useCallback(async () => {
    try {
      setLoading(true);

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - parseInt(dateRange));

      // Fetch completed bookings for revenue calculation
      const bookingsQuery = query(
        collection(db, "bookings"),
        where("status", "==", "completed"),
        orderBy("createdAt", "desc"),
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);

      let totalRevenue = 0;
      let totalCommission = 0;
      let totalPayouts = 0;
      const monthlyData = {};
      const transactions = [];

      bookingsSnapshot.forEach((doc) => {
        const booking = doc.data();
        const bookingDate = booking.createdAt?.toDate();

        if (booking.totalCost) {
          totalRevenue += booking.totalCost;

          // Calculate commission (assume 15% platform fee)
          const commission = booking.totalCost * 0.15;
          totalCommission += commission;

          // Calculate host payout (85% of total)
          const payout = booking.totalCost * 0.85;
          totalPayouts += payout;

          // Group by month for chart
          if (bookingDate) {
            const monthKey = `${bookingDate.getFullYear()}-${bookingDate.getMonth()}`;
            if (!monthlyData[monthKey]) {
              monthlyData[monthKey] = { revenue: 0, commission: 0, count: 0 };
            }
            monthlyData[monthKey].revenue += booking.totalCost;
            monthlyData[monthKey].commission += commission;
            monthlyData[monthKey].count += 1;
          }

          // Add to recent transactions
          if (bookingDate && bookingDate >= startDate) {
            transactions.push({
              id: doc.id,
              type: "booking",
              amount: booking.totalCost,
              commission: commission,
              payout: payout,
              date: bookingDate,
              carTitle: booking.carTitle || "N/A",
              hostId: booking.hostId,
            });
          }
        }
      });

      // Fetch pending payouts (bookings completed but not paid out)
      const pendingPayoutsQuery = query(
        collection(db, "bookings"),
        where("status", "==", "completed"),
        where("hostPaid", "==", false),
      );
      const pendingPayoutsSnapshot = await getDocs(pendingPayoutsQuery);

      let pendingPayouts = 0;
      pendingPayoutsSnapshot.forEach((doc) => {
        const booking = doc.data();
        if (booking.totalCost) {
          pendingPayouts += booking.totalCost * 0.85; // Host's share
        }
      });

      // Convert monthly data to array for charts
      const monthlyRevenue = Object.entries(monthlyData)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, data]) => {
          const [year, month] = key.split("-");
          return {
            month: new Date(year, month).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            }),
            revenue: data.revenue,
            commission: data.commission,
            bookings: data.count,
          };
        });

      setFinancialData({
        totalRevenue,
        totalCommission,
        totalPayouts,
        pendingPayouts,
        monthlyRevenue,
        recentTransactions: transactions.slice(0, 10),
      });
    } catch (error) {
      console.error("Error fetching financial data:", error);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchFinancialData();
  }, [fetchFinancialData]);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend = null,
    color = "primary",
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <div
              className={`flex items-center mt-2 text-sm ${trend.positive ? "text-success-600" : "text-error-600"}`}
            >
              {trend.positive ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {trend.value}% vs last period
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Financial Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor revenue, commissions, and payouts
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <Button variant="outline" onClick={fetchFinancialData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="primary">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`$${financialData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="success"
        />
        <StatCard
          title="Platform Commission"
          value={`$${financialData.totalCommission.toLocaleString()}`}
          icon={TrendingUp}
          color="primary"
        />
        <StatCard
          title="Host Payouts"
          value={`$${financialData.totalPayouts.toLocaleString()}`}
          icon={CreditCard}
          color="secondary"
        />
        <StatCard
          title="Pending Payouts"
          value={`$${financialData.pendingPayouts.toLocaleString()}`}
          icon={RefreshCw}
          color="warning"
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Monthly Revenue Trend
          </h2>
        </div>
        <div className="p-6">
          {financialData.monthlyRevenue.length > 0 ? (
            <div className="space-y-4">
              {financialData.monthlyRevenue.slice(-6).map((month, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {month.month}
                    </div>
                    <div className="text-sm text-gray-600">
                      {month.bookings} bookings
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      ${month.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Commission: ${month.commission.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No revenue data available for the selected period
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission (15%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Host Payout (85%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialData.recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.carTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-success-600 font-medium">
                    ${transaction.commission.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${transaction.payout.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-success-100 text-success-800">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
              {financialData.recentTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No transactions found for the selected period
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

export default FinancialOverview;
