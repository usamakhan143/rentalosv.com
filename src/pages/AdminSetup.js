import React, { useState } from "react";
import { Shield, User, Key, CheckCircle, AlertCircle } from "lucide-react";
import Button from "../components/ui/Button";
import { createDefaultAdminUser } from "../utils/createAdminUser";
import { useLoginModal } from "../contexts/LoginModalContext";

const AdminSetup = () => {
  const [creating, setCreating] = useState(false);
  const [result, setResult] = useState(null);
  const { openLoginModal } = useLoginModal();

  const handleCreateAdmin = async () => {
    setCreating(true);
    setResult(null);

    try {
      const adminResult = await createDefaultAdminUser();
      setResult(adminResult);
    } catch (error) {
      setResult({
        success: false,
        error: error.message,
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-primary-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Admin Setup
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create the default admin user to access the admin panel
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          {!result && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  Default Admin Credentials
                </h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-mono">admin@carshare.com</span>
                  </div>
                  <div className="flex items-center">
                    <Key className="h-4 w-4 mr-2" />
                    <span className="font-mono">admin123456</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCreateAdmin}
                disabled={creating}
                className="w-full"
                size="lg"
              >
                {creating ? "Creating Admin User..." : "Create Admin User"}
              </Button>

              <div className="text-xs text-gray-500 text-center">
                This will create a user with admin privileges to access the
                admin panel
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {result.success ? (
                <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-600 mt-0.5" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-success-800">
                        {result.existing
                          ? "Admin User Already Exists"
                          : "Admin User Created Successfully!"}
                      </h3>
                      <div className="text-sm text-success-700 mt-2 space-y-1">
                        <div>
                          <strong>Email:</strong> admin@carshare.com
                        </div>
                        <div>
                          <strong>Password:</strong> admin123456
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-error-600 mt-0.5" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-error-800">
                        Error Creating Admin User
                      </h3>
                      <p className="text-sm text-error-700 mt-1">
                        {result.error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">
                  Next Steps:
                </h4>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                  <li>
                    Go to the{" "}
                    <button
                      onClick={openLoginModal}
                      className="text-primary-600 hover:text-primary-700 underline"
                    >
                      Login page
                    </button>
                  </li>
                  <li>Sign in with the admin credentials above</li>
                  <li>
                    Navigate to{" "}
                    <a
                      href="/admin"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      /admin
                    </a>{" "}
                    to access the admin panel
                  </li>
                </ol>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={openLoginModal}
                  className="flex-1"
                  variant="primary"
                >
                  Go to Login
                </Button>
                <Button
                  onClick={() => setResult(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Create Another
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            For security, change the default admin password after first login
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
