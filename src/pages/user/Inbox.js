import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Inbox = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading messages
    setTimeout(() => {
      setMessages([]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="xl" style={{ color: '#003552' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold" style={{ color: '#003552' }}>
            Messages
          </h1>
        </div>

        {/* Empty State */}
        {messages.length === 0 ? (
          <div className="text-center py-12">
            {/* Messages Illustration */}
            <div className="mb-8">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Fb02ca07b3d474ea59c89594b71eaaee4?format=webp&width=800"
                alt="No messages illustration"
                className="w-80 h-auto mx-auto"
              />
            </div>
            
            <h2 className="text-2xl font-bold" style={{ color: '#003552' }}>
              No messages
            </h2>
          </div>
        ) : (
          /* Messages List - This would show actual messages when available */
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {message.sender.initials}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{message.sender.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{message.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


      </div>
    </div>
  );
};

export default Inbox;
