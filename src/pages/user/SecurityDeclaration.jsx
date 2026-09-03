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
              navigate(`/applications/${id}/address`)
            }
            className="text-blue-600"
          >
            ← Back to Address Details
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
            Step 4 of 6 — Security Declaration
          </p>
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "66.66%" }}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-8"
        >

          <h2 className="text-2xl font-semibold mb-2">
            Security Declaration
          </h2>

          <p className="text-gray-500 mb-8">
            Please answer the following questions honestly.
          </p>

          {/* Criminal Record */}
          <div className="border rounded-lg p-5 mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="criminalRecord"
                checked={formData.criminalRecord}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <span className="font-medium">
                Have you ever been convicted of a criminal
                offence?
              </span>
            </label>
          </div>

          {/* Visa Rejection */}
          <div className="border rounded-lg p-5 mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="visaRejection"
                checked={formData.visaRejection}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <span className="font-medium">
                Have you ever been refused a visa or entry
                to another country?
              </span>
            </label>
          </div>

          {/* Immigration Violation */}
          <div className="border rounded-lg p-5 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="immigrationViolation"
                checked={formData.immigrationViolation}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <span className="font-medium">
                Have you ever violated immigration rules?
              </span>
            </label>
          </div>

          {/* Additional Information */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Additional Information
            </label>

            <textarea
              name="additionalInformation"
              value={formData.additionalInformation}
              onChange={handleChange}
              rows="5"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Provide any additional information if required..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">

            <button
              type="button"
              onClick={() =>
                navigate(`/applications/${id}/address`)
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

export default SecurityDeclaration;