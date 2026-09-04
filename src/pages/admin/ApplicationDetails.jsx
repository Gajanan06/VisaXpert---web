import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";


function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const [notes, setNotes] = useState("");
const [updatingStatus, setUpdatingStatus] = useState(false);

 const handleStatusUpdate = async (status) => {
  try {
    setUpdatingStatus(true);

    await api.patch(`/admin/applications/${id}/status`, {
      status,
      notes,
    });

    await getApplication();

    alert(`Application ${status.toLowerCase()} successfully`);
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
        "Failed to update application status"
    );
  } finally {
    setUpdatingStatus(false);
  }
};

  const handleAIAnalysis = async () => {
  try {
    setAnalyzing(true);

    await api.post(
      `/admin/applications/${id}/analyze`
    );

    await getApplication();

    alert("AI analysis completed successfully.");
  } catch (error) {
    console.error(
      "AI analysis failed:",
      error
    );

    alert(
      error.response?.data?.message ||
        "AI analysis failed"
    );
  } finally {
    setAnalyzing(false);
  }
};

  const getApplication = async () => {
    try {
      const response = await api.get(
        `/admin/applications/${id}`
      );

      setApplication(response.data.application);
    } catch (error) {
      console.error(
        "Failed to fetch application:",
        error
      );
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
        Application not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() =>
              navigate("/admin/applications")
            }
            className="text-blue-600 font-medium"
          >
            ← Back to Applications
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Application Details
            </h1>

            <p className="text-gray-500 mt-2">
              Application ID: {application._id}
            </p>
          </div>

          <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-800">
            {application.status}
          </span>

        </div>

        {/* Applicant */}
        <Section title="Applicant Information">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Detail
              label="Name"
              value={application.user?.name}
            />

            <Detail
              label="Email"
              value={application.user?.email}
            />

          </div>

        </Section>

        {/* Personal Details */}
        <Section title="Personal Details">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Detail
              label="First Name"
              value={
                application.personalDetails?.firstName
              }
            />

            <Detail
              label="Last Name"
              value={
                application.personalDetails?.lastName
              }
            />

            <Detail
              label="Date of Birth"
              value={
                application.personalDetails?.dateOfBirth
              }
            />

            <Detail
              label="Gender"
              value={
                application.personalDetails?.gender
              }
            />

            <Detail
              label="Nationality"
              value={
                application.personalDetails?.nationality
              }
            />

            <Detail
              label="Phone"
              value={
                application.personalDetails?.phone
              }
            />

          </div>

        </Section>

        {/* Passport */}
        <Section title="Passport Details">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Detail
              label="Passport Number"
              value={
                application.passportDetails
                  ?.passportNumber
              }
            />

            <Detail
              label="Issuing Country"
              value={
                application.passportDetails
                  ?.issuingCountry
              }
            />

            <Detail
              label="Issue Date"
              value={
                application.passportDetails
                  ?.issueDate
              }
            />

            <Detail
              label="Expiry Date"
              value={
                application.passportDetails
                  ?.expiryDate
              }
            />

          </div>

        </Section>

        {/* Address */}
        <Section title="Address Details">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Detail
              label="Address"
              value={
                application.addressDetails?.addressLine
              }
            />

            <Detail
              label="City"
              value={
                application.addressDetails?.city
              }
            />

            <Detail
              label="State"
              value={
                application.addressDetails?.state
              }
            />

            <Detail
              label="Country"
              value={
                application.addressDetails?.country
              }
            />

            <Detail
              label="Postal Code"
              value={
                application.addressDetails?.postalCode
              }
            />

          </div>

        </Section>

        {/* Security */}
        <Section title="Security Declaration">

          <div className="space-y-4">

            <Detail
              label="Criminal Record"
              value={
                application.securityDeclaration
                  ?.criminalRecord
                  ? "Yes"
                  : "No"
              }
            />

            <Detail
              label="Previous Visa Rejection"
              value={
                application.securityDeclaration
                  ?.visaRejection
                  ? "Yes"
                  : "No"
              }
            />

            <Detail
              label="Immigration Violation"
              value={
                application.securityDeclaration
                  ?.immigrationViolation
                  ? "Yes"
                  : "No"
              }
            />

            <Detail
              label="Additional Information"
              value={
                application.securityDeclaration
                  ?.additionalInformation ||
                "None"
              }
            />

          </div>

        </Section>

        {/* Documents */}
        <Section title="Documents">

          <div className="space-y-4">

            <DocumentLink
              label="Passport"
              file={application.documents?.passport}
            />

            <DocumentLink
              label="Photograph"
              file={application.documents?.photo}
            />

            <DocumentLink
              label="Additional Document"
              file={
                application.documents
                  ?.additionalDocument
              }
            />

          </div>

        </Section>

        {/* AI section placeholder */}
        <Section title="AI Analysis">

  <div className="bg-gray-50 rounded-lg p-5">

    {application.aiAnalysis?.riskScore !== null ? (
      <div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Detail
            label="Risk Score"
            value={`${application.aiAnalysis.riskScore}/100`}
          />

          <Detail
            label="Risk Level"
            value={application.aiAnalysis.riskLevel}
          />

        </div>

        <div className="mt-5">

          <p className="text-sm text-gray-500">
            AI Summary
          </p>

          <p className="mt-2 text-gray-800">
            {application.aiAnalysis.summary}
          </p>

        </div>

        <div className="mt-5 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">

          <p className="text-sm text-yellow-800">
            AI analysis is advisory only. The final
            application decision must be made by the
            administrator.
          </p>

        </div>

      </div>
    ) : (
      <div>

        <p className="text-gray-500 mb-4">
          AI analysis has not been performed yet.
        </p>

        <button
          onClick={handleAIAnalysis}
          disabled={analyzing}
          className="px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {analyzing
            ? "Analyzing..."
            : "Run AI Analysis"}
        </button>

      </div>
    )}

  </div>

</Section>

        <div className="mt-6 rounded-lg border bg-white p-6">
  <h2 className="mb-4 text-xl font-semibold">
    Admin Decision
  </h2>

  <div className="mb-4">
    <label className="mb-2 block font-medium">
      Admin Notes
    </label>

    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="Enter review notes..."
      rows="4"
      className="w-full rounded-lg border p-3 outline-none focus:ring-2"
    />
  </div>

  <div className="flex gap-3">
    <button
      onClick={() => handleStatusUpdate("Approved")}
      disabled={updatingStatus}
      className="rounded-lg px-4 py-2 text-white bg-green-600 disabled:opacity-50"
    >
      Approve
    </button>

    <button
      onClick={() => handleStatusUpdate("Rejected")}
      disabled={updatingStatus}
      className="rounded-lg px-4 py-2 text-white bg-red-600 disabled:opacity-50"
    >
      Reject
    </button>

    <button
      onClick={() =>
        handleStatusUpdate("Requires Attention")
      }
      disabled={updatingStatus}
      className="rounded-lg px-4 py-2 text-white bg-yellow-600 disabled:opacity-50"
    >
      Requires Attention
    </button>
  </div>
</div>

 {application.adminReview && (
          <div className="mt-6 rounded-lg border bg-gray-50 p-6">
            <h2 className="mb-3 text-xl font-semibold">
              Previous Admin Review
            </h2>

            <p>
              <strong>Status:</strong>{" "}
              {application.adminReview.status}
            </p>

            <p className="mt-2">
              <strong>Notes:</strong>{" "}
              {application.adminReview.notes || "No notes"}
            </p>

            {application.adminReview.reviewedAt && (
              <p className="mt-2">
                <strong>Reviewed At:</strong>{" "}
                {new Date(
                  application.adminReview.reviewedAt
                ).toLocaleString()}
              </p>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-6">

      <h2 className="text-xl font-semibold mb-5">
        {title}
      </h2>

      {children}

    </section>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-medium mt-1">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function DocumentLink({ label, file }) {
  if (!file) {
    return (
      <div className="border rounded-lg p-4">
        <span className="text-gray-500">
          {label}: Not uploaded
        </span>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">

      <span className="font-medium">
        {label}
      </span>

      <a
        href={`http://localhost:5000${file}`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:underline"
      >
        View Document
      </a>

    </div>
  );
}

export default ApplicationDetails;