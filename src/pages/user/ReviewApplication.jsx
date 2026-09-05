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
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">

          <div className="w-10 h-10 mx-auto mb-4 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin"></div>

          <p className="text-slate-400">
            Loading application...
          </p>

        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

        <div className="text-center">

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <span className="text-2xl text-red-400">
              !
            </span>
          </div>

          <h2 className="text-xl font-semibold">
            Application not found
          </h2>

          <p className="text-slate-500 mt-2">
            We couldn't find the requested visa application.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-medium transition"
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">

        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="font-bold">
                VX
              </span>
            </div>

            <div className="hidden sm:block text-left">
              <h1 className="font-bold">
                VisaXpert
              </h1>

              <p className="text-xs text-slate-500">
                Visa Application
              </p>
            </div>

          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-slate-400 hover:text-white transition"
          >
            ← Back to Dashboard
          </button>

        </div>

      </nav>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">

          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>

            <span className="text-sm font-medium text-emerald-400">
              Final Step
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Review Your Application
          </h1>

          <p className="text-slate-400 mt-2">
            Review all the information below before submitting your visa application.
          </p>

        </div>

        {/* Progress */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 mb-6">

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-sm font-semibold text-slate-200">
                Application Progress
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Step 6 of 6 — Ready for submission
              </p>
            </div>

            <span className="text-sm font-medium text-emerald-400">
              100%
            </span>

          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">

            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
              style={{ width: "100%" }}
            />

          </div>

          {/* Steps */}
          <div className="hidden md:grid grid-cols-6 gap-2 mt-5">

            <Step label="Personal" completed />

            <Step label="Passport" completed />

            <Step label="Address" completed />

            <Step label="Security" completed />

            <Step label="Documents" completed />

            <Step label="Review" active />

          </div>

        </div>

        {/* Personal Details */}
        <ReviewSection
          number="01"
          title="Personal Details"
          description="Your personal information"
          onEdit={() =>
            navigate(`/applications/${id}/personal`)
          }
        >

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

        </ReviewSection>

        {/* Passport Details */}
        <ReviewSection
          number="02"
          title="Passport Details"
          description="Your passport information"
          onEdit={() =>
            navigate(`/applications/${id}/passport`)
          }
        >

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

        </ReviewSection>

        {/* Address */}
        <ReviewSection
          number="03"
          title="Address Details"
          description="Your residential address"
          onEdit={() =>
            navigate(`/applications/${id}/address`)
          }
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Detail
              label="Address"
              value={
                application.addressDetails?.addressLine
              }
              full
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

        </ReviewSection>

        {/* Security */}
        <ReviewSection
          number="04"
          title="Security Declaration"
          description="Your security declarations"
          onEdit={() =>
            navigate(`/applications/${id}/security`)
          }
        >

          <div className="space-y-3">

            <Declaration
              label="Criminal Record"
              value={
                application.securityDeclaration
                  ?.criminalRecord
              }
            />

            <Declaration
              label="Previous Visa Rejection"
              value={
                application.securityDeclaration
                  ?.visaRejection
              }
            />

            <Declaration
              label="Immigration Violation"
              value={
                application.securityDeclaration
                  ?.immigrationViolation
              }
            />

            <Detail
              label="Additional Information"
              value={
                application.securityDeclaration
                  ?.additionalInformation || "None"
              }
              full
            />

          </div>

        </ReviewSection>

        {/* Documents */}
        <ReviewSection
          number="05"
          title="Documents"
          description="Uploaded supporting documents"
          onEdit={() =>
            navigate(`/applications/${id}/documents`)
          }
        >

          <div className="space-y-3">

            <DocumentStatus
              label="Passport"
              uploaded={
                application.documents?.passport
              }
              required
            />

            <DocumentStatus
              label="Photograph"
              uploaded={
                application.documents?.photo
              }
              required
            />

            <DocumentStatus
              label="Additional Document"
              uploaded={
                application.documents?.additionalDocument
              }
            />

          </div>

        </ReviewSection>

        {/* Submit Section */}
        <div className="mt-6 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-slate-900/70 to-indigo-500/10 p-6 md:p-8">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 text-xl">
                ✓
              </span>
            </div>

            <div>

              <h2 className="text-xl font-semibold">
                Ready to Submit?
              </h2>

              <p className="text-sm text-slate-400 mt-1 leading-6">
                Please make sure all information is accurate and
                all required documents have been uploaded.
              </p>

            </div>

          </div>

          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">

            <div className="flex items-start gap-3">

              <span className="text-amber-400">
                !
              </span>

              <p className="text-sm text-amber-300/80 leading-6">
                Once submitted, your application will be sent for
                review. Make sure everything is correct before
                continuing.
              </p>

            </div>

          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">

            <button
              onClick={() =>
                navigate(`/applications/${id}/documents`)
              }
              className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition font-medium"
            >
              ← Previous
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">

                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>

                  Submitting...

                </span>
              ) : (
                "Submit Application →"
              )}
            </button>

          </div>

        </div>

        {/* Security Footer */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-600">
          <span>🔒</span>
          Your application information is securely handled.
        </div>

      </main>

    </div>
  );
}

/* Review Section */

function ReviewSection({
  number,
  title,
  description,
  onEdit,
  children,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden mb-5">

      <div className="px-6 md:px-8 py-5 border-b border-slate-800 flex items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <span className="text-blue-400 text-sm font-medium">
              {number}
            </span>
          </div>

          <div>

            <h2 className="font-semibold text-lg">
              {title}
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              {description}
            </p>

          </div>

        </div>

        <button
          onClick={onEdit}
          className="px-3 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition text-sm"
        >
          Edit
        </button>

      </div>

      <div className="p-6 md:p-8">
        {children}
      </div>

    </div>
  );
}

/* Detail */

function Detail({ label, value, full }) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-950/40 p-4 ${
        full ? "md:col-span-2" : ""
      }`}
    >

      <p className="text-xs text-slate-500 uppercase tracking-wide">
        {label}
      </p>

      <p className="text-sm font-medium text-slate-200 mt-2 break-words">
        {value || "Not provided"}
      </p>

    </div>
  );
}

/* Security Declaration */

function Declaration({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4">

      <span className="text-sm text-slate-300">
        {label}
      </span>

      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${
          value
            ? "bg-red-500/10 text-red-400 border-red-500/20"
            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        }`}
      >
        {value ? "Yes" : "No"}
      </span>

    </div>
  );
}

/* Document Status */

function DocumentStatus({
  label,
  uploaded,
  required,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4">

      <div className="flex items-center gap-3">

        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            uploaded
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {uploaded ? "✓" : "!"}
        </div>

        <div>

          <p className="text-sm font-medium text-slate-200">
            {label}
          </p>

          {required && (
            <p className="text-xs text-slate-600 mt-0.5">
              Required
            </p>
          )}

        </div>

      </div>

      <span
        className={`text-xs font-medium ${
          uploaded
            ? "text-emerald-400"
            : "text-red-400"
        }`}
      >
        {uploaded ? "Uploaded" : "Not uploaded"}
      </span>

    </div>
  );
}

/* Progress Step */

function Step({ label, active, completed }) {
  return (
    <div className="flex items-center gap-2">

      <div
        className={`w-2 h-2 rounded-full ${
          completed
            ? "bg-emerald-400"
            : active
            ? "bg-blue-500"
            : "bg-slate-700"
        }`}
      />

      <span
        className={`text-xs ${
          completed
            ? "text-emerald-400"
            : active
            ? "text-blue-400 font-medium"
            : "text-slate-600"
        }`}
      >
        {label}
      </span>

    </div>
  );
}

export default ReviewApplication;