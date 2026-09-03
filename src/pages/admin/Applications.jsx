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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-blue-600 font-semibold"
          >
            VisaXpert Admin
          </button>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-gray-600"
          >
            Dashboard
          </button>

        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Applications
          </h1>

          <p className="text-gray-500 mt-2">
            Review visa applications submitted by users.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center">
            <h2 className="text-xl font-semibold">
              No applications found
            </h2>

            <p className="text-gray-500 mt-2">
              Submitted applications will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50 border-b">

                  <tr>
                    <th className="text-left px-6 py-4">
                      Applicant
                    </th>

                    <th className="text-left px-6 py-4">
                      Email
                    </th>

                    <th className="text-left px-6 py-4">
                      Status
                    </th>

                    <th className="text-left px-6 py-4">
                      Created
                    </th>

                    <th className="text-left px-6 py-4">
                      Action
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {applications.map((application) => (
                    <tr
                      key={application._id}
                      className="border-b last:border-b-0"
                    >

                      <td className="px-6 py-4 font-medium">
                        {application.user?.name ||
                          "Unknown"}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {application.user?.email ||
                          "Unknown"}
                      </td>

                      <td className="px-6 py-4">

                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
                          {application.status}
                        </span>

                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">

                        <button
                          onClick={() =>
                            navigate(
                              `/admin/applications/${application._id}`
                            )
                          }
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          View
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