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
              navigate(`/applications/${id}/passport`)
            }
            className="text-blue-600"
          >
            ← Back to Passport Details
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
            Step 3 of 6 — Address Details
          </p>
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "50%" }}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-8"
        >

          <h2 className="text-2xl font-semibold mb-6">
            Address Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Address
              </label>

              <textarea
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                required
                rows="3"
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter your complete address"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter city"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium mb-2">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter state"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter country"
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Postal Code
              </label>

              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter postal code"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">

            <button
              type="button"
              onClick={() =>
                navigate(`/applications/${id}/passport`)
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

export default AddressDetails;
