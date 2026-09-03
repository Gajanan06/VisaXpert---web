import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard");

      setStatistics(response.data.statistics);
    } catch (error) {
      console.error(
        "Failed to fetch dashboard:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-xl font-bold text-blue-600">
            VisaXpert Admin
          </h1>

          <div className="flex items-center gap-4">

            <span className="text-gray-700">
              {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Admin Dashboard
          </h2>

          <p className="text-gray-500 mt-1">
            Manage and review visa applications.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          <StatCard
            title="Total Applications"
            value={statistics.totalApplications}
          />

          <StatCard
            title="Submitted"
            value={statistics.submittedApplications}
          />

          <StatCard
            title="Pending Review"
            value={statistics.pendingApplications}
          />

          <StatCard
            title="Approved"
            value={statistics.approvedApplications}
          />

          <StatCard
            title="Rejected"
            value={statistics.rejectedApplications}
          />

          <StatCard
            title="Total Users"
            value={statistics.totalUsers}
          />

        </div>

        {/* Applications */}
        <div className="bg-white rounded-xl shadow-sm p-6">

          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-xl font-semibold">
                Applications
              </h3>

              <p className="text-gray-500 mt-1">
                View and review submitted applications.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/admin/applications")
              }
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Applications
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}

export default Dashboard;