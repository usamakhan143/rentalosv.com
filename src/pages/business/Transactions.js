import React, { useState } from "react";
import { 
  Calendar as CalendarIcon,
  Triangle,
  MessageCircle,
  Car,
  Briefcase,
  MoreHorizontal,
  Download,
  Filter,
  Search,
  ChevronDown,
  TrendingUp,
  DollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate();
  const [showTripsDropdown, setShowTripsDropdown] = useState(false);
  const [showVehiclesDropdown, setShowVehiclesDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedType, setSelectedType] = useState("All transactions");

  const sidebarItems = [
    { icon: CalendarIcon, label: "Calendar", path: "/calendar", active: false },
    { 
      icon: Triangle, 
      label: "Trips", 
      path: "/trips", 
      active: false,
      hasDropdown: true,
      dropdownItems: [
        { label: "Booked", path: "/trips/booked" },
        { label: "History", path: "/trips/history" }
      ]
    },
    { icon: MessageCircle, label: "Inbox", path: "/host/inbox", active: false },
    { 
      icon: Car, 
      label: "Vehicles", 
      path: "/vehicles", 
      active: false,
      hasDropdown: true,
      noNavigation: true,
      dropdownItems: [
        { label: "Listings", path: "/vehicles/listings" },
        { label: "Settings", path: "/vehicles/settings" }
      ]
    },
    { 
      icon: Briefcase, 
      label: "Business", 
      path: "/business", 
      active: true,
      hasDropdown: true,
      noNavigation: true,
      dropdownItems: [
        { label: "Earnings", path: "/business/earnings" },
        { label: "Performance", path: "/business/performance" },
        { label: "Ratings & reviews", path: "/business/ratings" },
        { label: "Transaction history", path: "/business/transactions" }
      ]
    },
    { 
      icon: MoreHorizontal, 
      label: "More", 
      path: "/more", 
      active: false, 
      hasNotification: true, 
      noNavigation: true,
      hasDropdown: true,
      dropdownItems: [
        { label: "Contact support", path: "/contact-support" },
        { label: "Host tools", path: "/host-tools" },
        { label: "Insurance & protection", path: "/insurance" },
        { label: "Calculator", path: "/calculator" },
        { label: "Legal", path: "/legal" }
      ]
    }
  ];

  const handleDropdown = (item, dropdown) => {
    if (item.label === "Trips") {
      setShowTripsDropdown(dropdown);
      setShowVehiclesDropdown(false);
      setShowBusinessDropdown(false);
      setShowMoreDropdown(false);
    } else if (item.label === "Vehicles") {
      setShowVehiclesDropdown(dropdown);
      setShowTripsDropdown(false);
      setShowBusinessDropdown(false);
      setShowMoreDropdown(false);
    } else if (item.label === "Business") {
      setShowBusinessDropdown(dropdown);
      setShowTripsDropdown(false);
      setShowVehiclesDropdown(false);
      setShowMoreDropdown(false);
    } else if (item.label === "More") {
      setShowMoreDropdown(dropdown);
      setShowTripsDropdown(false);
      setShowVehiclesDropdown(false);
      setShowBusinessDropdown(false);
    }
  };

  // Dummy transaction data
  const transactions = [
    {
      id: "TXN-2024-001",
      type: "payout",
      amount: 450.00,
      description: "Trip payout - BMW X5 rental",
      guest: "Emily Johnson",
      vehicle: "2022 BMW X5",
      date: "2024-01-15",
      status: "completed",
      tripDates: "Jan 10-12, 2024",
      paymentMethod: "Bank Transfer",
      processingFee: 13.50
    },
    {
      id: "TXN-2024-002",
      type: "payout",
      amount: 320.00,
      description: "Trip payout - Tesla Model 3 rental",
      guest: "Michael Chen",
      vehicle: "2023 Tesla Model 3",
      date: "2024-01-20",
      status: "completed",
      tripDates: "Jan 15-18, 2024",
      paymentMethod: "Bank Transfer",
      processingFee: 9.60
    },
    {
      id: "TXN-2024-003",
      type: "pending",
      amount: 275.00,
      description: "Trip payout - BMW X5 rental",
      guest: "Sarah Williams",
      vehicle: "2022 BMW X5",
      date: "2024-01-25",
      status: "pending",
      tripDates: "Jan 22-24, 2024",
      paymentMethod: "Bank Transfer",
      processingFee: 8.25
    },
    {
      id: "TXN-2024-004",
      type: "payout",
      amount: 520.00,
      description: "Trip payout - Tesla Model 3 rental",
      guest: "David Rodriguez",
      vehicle: "2023 Tesla Model 3",
      date: "2024-01-30",
      status: "completed",
      tripDates: "Jan 25-29, 2024",
      paymentMethod: "Bank Transfer",
      processingFee: 15.60
    },
    {
      id: "TXN-2024-005",
      type: "adjustment",
      amount: -25.00,
      description: "Cleaning fee adjustment",
      guest: "Jennifer Lee",
      vehicle: "2022 BMW X5",
      date: "2024-02-05",
      status: "completed",
      tripDates: "Jan 30 - Feb 2, 2024",
      paymentMethod: "Platform Credit",
      processingFee: 0
    },
    {
      id: "TXN-2024-006",
      type: "payout",
      amount: 380.00,
      description: "Trip payout - BMW X5 rental",
      guest: "Robert Taylor",
      vehicle: "2022 BMW X5",
      date: "2024-02-10",
      status: "completed",
      tripDates: "Feb 5-8, 2024",
      paymentMethod: "Bank Transfer",
      processingFee: 11.40
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "payout":
        return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case "adjustment":
        return <ArrowDownLeft className="w-4 h-4 text-red-500" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-400" />;
    }
  };

  const totalEarnings = transactions
    .filter(t => t.status === "completed" && t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter(t => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFees = transactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + t.processingFee, 0);

  const handleDownloadCSV = () => {
    const csvContent = [
      ["Transaction ID", "Date", "Type", "Description", "Guest", "Vehicle", "Trip Dates", "Amount", "Processing Fee", "Status", "Payment Method"],
      ...transactions.map(t => [
        t.id,
        t.date,
        t.type,
        t.description,
        t.guest,
        t.vehicle,
        t.tripDates,
        `£${t.amount.toFixed(2)}`,
        `£${t.processingFee.toFixed(2)}`,
        t.status,
        t.paymentMethod
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8 fixed h-full z-10">
        {sidebarItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="relative group">
              <button
                onClick={() => {
                  if (item.hasDropdown) {
                    if (item.label === "Trips") {
                      setShowTripsDropdown(!showTripsDropdown);
                      setShowVehiclesDropdown(false);
                      setShowBusinessDropdown(false);
                      setShowMoreDropdown(false);
                    } else if (item.label === "Vehicles") {
                      setShowVehiclesDropdown(!showVehiclesDropdown);
                      setShowTripsDropdown(false);
                      setShowBusinessDropdown(false);
                      setShowMoreDropdown(false);
                    } else if (item.label === "Business") {
                      setShowBusinessDropdown(!showBusinessDropdown);
                      setShowTripsDropdown(false);
                      setShowVehiclesDropdown(false);
                      setShowMoreDropdown(false);
                    } else if (item.label === "More") {
                      setShowMoreDropdown(!showMoreDropdown);
                      setShowTripsDropdown(false);
                      setShowVehiclesDropdown(false);
                      setShowBusinessDropdown(false);
                    }
                  } else if (!item.noNavigation) {
                    navigate(item.path);
                  }
                }}
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    handleDropdown(item, true);
                  }
                }}
                className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors relative ${
                  item.active 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-6 h-6" />
                {item.hasNotification && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </button>
              <div className="text-xs text-gray-600 text-center mt-1 font-medium">
                {item.label}
              </div>

              {/* Dropdown */}
              {item.hasDropdown && (
                (item.label === "Trips" && showTripsDropdown) ||
                (item.label === "Vehicles" && showVehiclesDropdown) ||
                (item.label === "Business" && showBusinessDropdown) ||
                (item.label === "More" && showMoreDropdown)
              ) && (
                <div
                  className={`absolute left-16 top-0 bg-white border border-gray-100 rounded-xl py-3 z-20 backdrop-blur-sm bg-white/95 ${
                    item.label === "Business" ? "w-40" : item.label === "More" ? "w-44" : "w-28"
                  }`}
                  style={{
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(0, 53, 82, 0.08)'
                  }}
                  onMouseLeave={() => handleDropdown(item, false)}
                >
                  {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                    <button
                      key={dropdownIndex}
                      onClick={() => {
                        navigate(dropdownItem.path);
                        handleDropdown(item, false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 text-gray-700 text-sm font-medium rounded-lg mx-1 group relative overflow-hidden"
                    >
                      <span className="group-hover:text-gray-900 transition-colors duration-200 relative z-10">
                        {dropdownItem.label}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ color: "#003552" }}>Transaction history</h1>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All transactions</option>
                <option>Payouts</option>
                <option>Adjustments</option>
                <option>Pending</option>
              </select>
              <button 
                onClick={handleDownloadCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Main Transaction Content */}
          <div className="p-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Earnings ({selectedYear})</p>
                    <p className="text-2xl font-bold" style={{ color: "#003552" }}>£{totalEarnings.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Payouts</p>
                    <p className="text-2xl font-bold text-yellow-600">£{pendingAmount.toFixed(2)}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Fees</p>
                    <p className="text-2xl font-bold text-gray-600">£{totalFees.toFixed(2)}</p>
                  </div>
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full table-fixed">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip Dates</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(transaction.type)}
                            <div>
                              <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
                              <p className="text-sm text-gray-500">{transaction.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">{transaction.guest}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">{transaction.vehicle}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">{transaction.tripDates}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className={`text-sm font-medium ${
                              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}£{transaction.amount.toFixed(2)}
                            </p>
                            {transaction.processingFee > 0 && (
                              <p className="text-xs text-gray-500">Fee: £{transaction.processingFee.toFixed(2)}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(transaction.status)}
                            <span className={`text-sm capitalize ${
                              transaction.status === 'completed' ? 'text-green-600' :
                              transaction.status === 'pending' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {transaction.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">{new Date(transaction.date).toLocaleDateString()}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>

            {/* Load More */}
            <div className="text-center">
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Load more transactions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showTripsDropdown || showVehiclesDropdown || showBusinessDropdown || showMoreDropdown) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setShowTripsDropdown(false);
            setShowVehiclesDropdown(false);
            setShowBusinessDropdown(false);
            setShowMoreDropdown(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default Transactions;
