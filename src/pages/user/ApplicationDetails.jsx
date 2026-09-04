import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function Section({ title, children }) {
  return (
    <div className="mt-8 pt-6 border-t">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
}

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

  const getStatusStyle = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    case "Requires Attention":
      return "bg-yellow-100 text-yellow-700";

    case "In Review":
      return "bg-purple-100 text-purple-700";

    case "Submitted":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

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

            <span
            className={`px-4 py-2 rounded-full ${getStatusStyle(
                application.status
            )}`}
            >
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
              {application.status === "Draft" && (
                    <button
                    onClick={() =>
                        navigate(`/applications/${application._id}/personal`)
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                    {application.personalDetails?.firstName
                        ? "Edit"
                        : "Start"}
                    </button>
                )}
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
               {application.status === "Draft" && (
                    <button
                    onClick={() =>
                        navigate(`/applications/${application._id}/address`)
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                    {application.addressDetails?.city
                        ? "Edit"
                        : "Start"}
                    </button>
                )}
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="font-semibold mb-2">
                4. Security Declaration
              </h2>

              <p className="text-gray-500">
                Answer the security questions.
              </p>
              {application.status === "Draft" && (
                    <button
                    onClick={() =>
                        navigate(`/applications/${application._id}/security`)
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                    {application.securityDeclaration?.additionalInformation ||
                    application.securityDeclaration?.criminalRecord ||
                    application.securityDeclaration?.visaRejection ||
                    application.securityDeclaration?.immigrationViolation
                        ? "Edit"
                        : "Start"}
                    </button>
                )}
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
          <Section title="Application Status">

  <div>
    <p className="text-sm text-gray-500">
      Current Status
    </p>

    <p className="text-xl font-semibold mt-1">
      {application.status}
    </p>
  </div>

  {/* Approved */}
  {application.status === "Approved" && (
    <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="font-semibold text-green-800">
        Application Approved
      </h3>

      <p className="text-green-700 mt-1">
        Your visa application has been approved.
      </p>
    </div>
  )}

  {/* Rejected */}
  {application.status === "Rejected" && (
    <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-lg">
      <h3 className="font-semibold text-red-800">
        Application Rejected
      </h3>

      <p className="text-red-700 mt-1">
        Your visa application has been rejected.
      </p>
    </div>
  )}

  {/* Requires Attention */}
  {application.status === "Requires Attention" && (
    <div className="mt-5 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="font-semibold text-yellow-800">
        Action Required
      </h3>

      <p className="text-yellow-700 mt-1">
        Please review the admin notes and provide the required information.
      </p>
    </div>
  )}

  {/* Admin Notes */}
  {application.adminReview?.notes && (
    <div className="mt-5 p-4 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-500">
        Admin Notes
      </p>

      <p className="mt-2">
        {application.adminReview.notes}
      </p>
    </div>
  )}

</Section>

        </div>

      </main>
    </div>
  );
}

export default ApplicationDetails;