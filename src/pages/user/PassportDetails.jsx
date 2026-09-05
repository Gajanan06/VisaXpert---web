import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function PassportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    passportNumber: "",
    issueDate: "",
    expiryDate: "",
    issuingCountry: "",
  });

  const getApplication = async () => {
    try {
      const response = await api.get(`/applications/${id}`);

      const data = response.data.application;

      setApplication(data);

      setFormData({
        passportNumber:
          data.passportDetails?.passportNumber || "",
        issueDate:
          data.passportDetails?.issueDate || "",
        expiryDate:
          data.passportDetails?.expiryDate || "",
        issuingCountry:
          data.passportDetails?.issuingCountry || "",
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.issueDate >= formData.expiryDate) {
      alert("Passport expiry date must be after issue date.");
      return;
    }

    try {
      setSaving(true);

      await api.put(`/applications/${id}`, {
        passportDetails: formData,
      });

      navigate(`/applications/${id}/address`);
    } catch (error) {
      console.error("Failed to save passport details:", error);

      alert(
        error.response?.data?.message ||
          "Failed to save passport details"
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
              navigate(`/applications/${id}/personal`)
            }
            className="text-sm text-slate-400 hover:text-white transition"
          >
            ← Back to Personal
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
            Passport Details
          </h1>

          <p className="text-slate-400 mt-2">
            Enter the details exactly as they appear on your passport.
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
                Step 2 of 6
              </p>
            </div>

            <span className="text-sm font-medium text-blue-400">
              33%
            </span>

          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
              style={{ width: "33.33%" }}
            />
          </div>

          {/* Steps */}
          <div className="hidden md:grid grid-cols-6 gap-2 mt-5">

            <Step
              label="Personal"
              completed
            />

            <Step
              label="Passport"
              active
            />

            <Step label="Address" />

            <Step label="Security" />

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
                  02
                </span>
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Passport Information
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Provide your current passport information.
                </p>
              </div>

            </div>

          </div>

          {/* Fields */}
          <div className="p-6 md:p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Passport Number */}
              <FormField
                label="Passport Number"
                required
              >
                <input
                  type="text"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter passport number"
                />
              </FormField>

              {/* Issuing Country */}
              <FormField
                label="Issuing Country"
                required
              >
                <input
                  type="text"
                  name="issuingCountry"
                  value={formData.issuingCountry}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter issuing country"
                />
              </FormField>

              {/* Issue Date */}
              <FormField
                label="Issue Date"
                required
              >
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </FormField>

              {/* Expiry Date */}
              <FormField
                label="Expiry Date"
                required
              >
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </FormField>

            </div>

            {/* Passport Reminder */}
            <div className="mt-6 rounded-xl border border-blue-500/10 bg-blue-500/5 p-4">

              <div className="flex items-start gap-3">

                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 text-sm">
                    i
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-blue-300">
                    Check your passport
                  </p>

                  <p className="text-xs text-slate-500 mt-1 leading-5">
                    Make sure the passport number, issue date,
                    expiry date, and issuing country match your
                    passport exactly.
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
                navigate(`/applications/${id}/personal`)
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
          Your passport information is securely stored.
        </div>

      </main>

      {/* Input Styling */}
      <style>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(51 65 85);
          background: rgb(15 23 42);
          color: rgb(226 232 240);
          padding: 0.75rem 1rem;
          outline: none;
          transition: all 0.2s;
        }

        .form-input::placeholder {
          color: rgb(100 116 139);
        }

        .form-input:focus {
          border-color: rgb(59 130 246);
          box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
        }
      `}</style>

    </div>
  );
}

function FormField({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}

        {required && (
          <span className="text-blue-400 ml-1">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

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

export default PassportDetails;