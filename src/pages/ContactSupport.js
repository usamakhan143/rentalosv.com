import React, { useState } from "react";
import { Headphones, Mail, Phone, MessageCircle, Send } from "lucide-react";
import Button from "../components/ui/Button";
import { useApp } from "../contexts/AppContext";

const ContactSupport = () => {
  const { addNotification } = useApp();
  const [formData, setFormData] = useState({
    subject: "",
    category: "general",
    message: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    addNotification({
      type: "success",
      title: "Message sent!",
      message: "We'll get back to you within 24 hours.",
    });
    setFormData({ subject: "", category: "general", message: "", email: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Headphones className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Support</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Need help? We're here for you. Choose how you'd like to get in touch with our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Options */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in touch</h2>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Live Chat</h3>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Get instant help from our support team through live chat.
              </p>
              <Button variant="outline" className="w-full">
                Start Live Chat
              </Button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-sm text-gray-600">Mon-Sun, 6 AM - 11 PM PT</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Speak directly with a support representative.
              </p>
              <p className="font-semibold text-gray-900 mb-4">1-855-RENTCAR</p>
              <Button variant="outline" className="w-full">
                Call Now
              </Button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <p className="text-sm text-gray-600">Response within 24 hours</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Send us a detailed message and we'll get back to you.
              </p>
              <p className="font-semibold text-gray-900">support@rentalosv.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="general">General Question</option>
                  <option value="booking">Booking Issue</option>
                  <option value="payment">Payment Problem</option>
                  <option value="technical">Technical Issue</option>
                  <option value="host">Host Support</option>
                  <option value="safety">Safety Concern</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Please provide as much detail as possible..."
                />
              </div>

              <Button type="submit" className="w-full" icon={<Send className="w-4 h-4" />}>
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">How do I cancel my booking?</h3>
              <p className="text-gray-600 text-sm">
                You can cancel your booking through your trip dashboard. Cancellation policies vary by host.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">What if I'm locked out of my account?</h3>
              <p className="text-gray-600 text-sm">
                Use the "Forgot Password" link on the login page or contact our support team for assistance.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">How do I become a host?</h3>
              <p className="text-gray-600 text-sm">
                Visit our "Become a Host" page to learn about hosting requirements and start the application process.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods are accepted?</h3>
              <p className="text-gray-600 text-sm">
                We accept major credit cards, debit cards, and PayPal for bookings and payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
