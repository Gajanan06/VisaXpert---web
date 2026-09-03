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

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            VisaXpert
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              My Applications
            </h2>

            <p className="text-gray-600 mt-1">
              Manage your visa applications
            </p>
          </div>

          <button
            onClick={handleCreateApplication}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Start New Application
          </button>
        </div>

        {/* Applications */}
        {loading ? (
          <p className="text-gray-600">
            Loading applications...
          </p>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">
              No applications yet
            </h3>

            <p className="text-gray-500 mt-2">
              Start your first visa application.
            </p>

            <button
              onClick={handleCreateApplication}
              className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
              Start Application
            </button>
          </div>
        ) : (
          <div className="grid gap-4">

            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-xl p-6 shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    Visa Application
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Application ID: {application._id}
                  </p>

                  <p className="text-sm text-gray-500">
                    Created:{" "}
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">

                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
                    {application.status}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/applications/${application._id}`)
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    View
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
                      className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                    >
                      Delete
                    </button>
                  )}

                </div>
              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard;