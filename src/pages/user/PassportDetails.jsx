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
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() =>
              navigate(`/applications/${id}/personal`)
            }
            className="text-blue-600"
          >
            ← Back to Personal Details
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Visa Application
          </h1>

          <p className="text-gray-500 mt-2">
            Step 2 of 6 — Passport Details
          </p>
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "33.33%" }}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-8"
        >

          <h2 className="text-2xl font-semibold mb-6">
            Passport Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Passport Number */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Passport Number
              </label>

              <input
                type="text"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter passport number"
              />
            </div>

            {/* Issuing Country */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Issuing Country
              </label>

              <input
                type="text"
                name="issuingCountry"
                value={formData.issuingCountry}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter issuing country"
              />
            </div>

            {/* Issue Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Issue Date
              </label>

              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Expiry Date
              </label>

              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">

            <button
              type="button"
              onClick={() =>
                navigate(`/applications/${id}/personal`)
              }
              className="px-5 py-3 border rounded-lg hover:bg-gray-50"
            >
              ← Previous
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save & Continue →"}
            </button>

          </div>

        </form>

      </main>
    </div>
  );
}

export default PassportDetails;