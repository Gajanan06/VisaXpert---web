import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function SecurityDeclaration() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    criminalRecord: false,
    visaRejection: false,
    immigrationViolation: false,
    additionalInformation: "",
  });

  const getApplication = async () => {
    try {
      const response = await api.get(`/applications/${id}`);

      const data = response.data.application;

      setApplication(data);

      setFormData({
        criminalRecord:
          data.securityDeclaration?.criminalRecord || false,
        visaRejection:
          data.securityDeclaration?.visaRejection || false,
        immigrationViolation:
          data.securityDeclaration?.immigrationViolation || false,
        additionalInformation:
          data.securityDeclaration?.additionalInformation || "",
      });
    } catch (error) {
      console.error("Failed to fetch application:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplication();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await api.put(`/applications/${id}`, {
        securityDeclaration: formData,
      });

      navigate(`/applications/${id}/documents`);
    } catch (error) {
      console.error(
        "Failed to save security declaration:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save security declaration"
      );
    } finally {
      setSaving(false);
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
            onClick={() =>
              navigate(`/applications/${id}/address`)
            }
            className="text-sm text-slate-400 hover:text-white transition"
          >
            ← Back to Address
          </button>

        </div>

      </nav>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">

          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>

            <span className="text-sm font-medium text-blue-400">
              Visa Application
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Security Declaration
          </h1>

          <p className="text-slate-400 mt-2">
            Please answer the following questions honestly.
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
                Step 4 of 6
              </p>
            </div>

            <span className="text-sm font-medium text-blue-400">
              67%
            </span>

          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">

            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
              style={{ width: "66.66%" }}
            />

          </div>

          {/* Steps */}
          <div className="hidden md:grid grid-cols-6 gap-2 mt-5">

            <Step label="Personal" completed />

            <Step label="Passport" completed />

            <Step label="Address" completed />

            <Step label="Security" active />

            <Step label="Documents" />

            <Step label="Review" />

          </div>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden"
        >

          {/* Form Header */}
          <div className="px-6 md:px-8 py-6 border-b border-slate-800">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-medium">
                  04
                </span>
              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  Security Questions
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Select the statements that apply to your situation.
                </p>

              </div>

            </div>

          </div>

          {/* Questions */}
          <div className="p-6 md:p-8">

            <div className="space-y-4">

              {/* Criminal Record */}
              <SecurityQuestion
                name="criminalRecord"
                checked={formData.criminalRecord}
                onChange={handleChange}
                title="Criminal Record"
                description="Have you ever been convicted of a criminal offence?"
              />

              {/* Visa Rejection */}
              <SecurityQuestion
                name="visaRejection"
                checked={formData.visaRejection}
                onChange={handleChange}
                title="Previous Visa Rejection"
                description="Have you ever been refused a visa or entry to another country?"
              />

              {/* Immigration Violation */}
              <SecurityQuestion
                name="immigrationViolation"
                checked={formData.immigrationViolation}
                onChange={handleChange}
                title="Immigration Violation"
                description="Have you ever violated immigration rules?"
              />

            </div>

            {/* Additional Information */}
            <div className="mt-7">

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Additional Information
              </label>

              <p className="text-xs text-slate-500 mb-3">
                Provide any additional information that may be relevant to your application.
              </p>

              <textarea
                name="additionalInformation"
                value={formData.additionalInformation}
                onChange={handleChange}
                rows="5"
                className="form-input resize-none"
                placeholder="Provide any additional information if required..."
              />

            </div>

            {/* Important Notice */}
            <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">

              <div className="flex items-start gap-3">

                <div className="w-8 h-8 shrink-0 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <span className="text-amber-400">
                    !
                  </span>
                </div>

                <div>

                  <p className="text-sm font-medium text-amber-300">
                    Important
                  </p>

                  <p className="text-xs text-amber-300/60 mt-1 leading-5">
                    Please provide accurate information. Your answers
                    may be reviewed as part of your visa application.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="px-6 md:px-8 py-5 border-t border-slate-800 bg-slate-950/30 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">

            <button
              type="button"
              onClick={() =>
                navigate(`/applications/${id}/address`)
              }
              className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition font-medium"
            >
              ← Previous
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">

                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>

                  Saving...

                </span>
              ) : (
                "Save & Continue →"
              )}
            </button>

          </div>

        </form>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-600">
          <span>🔒</span>
          Your declaration is securely stored.
        </div>

      </main>

    </div>
  );
}

/* Security Question */

function SecurityQuestion({
  name,
  checked,
  onChange,
  title,
  description,
}) {
  return (
    <label
      className={`block cursor-pointer rounded-2xl border p-5 transition ${
        checked
          ? "border-blue-500/40 bg-blue-500/5"
          : "border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/40"
      }`}
    >

      <div className="flex items-start gap-4">

        {/* Checkbox */}
        <div className="pt-0.5">

          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className="security-checkbox"
          />

        </div>

        {/* Question */}
        <div className="flex-1">

          <div className="flex items-center justify-between gap-3">

            <h3
              className={`font-medium ${
                checked
                  ? "text-blue-300"
                  : "text-slate-200"
              }`}
            >
              {title}
            </h3>

            <span
              className={`text-xs font-medium ${
                checked
                  ? "text-blue-400"
                  : "text-slate-600"
              }`}
            >
              {checked ? "Selected" : "No"}
            </span>

          </div>

          <p className="text-sm text-slate-500 mt-1 leading-6">
            {description}
          </p>

        </div>

      </div>

    </label>
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

export default SecurityDeclaration;