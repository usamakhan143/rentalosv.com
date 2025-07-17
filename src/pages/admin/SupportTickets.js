import React, { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Search,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Calendar,
} from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const [responseModal, setResponseModal] = useState({
    open: false,
    ticket: null,
  });
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...tickets];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.message?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === filterStatus);
    }

    // Priority filter
    if (filterPriority !== "all") {
      filtered = filtered.filter(
        (ticket) => ticket.priority === filterPriority,
      );
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, filterStatus, filterPriority]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      // In a real app, you'd have a support_tickets collection
      // For now, we'll simulate with some sample data and create a basic structure
      const sampleTickets = [
        {
          id: "1",
          subject: "Car damaged during rental",
          message:
            "The renter returned my car with scratches on the side. I need help filing a damage claim.",
          userId: "user123",
          userName: "John Smith",
          userEmail: "john@example.com",
          status: "open",
          priority: "high",
          category: "damage",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          responses: [],
        },
        {
          id: "2",
          subject: "Payment not received",
          message:
            "I completed a rental 5 days ago but haven't received my payout yet. Can you check on this?",
          userId: "user456",
          userName: "Sarah Johnson",
          userEmail: "sarah@example.com",
          status: "in_progress",
          priority: "medium",
          category: "payment",
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          responses: [
            {
              id: "r1",
              message:
                "We're looking into your payout. It should be processed within 24 hours.",
              isAdmin: true,
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
          ],
        },
        {
          id: "3",
          subject: "Unable to access my account",
          message:
            "I've been trying to log in but keep getting an error message. Can you help?",
          userId: "user789",
          userName: "Mike Davis",
          userEmail: "mike@example.com",
          status: "resolved",
          priority: "low",
          category: "technical",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
          responses: [
            {
              id: "r2",
              message:
                "Try clearing your browser cache and cookies, then try logging in again.",
              isAdmin: true,
              timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            },
            {
              id: "r3",
              message: "That worked! Thank you for the help.",
              isAdmin: false,
              timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            },
          ],
        },
        {
          id: "4",
          subject: "Booking cancellation issue",
          message:
            "I need to cancel my booking but the cancel button isn't working. The trip is tomorrow.",
          userId: "user101",
          userName: "Lisa Wilson",
          userEmail: "lisa@example.com",
          status: "open",
          priority: "high",
          category: "booking",
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          responses: [],
        },
      ];

      setTickets(sampleTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (ticketId, newStatus) => {
    try {
      // In a real app, you'd update the database
      const updatedTickets = tickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus, updatedAt: new Date() }
          : ticket,
      );
      setTickets(updatedTickets);
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  const handleResponse = async (ticket) => {
    if (!response.trim()) return;

    try {
      const newResponse = {
        id: Date.now().toString(),
        message: response,
        isAdmin: true,
        timestamp: new Date(),
      };

      const updatedTickets = tickets.map((t) =>
        t.id === ticket.id
          ? {
              ...t,
              responses: [...t.responses, newResponse],
              status: "in_progress",
              updatedAt: new Date(),
            }
          : t,
      );

      setTickets(updatedTickets);
      setResponse("");
      setResponseModal({ open: false, ticket: null });
    } catch (error) {
      console.error("Error adding response:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-error-100 text-error-800";
      case "in_progress":
        return "bg-warning-100 text-warning-800";
      case "resolved":
        return "bg-success-100 text-success-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-error-100 text-error-800";
      case "medium":
        return "bg-warning-100 text-warning-800";
      case "low":
        return "bg-success-100 text-success-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return AlertCircle;
      case "in_progress":
        return Clock;
      case "resolved":
        return CheckCircle;
      default:
        return MessageSquare;
    }
  };

  const ResponseModal = () => (
    <Modal
      isOpen={responseModal.open}
      onClose={() => {
        setResponseModal({ open: false, ticket: null });
        setResponse("");
      }}
      title="Respond to Ticket"
      size="lg"
    >
      {responseModal.ticket && (
        <div className="space-y-6">
          {/* Ticket Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              {responseModal.ticket.subject}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {responseModal.ticket.message}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                From: {responseModal.ticket.userName} (
                {responseModal.ticket.userEmail})
              </span>
              <span>{responseModal.ticket.createdAt.toLocaleDateString()}</span>
            </div>
          </div>

          {/* Previous Responses */}
          {responseModal.ticket.responses.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Previous Responses:</h4>
              {responseModal.ticket.responses.map((resp) => (
                <div
                  key={resp.id}
                  className={`p-3 rounded-lg ${resp.isAdmin ? "bg-primary-50 ml-4" : "bg-gray-50 mr-4"}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">
                      {resp.isAdmin ? "Admin" : responseModal.ticket.userName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {resp.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">{resp.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Response Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Your Response
            </label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your response..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setResponseModal({ open: false, ticket: null });
                setResponse("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={() => {
                handleResponse(responseModal.ticket);
                handleStatusUpdate(responseModal.ticket.id, "resolved");
              }}
              disabled={!response.trim()}
            >
              Send & Mark Resolved
            </Button>
            <Button
              variant="primary"
              onClick={() => handleResponse(responseModal.ticket)}
              disabled={!response.trim()}
            >
              Send Response
            </Button>
          </div>
        </div>
      )}
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
        <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
        <p className="text-gray-600 mt-2">
          Manage user support requests and disputes
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <div className="text-sm text-gray-600 self-center">
            Showing {filteredTickets.length} of {tickets.length} tickets
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => {
          const StatusIcon = getStatusIcon(ticket.status);
          return (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <StatusIcon className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {ticket.subject}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}
                    >
                      {ticket.status.replace("_", " ")}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}
                    >
                      {ticket.priority} priority
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{ticket.message}</p>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {ticket.userName} ({ticket.userEmail})
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Created {ticket.createdAt.toLocaleDateString()}
                    </div>
                    {ticket.responses.length > 0 && (
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {ticket.responses.length} response
                        {ticket.responses.length !== 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setResponseModal({ open: true, ticket })}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Respond
                  </Button>

                  {ticket.status !== "resolved" && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleStatusUpdate(ticket.id, "resolved")}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              No support tickets found matching your criteria
            </p>
          </div>
        )}
      </div>

      <ResponseModal />
    </div>
  );
};

export default SupportTickets;
