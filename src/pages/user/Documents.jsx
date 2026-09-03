import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function Documents() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [files, setFiles] = useState({
    passport: null,
    photo: null,
    additionalDocument: null,
  });

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

  const handleChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.passport || !files.photo) {
      alert("Passport and photo are required.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("passport", files.passport);
      formData.append("photo", files.photo);

      if (files.additionalDocument) {
        formData.append(
          "additionalDocument",
          files.additionalDocument
        );
      }

      await api.post(
        `/applications/${id}/documents`,
        formData
      );

      navigate(`/applications/${id}/review`);
    } catch (error) {
      console.error("Upload failed:", error);

      alert(
        error.response?.data?.message ||
          "Failed to upload documents"
      );
    } finally {
      setUploading(false);
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
            onClick={() =>
              navigate(`/applications/${id}/security`)
            }
            className="text-blue-600"
          >
            ← Back to Security Declaration
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Visa Application
          </h1>

          <p className="text-gray-500 mt-2">
            Step 5 of 6 — Documents
          </p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "83.33%" }}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-8"
        >

          <h2 className="text-2xl font-semibold mb-2">
            Upload Documents
          </h2>

          <p className="text-gray-500 mb-8">
            Upload clear copies of your required documents.
          </p>

          {/* Passport */}
          <div className="mb-6">
            <label className="block font-medium mb-2">
              Passport <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              name="passport"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
              required={!application.documents?.passport}
              className="w-full border rounded-lg p-3"
            />

            {application.documents?.passport && (
              <p className="text-sm text-green-600 mt-2">
                Passport already uploaded
              </p>
            )}
          </div>

          {/* Photo */}
          <div className="mb-6">
            <label className="block font-medium mb-2">
              Photograph <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              name="photo"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              required={!application.documents?.photo}
              className="w-full border rounded-lg p-3"
            />

            {application.documents?.photo && (
              <p className="text-sm text-green-600 mt-2">
                Photograph already uploaded
              </p>
            )}
          </div>

          {/* Additional Document */}
          <div className="mb-8">
            <label className="block font-medium mb-2">
              Additional Document
            </label>

            <input
              type="file"
              name="additionalDocument"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            {application.documents?.additionalDocument && (
              <p className="text-sm text-green-600 mt-2">
                Additional document already uploaded
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">

            <button
              type="button"
              onClick={() =>
                navigate(`/applications/${id}/security`)
              }
              className="px-5 py-3 border rounded-lg hover:bg-gray-50"
            >
              ← Previous
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : "Save & Continue →"}
            </button>

          </div>

        </form>

      </main>
    </div>
  );
}

export default Documents;