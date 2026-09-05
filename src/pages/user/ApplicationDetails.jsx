import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function Section({ title, children }) {
  return (
    <div className="mt-8 pt-8 border-t border-slate-800">
      {title && (
        <h2 className="text-xl font-semibold text-white mb-5">
          {title}
        </h2>
      )}

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
            We couldn't find this visa application.
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

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

      case "Rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      case "Requires Attention":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";

      case "In Review":
        return "bg-violet-500/10 text-violet-400 border-violet-500/20";

      case "Submitted":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
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

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

            <div>

              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>

                <span className="text-sm font-medium text-blue-400">
                  Application Workspace
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Visa Application
              </h1>

            </div>

            <span
              className={`inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border text-sm font-medium ${getStatusStyle(
                application.status
              )}`}
            >

              <span
                className={`w-1.5 h-1.5 rounded-full ${getStatusDot(
                  application.status
                )}`}
              />

              {application.status}

            </span>

          </div>

        </div>

        {/* Progress */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 mb-6">

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-sm font-semibold">
                Application Progress
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Complete each section before submitting.
              </p>
            </div>

            <span className="text-sm font-medium text-blue-400">
              1 / 6
            </span>

          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
              style={{ width: "16.66%" }}
            />

          </div>

        </div>

        {/* Application Steps */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">

          <div className="px-6 md:px-8 py-6 border-b border-slate-800">

            <h2 className="text-xl font-semibold">
              Application Sections
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Complete your visa application step by step.
            </p>

          </div>

          <div className="p-6 md:p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Personal */}
              <ApplicationStep
                number="01"
                title="Personal Details"
                description="Add your personal information."
                active={application.status === "Draft"}
                completed={Boolean(
                  application.personalDetails?.firstName
                )}
                action={
                  application.status === "Draft"
                    ? () =>
                        navigate(
                          `/applications/${application._id}/personal`
                        )
                    : null
                }
                actionText={
                  application.personalDetails?.firstName
                    ? "Edit"
                    : "Start"
                }
              />

              {/* Passport */}
                <ApplicationStep
                number="02"
                title="Passport Details"
                description="Add your passport information."
                completed={Boolean(
                    application.passportDetails?.passportNumber
                )}
                />

                {/* Address */}
                <ApplicationStep
                number="03"
                title="Address Details"
                description="Add your current address."
                completed={Boolean(
                    application.addressDetails?.city
                )}
                />

                {/* Security */}
                <ApplicationStep
                number="04"
                title="Security Declaration"
                description="Answer the security questions."
                completed={Boolean(
                    application.securityDeclaration
                    ?.additionalInformation ||
                    application.securityDeclaration
                        ?.criminalRecord ||
                    application.securityDeclaration
                        ?.visaRejection ||
                    application.securityDeclaration
                        ?.immigrationViolation
                )}
                />

              {/* Documents */}
              <ApplicationStep
                number="05"
                title="Documents"
                description="Upload required documents."
              />

              {/* Review */}
              <ApplicationStep
                number="06"
                title="Review & Submit"
                description="Review your application and submit it."
              />

            </div>

          </div>

        </div>

        {/* Application Status */}
        <Section title="Application Status">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <p className="text-sm text-slate-500">
                  Current Status
                </p>

                <div className="flex items-center gap-2 mt-2">

                  <span
                    className={`w-2 h-2 rounded-full ${getStatusDot(
                      application.status
                    )}`}
                  />

                  <p className="text-xl font-semibold">
                    {application.status}
                  </p>

                </div>

              </div>

              <span
                className={`self-start sm:self-auto px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusStyle(
                  application.status
                )}`}
              >
                {application.status}
              </span>

            </div>

            {/* Approved */}
            {application.status === "Approved" && (
              <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">

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
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-5">

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
              <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">

                <div className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                    <span className="text-amber-400">
                      !
                    </span>
                  </div>

                  <div>

                    <h3 className="font-semibold text-amber-400">
                      Action Required
                    </h3>

                    <p className="text-sm text-amber-400/70 mt-1">
                      Please review the admin notes and provide the required information.
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* Admin Notes */}
            {application.adminReview?.notes && (
              <div className="mt-5 rounded-xl border border-slate-700 bg-slate-800/40 p-5">

                <div className="flex items-center gap-2 mb-2">

                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>

                  <p className="text-sm font-semibold text-slate-300">
                    Admin Notes
                  </p>

                </div>

                <p className="text-sm text-slate-400 leading-6">
                  {application.adminReview.notes}
                </p>

              </div>
            )}

          </div>

        </Section>

      </main>

    </div>
  );
}

function ApplicationStep({
  number,
  title,
  description,
  active = false,
  completed = false,
  action,
  actionText,
}) {
  return (
    <div
      className={`group rounded-2xl border p-5 transition ${
        active
          ? "border-slate-700 bg-slate-800/40 hover:bg-slate-800/70"
          : "border-slate-800 bg-slate-950/30"
      }`}
    >

      <div className="flex items-start gap-4">

        {/* Number */}
        <div
          className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border ${
            completed
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : active
              ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
              : "bg-slate-800 border-slate-700 text-slate-500"
          }`}
        >
          {completed ? "✓" : number}
        </div>

        <div className="flex-1 min-w-0">

          <div className="flex items-start justify-between gap-3">

            <div>

              <h3
                className={`font-semibold ${
                  active
                    ? "text-slate-100"
                    : "text-slate-400"
                }`}
              >
                {title}
              </h3>

              <p className="text-sm text-slate-500 mt-1 leading-5">
                {description}
              </p>

            </div>

            {completed && (
              <span className="text-xs font-medium text-emerald-400">
                Completed
              </span>
            )}

          </div>

          {action && (
            <button
              onClick={action}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition"
            >
              {actionText}
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default ApplicationDetails;