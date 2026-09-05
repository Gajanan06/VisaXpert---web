import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApplications = async () => {
    try {
      const response = await api.get("/applications");
      setApplications(response.data.applications);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  const handleCreateApplication = async () => {
    try {
      const response = await api.post("/applications");

      const applicationId = response.data.application._id;

      navigate(`/applications/${applicationId}`);
    } catch (error) {
      console.error("Failed to create application:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";

      case "Rejected":
        return "bg-red-500/10 text-red-400 border border-red-500/20";

      case "Requires Attention":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";

      case "In Review":
        return "bg-violet-500/10 text-violet-400 border border-violet-500/20";

      case "Submitted":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";

      default:
        return "bg-slate-700/50 text-slate-300 border border-slate-600";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-400";

      case "Rejected":
        return "bg-red-400";

      case "Requires Attention":
        return "bg-amber-400";

      case "In Review":
        return "bg-violet-400";

      case "Submitted":
        return "bg-blue-400";

      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="font-bold text-lg">
                VX
              </span>
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold tracking-tight">
                VisaXpert
              </h1>
            </div>
          </button>

          {/* User */}
          <div className="flex items-center gap-4">

            <div className="hidden sm:flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-400">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>

              <div className="text-left">
                <p className="text-sm font-medium text-slate-200">
                  {user?.name}
                </p>
              </div>

            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 text-sm font-medium hover:bg-slate-800 hover:text-white transition"
            >
              Logout
            </button>

          </div>

        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">

          <div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Welcome, {user?.name?.split(" ")[0] || "Applicant"}
            </h2>

            <p className="text-slate-400 mt-2">
              Manage your visa applications and track their progress.
            </p>
          </div>

          <button
            onClick={handleCreateApplication}
            className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold shadow-lg shadow-blue-600/20 transition"
          >
            <span className="text-xl leading-none">
              +
            </span>

            Start New Application

            <span className="group-hover:translate-x-1 transition">
              →
            </span>
          </button>

        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-500">
              Total Applications
            </p>

            <p className="text-3xl font-bold mt-2">
              {applications.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-500">
              Active Applications
            </p>

            <p className="text-3xl font-bold mt-2 text-blue-400">
              {
                applications.filter(
                  (application) =>
                    application.status !== "Approved" &&
                    application.status !== "Rejected"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-500">
              Approved
            </p>

            <p className="text-3xl font-bold mt-2 text-emerald-400">
              {
                applications.filter(
                  (application) =>
                    application.status === "Approved"
                ).length
              }
            </p>
          </div>

        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <h3 className="text-xl font-semibold">
              My Applications
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              View and manage your visa applications.
            </p>
          </div>

          {applications.length > 0 && (
            <span className="hidden sm:block text-sm text-slate-500">
              {applications.length} application
              {applications.length !== 1 ? "s" : ""}
            </span>
          )}

        </div>

        {/* Applications */}
        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-12 text-center">

            <div className="w-10 h-10 mx-auto mb-4 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin"></div>

            <p className="text-slate-400">
              Loading your applications...
            </p>

          </div>
        ) : applications.length === 0 ? (

          /* Empty State */
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-12 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
              <span className="text-2xl">
                📄
              </span>
            </div>

            <h3 className="text-xl font-semibold">
              No applications yet
            </h3>

            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              You haven't started a visa application yet.
              Create your first application to get started.
            </p>

            <button
              onClick={handleCreateApplication}
              className="mt-6 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
            >
              Start Your First Application
            </button>

          </div>

        ) : (

          /* Application List */
          <div className="space-y-5">

            {applications.map((application) => (

              <div
                key={application._id}
                className="group rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900 hover:border-slate-700 transition overflow-hidden"
              >

                {/* Application Header */}
                <div className="p-6">

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    {/* Application Info */}
                    <div className="flex items-start gap-4">

                      <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 text-xl">
                          ✈
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">
                          Visa Application
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Application ID
                        </p>

                        <p className="text-xs text-slate-400 font-mono mt-0.5 break-all">
                          {application._id}
                        </p>

                        <p className="text-sm text-slate-500 mt-2">
                          Created{" "}
                          {new Date(
                            application.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                    </div>

                    {/* Status + Actions */}
                    <div className="flex flex-wrap items-center gap-3">

                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(
                          application.status
                        )}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${getStatusDot(
                            application.status
                          )}`}
                        ></span>

                        {application.status}
                      </span>

                      <button
                        onClick={() =>
                          navigate(
                            `/applications/${application._id}`
                          )
                        }
                        className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-200 text-sm font-medium hover:bg-slate-700 hover:text-white transition"
                      >
                        View Details →
                      </button>

                      {application.status === "Draft" && (
                        <button
                          onClick={async () => {
                            try {
                              await api.delete(
                                `/applications/${application._id}`
                              );

                              getApplications();
                            } catch (error) {
                              console.error(
                                "Failed to delete application:",
                                error
                              );
                            }
                          }}
                          className="px-4 py-2 rounded-lg border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/10 transition"
                        >
                          Delete
                        </button>
                      )}

                    </div>

                  </div>

                </div>

                {/* Admin Notes */}
                {application.adminReview?.notes && (
                  <div className="px-6 pb-6">

                    <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4">

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-amber-400">
                          ●
                        </span>

                        <p className="text-sm font-semibold text-slate-300">
                          Admin Notes
                        </p>
                      </div>

                      <p className="text-sm text-slate-400 leading-6">
                        {application.adminReview.notes}
                      </p>

                    </div>

                  </div>
                )}

                {/* Approved */}
                {application.status === "Approved" && (
                  <div className="mx-6 mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">

                    <div className="flex items-start gap-3">

                      <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <span className="text-emerald-400">
                          ✓
                        </span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-emerald-400">
                          Application Approved
                        </h3>

                        <p className="text-sm text-emerald-400/70 mt-1">
                          Your visa application has been approved.
                        </p>
                      </div>

                    </div>

                  </div>
                )}

                {/* Rejected */}
                {application.status === "Rejected" && (
                  <div className="mx-6 mb-6 rounded-xl border border-red-500/20 bg-red-500/5 p-5">

                    <div className="flex items-start gap-3">

                      <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                        <span className="text-red-400">
                          !
                        </span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-red-400">
                          Application Rejected
                        </h3>

                        <p className="text-sm text-red-400/70 mt-1">
                          Your visa application has been rejected.
                        </p>
                      </div>

                    </div>

                  </div>
                )}

                {/* Requires Attention */}
                {application.status === "Requires Attention" && (
                  <div className="mx-6 mb-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">

                    <div className="flex items-start gap-3">

                      <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                        <span className="text-amber-400">
                          !
                        </span>
                      </div>

                      <div className="flex-1">

                        <h3 className="font-semibold text-amber-400">
                          Action Required
                        </h3>

                        <p className="text-sm text-amber-400/70 mt-1">
                          Please review the admin notes and provide
                          the required information.
                        </p>

                        {application.adminReview?.notes && (
                          <div className="mt-3 rounded-lg bg-amber-500/5 border border-amber-500/10 p-3">
                            <p className="text-sm text-amber-300">
                              {application.adminReview.notes}
                            </p>
                          </div>
                        )}

                      </div>

                    </div>

                  </div>
                )}

              </div>

            ))}

          </div>

        )}

      </main>
    </div>
  );
}

export default Dashboard;