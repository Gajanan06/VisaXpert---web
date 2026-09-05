import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApplications = async () => {
    try {
      const response = await api.get("/admin/applications");

      setApplications(response.data.applications);
    } catch (error) {
      console.error(
        "Failed to fetch applications:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "Rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      case "Requires Attention":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      case "In Review":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      case "Submitted":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500"></div>

          <p className="text-sm text-slate-400">
            Loading applications...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() =>
              navigate("/admin/dashboard")
            }
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-indigo-600/20">
              <span className="font-bold text-white">
                VX
              </span>
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold">
                VisaXpert
              </h1>

              <p className="text-xs text-slate-500">
                Admin Panel
              </p>
            </div>

          </button>

          {/* Dashboard button */}
          <button
            onClick={() =>
              navigate("/admin/dashboard")
            }
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            ← Dashboard
          </button>

        </div>

      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              All Applications
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Review and manage visa applications submitted by users.
            </p>

          </div>

          {/* Application count */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-5 py-3">
            <p className="text-xs text-slate-500">
              Total Applications
            </p>

            <p className="mt-1 text-xl font-bold">
              {applications.length}
            </p>
          </div>

        </div>

        {/* Empty State */}
        {applications.length === 0 ? (

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-12 text-center shadow-xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 text-2xl">
              📋
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              No applications found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Submitted visa applications will appear here
              once users complete and submit their applications.
            </p>

          </div>

        ) : (

          /* Applications Table */
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl">

            {/* Table Header */}
            <div className="border-b border-slate-800 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <span>📑</span>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Visa Applications
                  </h3>

                  <p className="text-xs text-slate-500">
                    Select an application to view complete details.
                  </p>
                </div>

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[750px]">

                <thead className="border-b border-slate-800 bg-slate-950/50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Applicant
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Created
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-800">

                  {applications.map((application) => (

                    <tr
                      key={application._id}
                      className="transition-colors hover:bg-slate-800/40"
                    >

                      {/* Applicant */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20">

                            <span className="text-sm font-semibold text-indigo-400">
                              {application.user?.name
                                ?.charAt(0)
                                ?.toUpperCase() || "U"}
                            </span>

                          </div>

                          <div>

                            <p className="font-medium text-slate-200">
                              {application.user?.name ||
                                "Unknown"}
                            </p>

                            <p className="text-xs text-slate-500">
                              Application
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Email */}
                      <td className="px-6 py-5 text-sm text-slate-400">
                        {application.user?.email ||
                          "Unknown"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
                            application.status
                          )}`}
                        >

                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current"></span>

                          {application.status}

                        </span>

                      </td>

                      {/* Created */}
                      <td className="px-6 py-5 text-sm text-slate-400">

                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}

                      </td>

                      {/* Action */}
                      <td className="px-6 py-5 text-right">

                        <button
                          onClick={() =>
                            navigate(
                              `/admin/applications/${application._id}`
                            )
                          }
                          className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-400"
                        >
                          View Details →
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default Applications;