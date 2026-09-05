import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function AddressDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    addressLine: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const getApplication = async () => {
    try {
      const response = await api.get(`/applications/${id}`);

      const data = response.data.application;

      setApplication(data);

      setFormData({
        addressLine: data.addressDetails?.addressLine || "",
        city: data.addressDetails?.city || "",
        state: data.addressDetails?.state || "",
        country: data.addressDetails?.country || "",
        postalCode: data.addressDetails?.postalCode || "",
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

    try {
      setSaving(true);

      await api.put(`/applications/${id}`, {
        addressDetails: formData,
      });

      navigate(`/applications/${id}/security`);
    } catch (error) {
      console.error("Failed to save address:", error);

      alert(
        error.response?.data?.message ||
          "Failed to save address details"
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
              navigate(`/applications/${id}/passport`)
            }
            className="text-sm text-slate-400 hover:text-white transition"
          >
            ← Back to Passport
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
            Address Details
          </h1>

          <p className="text-slate-400 mt-2">
            Provide your current residential address.
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
                Step 3 of 6
              </p>
            </div>

            <span className="text-sm font-medium text-blue-400">
              50%
            </span>

          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
              style={{ width: "50%" }}
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
              completed
            />

            <Step
              label="Address"
              active
            />

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
                  03
                </span>
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Address Information
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Enter your current residential address details.
                </p>
              </div>

            </div>

          </div>

          {/* Fields */}
          <div className="p-6 md:p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Address */}
              <div className="md:col-span-2">

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Address
                  <span className="text-blue-400 ml-1">
                    *
                  </span>
                </label>

                <textarea
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="form-input resize-none"
                  placeholder="Enter your complete residential address"
                />

                <p className="text-xs text-slate-600 mt-2">
                  Include house/building number, street and locality.
                </p>

              </div>

              {/* City */}
              <FormField
                label="City"
                required
              >
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter city"
                />
              </FormField>

              {/* State */}
              <FormField
                label="State / Province"
                required
              >
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter state or province"
                />
              </FormField>

              {/* Country */}
              <FormField
                label="Country"
                required
              >
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter country"
                />
              </FormField>

              {/* Postal Code */}
              <FormField
                label="Postal Code"
                required
              >
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter postal code"
                />
              </FormField>

            </div>

          </div>

          {/* Footer */}
          <div className="px-6 md:px-8 py-5 border-t border-slate-800 bg-slate-950/30 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">

            <button
              type="button"
              onClick={() =>
                navigate(`/applications/${id}/passport`)
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
          Your address information is securely stored.
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

export default AddressDetails;