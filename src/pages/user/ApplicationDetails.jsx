import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  const getApplication = async () => {
    try {
      const response = await api.get(`/applications/${id}`);

      setApplication(response.data.application);
    } catch (error) {
      console.error("Failed to fetch application:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplication();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading application...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Application not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">

        <div className="bg-white rounded-xl p-8 shadow-sm">

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">
                Visa Application
              </h1>

              <p className="text-gray-500 mt-1">
                Application ID: {application._id}
              </p>
            </div>

            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
              {application.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="border rounded-lg p-5">
              <h2 className="font-semibold mb-2">
                1. Personal Details
              </h2>

              <p className="text-gray-500">
                Add your personal information.
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-semibold mb-2">
                2. Passport Details
              </h2>

              <p className="text-gray-500">
                Add your passport information.
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-semibold mb-2">
                3. Address Details
              </h2>

              <p className="text-gray-500">
                Add your current address.
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-semibold mb-2">
                4. Security Declaration
              </h2>

              <p className="text-gray-500">
                Answer the security questions.
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-semibold mb-2">
                5. Documents
              </h2>

              <p className="text-gray-500">
                Upload required documents.
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-semibold mb-2">
                6. Review & Submit
              </h2>

              <p className="text-gray-500">
                Review your application and submit it.
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default ApplicationDetails;