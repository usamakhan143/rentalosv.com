import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  MoreVertical,
  UserX,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionModal, setActionModal] = useState({
    open: false,
    type: "",
    user: null,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Role filter
    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    // Status filter
    if (filterStatus !== "all") {
      if (filterStatus === "active") {
        filtered = filtered.filter((user) => !user.suspended && !user.banned);
      } else if (filterStatus === "suspended") {
        filtered = filtered.filter((user) => user.suspended);
      } else if (filterStatus === "banned") {
        filtered = filtered.filter((user) => user.banned);
      }
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole, filterStatus]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersQuery = query(
        collection(db, "users"),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(usersQuery);

      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });

      // Fetch booking counts for each user
      for (let user of usersData) {
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("renterId", "==", user.uid),
        );
        const bookingsSnapshot = await getDocs(bookingsQuery);
        user.totalBookings = bookingsSnapshot.size;

        // Calculate total spent
        let totalSpent = 0;
        bookingsSnapshot.forEach((bookingDoc) => {
          const booking = bookingDoc.data();
          if (booking.status === "completed" && booking.totalCost) {
            totalSpent += booking.totalCost;
          }
        });
        user.totalSpent = totalSpent;
      }

      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (action, user) => {
    try {
      const userRef = doc(db, "users", user.id);

      switch (action) {
        case "suspend":
          await updateDoc(userRef, {
            suspended: true,
            suspendedAt: new Date(),
            suspendedReason: "Suspended by admin",
          });
          break;
        case "unsuspend":
          await updateDoc(userRef, {
            suspended: false,
            suspendedAt: null,
            suspendedReason: null,
          });
          break;
        case "ban":
          await updateDoc(userRef, {
            banned: true,
            bannedAt: new Date(),
            bannedReason: "Banned by admin",
          });
          break;
        case "unban":
          await updateDoc(userRef, {
            banned: false,
            bannedAt: null,
            bannedReason: null,
          });
          break;
        case "verify":
          await updateDoc(userRef, { verified: true });
          break;
        default:
          break;
      }

      // Refresh users list
      await fetchUsers();
      setActionModal({ open: false, type: "", user: null });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const getUserStatus = (user) => {
    if (user.banned)
      return { label: "Banned", color: "bg-error-100 text-error-800" };
    if (user.suspended)
      return { label: "Suspended", color: "bg-warning-100 text-warning-800" };
    if (user.verified)
      return { label: "Verified", color: "bg-success-100 text-success-800" };
    return { label: "Active", color: "bg-primary-100 text-primary-800" };
  };

  const ActionModal = () => (
    <Modal
      isOpen={actionModal.open}
      onClose={() => setActionModal({ open: false, type: "", user: null })}
      title={`${actionModal.type.charAt(0).toUpperCase() + actionModal.type.slice(1)} User`}
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          Are you sure you want to {actionModal.type}{" "}
          {actionModal.user?.firstName} {actionModal.user?.lastName}?
        </p>

        {actionModal.type === "ban" && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-error-600 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-error-800">Warning</h3>
                <p className="text-sm text-error-700 mt-1">
                  Banning a user will prevent them from accessing the platform
                  entirely.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() =>
              setActionModal({ open: false, type: "", user: null })
            }
          >
            Cancel
          </Button>
          <Button
            variant={actionModal.type === "ban" ? "danger" : "primary"}
            onClick={() => handleUserAction(actionModal.type, actionModal.user)}
          >
            {actionModal.type.charAt(0).toUpperCase() +
              actionModal.type.slice(1)}
          </Button>
        </div>
      </div>
    </Modal>
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-2">
          Manage users, roles, and account status
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="renter">Renters</option>
            <option value="host">Hosts</option>
            <option value="admin">Admins</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>

          <div className="text-sm text-gray-600 self-center">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const status = getUserStatus(user);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium">
                            {user.firstName?.charAt(0)}
                            {user.lastName?.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt?.toDate().toLocaleDateString() || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{user.totalBookings || 0} bookings</div>
                      <div>
                        ${(user.totalSpent || 0).toLocaleString()} spent
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() =>
                            setSelectedUser(
                              selectedUser === user.id ? null : user.id,
                            )
                          }
                          className="text-gray-400 hover:text-gray-600 p-2"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>

                        {selectedUser === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                            <div className="py-1">
                              {!user.verified && (
                                <button
                                  onClick={() => {
                                    setActionModal({
                                      open: true,
                                      type: "verify",
                                      user,
                                    });
                                    setSelectedUser(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <UserCheck className="mr-3 h-4 w-4" />
                                  Verify User
                                </button>
                              )}

                              {!user.suspended && !user.banned && (
                                <button
                                  onClick={() => {
                                    setActionModal({
                                      open: true,
                                      type: "suspend",
                                      user,
                                    });
                                    setSelectedUser(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-warning-700 hover:bg-warning-50"
                                >
                                  <AlertTriangle className="mr-3 h-4 w-4" />
                                  Suspend User
                                </button>
                              )}

                              {user.suspended && (
                                <button
                                  onClick={() => {
                                    setActionModal({
                                      open: true,
                                      type: "unsuspend",
                                      user,
                                    });
                                    setSelectedUser(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-success-700 hover:bg-success-50"
                                >
                                  <UserCheck className="mr-3 h-4 w-4" />
                                  Unsuspend User
                                </button>
                              )}

                              {!user.banned && (
                                <button
                                  onClick={() => {
                                    setActionModal({
                                      open: true,
                                      type: "ban",
                                      user,
                                    });
                                    setSelectedUser(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-error-700 hover:bg-error-50"
                                >
                                  <UserX className="mr-3 h-4 w-4" />
                                  Ban User
                                </button>
                              )}

                              {user.banned && (
                                <button
                                  onClick={() => {
                                    setActionModal({
                                      open: true,
                                      type: "unban",
                                      user,
                                    });
                                    setSelectedUser(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-success-700 hover:bg-success-50"
                                >
                                  <UserCheck className="mr-3 h-4 w-4" />
                                  Unban User
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ActionModal />
    </div>
  );
};

export default UserManagement;
