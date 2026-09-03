import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function ApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    phone: "",
  });

  const getApplication = async () => {
    try {
      const response = await api.get(`/applications/${id}`);

      const data = response.data.application;

      setApplication(data);

      setFormData({
        firstName: data.personalDetails?.firstName || "",
        lastName: data.personalDetails?.lastName || "",
        dateOfBirth: data.personalDetails?.dateOfBirth || "",
        gender: data.personalDetails?.gender || "",
        nationality: data.personalDetails?.nationality || "",
        phone: data.personalDetails?.phone || "",
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
        personalDetails: formData,
      });

      navigate(`/applications/${id}/passport`);
    } catch (error) {
      console.error("Failed to save personal details:", error);

      alert(
        error.response?.data?.message ||
          "Failed to save personal details"
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

      <nav className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* Progress */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Visa Application
          </h1>

          <p className="text-gray-500 mt-2">
            Step 1 of 6 — Personal Details
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "16.66%" }}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-8"
        >

          <h2 className="text-2xl font-semibold mb-6">
            Personal Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter last name"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Date of Birth
              </label>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nationality
              </label>

              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter nationality"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter phone number"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">

            <button
              type="button"
              onClick={() => navigate(`/applications/${id}`)}
              className="px-5 py-3 border rounded-lg hover:bg-gray-50"
            >
              Back
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

export default ApplicationForm;