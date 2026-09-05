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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500"></div>

          <p className="text-sm text-slate-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-indigo-600/20">
              <span className="font-bold text-white">
                VX
              </span>
            </div>

            <div>
              <h1 className="text-lg font-bold">
                VisaXpert
              </h1>
            </div>

          </div>

          {/* User */}
          <div className="flex items-center gap-4">

            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-200">
                {user?.name}
              </p>
            </div>


            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">

          <p className="mb-2 text-sm font-medium text-indigo-400">
            ADMINISTRATION
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dashboard
          </h2>

          <p className="mt-2 max-w-2xl text-slate-400">
            Monitor visa applications, review applicants,
            and manage verification decisions.
          </p>

        </div>

        {/* Statistics */}
        <div className="mb-10">

          <div className="mb-5">
            <h3 className="text-lg font-semibold">
              Application Overview
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Current application and user statistics
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <StatCard
              title="Total Applications"
              value={statistics.totalApplications}
              icon="📋"
            />

            <StatCard
              title="Submitted"
              value={statistics.submittedApplications}
              icon="📨"
            />

            <StatCard
              title="Pending Review"
              value={statistics.pendingApplications}
              icon="🔍"
            />

            <StatCard
              title="Approved"
              value={statistics.approvedApplications}
              icon="✓"
            />

            <StatCard
              title="Rejected"
              value={statistics.rejectedApplications}
              icon="!"
            />

            <StatCard
              title="Total Users"
              value={statistics.totalUsers}
              icon="👥"
            />

          </div>

        </div>

        {/* Application Management */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <span className="text-xl">
                  📑
                </span>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Application Management
                </h3>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                  View submitted visa applications, inspect
                  applicant information, review documents,
                  and perform AI-assisted verification.
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                navigate("/admin/applications")
              }
              className="shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:from-blue-500 hover:to-indigo-500 hover:shadow-indigo-600/30"
            >
              View Applications →
            </button>

          </div>

        </div>

        {/* Quick Information */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

          <InfoCard
            title="Review Applications"
            description="Inspect submitted applicant information and documents."
          />

          <InfoCard
            title="AI Verification"
            description="Run AI-assisted checks and review the generated risk assessment."
          />

          <InfoCard
            title="Make Decisions"
            description="Approve, reject, or request additional information from applicants."
          />

        </div>

      </main>

    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-lg">
          {icon}
        </div>

      </div>

    </div>
  );
}

function InfoCard({ title, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">

      <h4 className="font-semibold text-slate-200">
        {title}
      </h4>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

    </div>
  );
}

export default Dashboard;