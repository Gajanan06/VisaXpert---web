import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function ReviewApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to submit this application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setSubmitting(true);

      await api.post(`/applications/${id}/submit`);

      alert("Application submitted successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to submit application:", error);

      alert(
        error.response?.data?.message ||
          "Failed to submit application"
      );
    } finally {
      setSubmitting(false);
    }
  };

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

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Review Application
          </h1>

          <p className="text-gray-500 mt-2">
            Step 6 of 6 — Review & Submit
          </p>
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "100%" }}
          />
        </div>

        {/* Personal Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">
              1. Personal Details
            </h2>

            <button
              onClick={() =>
                navigate(`/applications/${id}/personal`)
              }
              className="text-blue-600"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Detail
              label="First Name"
              value={application.personalDetails?.firstName}
            />

            <Detail
              label="Last Name"
              value={application.personalDetails?.lastName}
            />

            <Detail
              label="Date of Birth"
              value={application.personalDetails?.dateOfBirth}
            />

            <Detail
              label="Gender"
              value={application.personalDetails?.gender}
            />

            <Detail
              label="Nationality"
              value={application.personalDetails?.nationality}
            />

            <Detail
              label="Phone"
              value={application.personalDetails?.phone}
            />

          </div>
        </div>

        {/* Passport Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">
              2. Passport Details
            </h2>

            <button
              onClick={() =>
                navigate(`/applications/${id}/passport`)
              }
              className="text-blue-600"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Detail
              label="Passport Number"
              value={
                application.passportDetails?.passportNumber
              }
            />

            <Detail
              label="Issuing Country"
              value={
                application.passportDetails?.issuingCountry
              }
            />

            <Detail
              label="Issue Date"
              value={
                application.passportDetails?.issueDate
              }
            />

            <Detail
              label="Expiry Date"
              value={
                application.passportDetails?.expiryDate
              }
            />

          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">
              3. Address Details
            </h2>

            <button
              onClick={() =>
                navigate(`/applications/${id}/address`)
              }
              className="text-blue-600"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Detail
              label="Address"
              value={
                application.addressDetails?.addressLine
              }
            />

            <Detail
              label="City"
              value={application.addressDetails?.city}
            />

            <Detail
              label="State"
              value={application.addressDetails?.state}
            />

            <Detail
              label="Country"
              value={application.addressDetails?.country}
            />

            <Detail
              label="Postal Code"
              value={
                application.addressDetails?.postalCode
              }
            />

          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">
              4. Security Declaration
            </h2>

            <button
              onClick={() =>
                navigate(`/applications/${id}/security`)
              }
              className="text-blue-600"
            >
              Edit
            </button>
          </div>

          <div className="space-y-3">

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
                  ?.additionalInformation || "None"
              }
            />

          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">
              5. Documents
            </h2>

            <button
              onClick={() =>
                navigate(`/applications/${id}/documents`)
              }
              className="text-blue-600"
            >
              Edit
            </button>
          </div>

          <div className="space-y-3">

            <DocumentStatus
              label="Passport"
              uploaded={
                application.documents?.passport
              }
            />

            <DocumentStatus
              label="Photograph"
              uploaded={
                application.documents?.photo
              }
            />

            <DocumentStatus
              label="Additional Document"
              uploaded={
                application.documents?.additionalDocument
              }
            />

          </div>
        </div>

        {/* Submit */}
        <div className="bg-white rounded-xl shadow-sm p-6">

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">
              Please make sure all information is correct
              before submitting your application.
            </p>
          </div>

          <div className="flex justify-between items-center">

            <button
              onClick={() =>
                navigate(`/applications/${id}/documents`)
              }
              className="px-5 py-3 border rounded-lg hover:bg-gray-50"
            >
              ← Previous
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {submitting
                ? "Submitting..."
                : "Submit Application"}
            </button>

          </div>

        </div>

      </main>
    </div>
  );
}

/* Small reusable component */

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-medium text-gray-900 mt-1">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function DocumentStatus({ label, uploaded }) {
  return (
    <div className="flex justify-between items-center border rounded-lg p-4">

      <span className="font-medium">
        {label}
      </span>

      <span
        className={
          uploaded
            ? "text-green-600"
            : "text-red-600"
        }
      >
        {uploaded ? "Uploaded" : "Not uploaded"}
      </span>

    </div>
  );
}

export default ReviewApplication;