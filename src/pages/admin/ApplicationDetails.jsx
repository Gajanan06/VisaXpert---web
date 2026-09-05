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

      await api.post(`/admin/applications/${id}/analyze`);

      await getApplication();

      alert("AI analysis completed successfully.");
    } catch (error) {
      console.error("AI analysis failed:", error);

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
            Loading application...
          </p>

        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">

          <div className="text-4xl mb-4">
            📋
          </div>

          <h2 className="text-xl font-semibold">
            Application not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The requested application could not be found.
          </p>

          <button
            onClick={() =>
              navigate("/admin/applications")
            }
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Back to Applications
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <button
            onClick={() =>
              navigate("/admin/applications")
            }
            className="flex items-center gap-3 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <span className="text-lg">
              ←
            </span>

            Back to Applications
          </button>

          <div className="flex items-center gap-3">

            <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <span className="text-xs font-bold">
                VX
              </span>
            </div>

            <span className="text-sm font-semibold">
              VisaXpert Admin
            </span>

          </div>

        </div>

      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

            <div>

              <p className="mb-2 text-sm font-medium text-indigo-400">
                APPLICATION REVIEW
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Application Details
              </h1>

            </div>

            <span
              className={`inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm font-medium ${getStatusStyle(
                application.status
              )}`}
            >
              <span className="mr-2 h-2 w-2 rounded-full bg-current"></span>

              {application.status}
            </span>

          </div>

        </div>

        {/* Applicant Information */}
        <Section
          title="Applicant Information"
          subtitle="Basic information associated with this application."
          icon="👤"
        >

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <Detail
              label="Full Name"
              value={application.user?.name}
            />

            <Detail
              label="Email Address"
              value={application.user?.email}
            />

          </div>

        </Section>

        {/* Personal Details */}
        <Section
          title="Personal Details"
          subtitle="Personal information provided by the applicant."
          icon="🧑"
        >

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

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

        {/* Passport Details */}
        <Section
          title="Passport Details"
          subtitle="Passport information provided for verification."
          icon="🛂"
        >

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

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
        <Section
          title="Address Details"
          subtitle="Current residential information provided by the applicant."
          icon="📍"
        >

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

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

        {/* Security Declaration */}
        <Section
          title="Security Declaration"
          subtitle="Answers provided by the applicant during the application process."
          icon="🔐"
        >

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

            <SecurityItem
              label="Criminal Record"
              value={
                application.securityDeclaration
                  ?.criminalRecord
              }
            />

            <SecurityItem
              label="Previous Visa Rejection"
              value={
                application.securityDeclaration
                  ?.visaRejection
              }
            />

            <SecurityItem
              label="Immigration Violation"
              value={
                application.securityDeclaration
                  ?.immigrationViolation
              }
            />

          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/50 p-5">

            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Additional Information
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {application.securityDeclaration
                ?.additionalInformation || "None provided"}
            </p>

          </div>

        </Section>

        {/* Documents */}
        <Section
          title="Documents"
          subtitle="Documents uploaded by the applicant for verification."
          icon="📎"
        >

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <DocumentLink
              label="Passport"
              file={application.documents?.passport}
              icon="🛂"
            />

            <DocumentLink
              label="Photograph"
              file={application.documents?.photo}
              icon="📷"
            />

            <DocumentLink
              label="Additional Document"
              file={
                application.documents
                  ?.additionalDocument
              }
              icon="📄"
            />

          </div>

        </Section>

        {/* AI Analysis */}
        <Section
          title="AI Verification"
          subtitle="AI-assisted analysis of the submitted application."
          icon="✨"
        >

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">

            {application.aiAnalysis?.riskScore != null ? (

              <div>

                {/* Risk Overview */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">

                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Risk Score
                    </p>

                    <div className="mt-3 flex items-end gap-2">

                      <span className="text-4xl font-bold">
                        {application.aiAnalysis.riskScore}
                      </span>

                      <span className="mb-1 text-sm text-slate-500">
                        / 100
                      </span>

                    </div>

                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">

                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Risk Level
                    </p>

                    <p className="mt-3 text-2xl font-bold text-indigo-400">
                      {application.aiAnalysis.riskLevel}
                    </p>

                  </div>

                </div>

                {/* Summary */}
                <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 p-5">

                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    AI Summary
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {application.aiAnalysis.summary ||
                      "No summary available."}
                  </p>

                </div>

                {/* Advisory */}
                <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">

                  <div className="flex gap-3">

                    <span className="text-lg">
                      ⚠️
                    </span>

                    <p className="text-sm leading-6 text-yellow-300">
                      AI analysis is advisory only. The
                      final application decision must be
                      made by the administrator.
                    </p>

                  </div>

                </div>

              </div>

            ) : (

              <div className="text-center py-8">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-2xl">
                  ✨
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  AI Analysis Not Available
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Run the AI verification to generate a
                  risk score and application summary.
                </p>

                <button
                  onClick={handleAIAnalysis}
                  disabled={analyzing}
                  className="mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:from-purple-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {analyzing
                    ? "Analyzing Application..."
                    : "Run AI Analysis"}
                </button>

              </div>

            )}

          </div>

        </Section>

        {/* Admin Decision */}
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">

          <div className="mb-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                ⚖️
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Admin Decision
                </h2>

                <p className="text-sm text-slate-500">
                  Review the application and make a final decision.
                </p>
              </div>

            </div>

          </div>

          {/* Notes */}
          <div className="mb-6">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Admin Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Enter review notes..."
              rows="5"
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-sm text-slate-200 outline-none placeholder:text-slate-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <p className="mt-2 text-xs text-slate-600">
              Add any important information or feedback
              for the applicant.
            </p>

          </div>

          {/* Decision Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              onClick={() =>
                handleStatusUpdate("Approved")
              }
              disabled={updatingStatus}
              className="flex-1 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ✓ Approve Application
            </button>

            <button
              onClick={() =>
                handleStatusUpdate("Rejected")
              }
              disabled={updatingStatus}
              className="flex-1 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ✕ Reject Application
            </button>

            <button
              onClick={() =>
                handleStatusUpdate(
                  "Requires Attention"
                )
              }
              disabled={updatingStatus}
              className="flex-1 rounded-xl bg-yellow-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ! Requires Attention
            </button>

          </div>

          {updatingStatus && (
            <p className="mt-4 text-center text-xs text-slate-500">
              Updating application status...
            </p>
          )}

        </section>

        {/* Previous Review */}
        {application.adminReview && (

          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">

            <div className="flex items-center gap-3 mb-5">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700">
                📝
              </div>

              <div>

                <h2 className="text-lg font-semibold">
                  Previous Admin Review
                </h2>

                <p className="text-sm text-slate-500">
                  Details from the previous administrative review.
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <Detail
                label="Previous Status"
                value={
                  application.adminReview.status
                }
              />

              <Detail
                label="Reviewed At"
                value={
                  application.adminReview.reviewedAt
                    ? new Date(
                        application.adminReview.reviewedAt
                      ).toLocaleString()
                    : "Not available"
                }
              />

            </div>

            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/50 p-5">

              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Previous Notes
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {application.adminReview.notes ||
                  "No notes"}
              </p>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

function Section({
  title,
  subtitle,
  icon,
  children,
}) {
  return (
    <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-slate-700">
          <span>{icon}</span>
        </div>

        <div>

          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

      </div>

      {children}

    </section>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">

      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-medium text-slate-200">
        {value || "Not provided"}
      </p>

    </div>
  );
}

function SecurityItem({ label, value }) {
  const isYes = value === true;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">

      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <div className="mt-3">

        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
            isYes
              ? "border-red-500/20 bg-red-500/10 text-red-400"
              : "border-green-500/20 bg-green-500/10 text-green-400"
          }`}
        >
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current"></span>

          {isYes ? "Yes" : "No"}
        </span>

      </div>

    </div>
  );
}

function DocumentLink({
  label,
  file,
  icon,
}) {
  if (!file) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
            {icon}
          </div>

          <div>
            <p className="text-sm font-medium text-slate-300">
              {label}
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Not uploaded
            </p>
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">

      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            {icon}
          </div>

          <div>

            <p className="text-sm font-medium text-slate-300">
              {label}
            </p>

            <p className="mt-1 text-xs text-green-400">
              Uploaded
            </p>

          </div>

        </div>

        <a
          href={`http://localhost:5000${file}`}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-indigo-400 transition hover:border-indigo-500/40 hover:bg-indigo-500/10"
        >
          View
        </a>

      </div>

    </div>
  );
}

export default ApplicationDetails;