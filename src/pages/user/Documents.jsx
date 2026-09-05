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
              navigate(`/applications/${id}/security`)
            }
            className="text-sm text-slate-400 hover:text-white transition"
          >
            ← Back to Security
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
            Upload Documents
          </h1>

          <p className="text-slate-400 mt-2">
            Upload clear copies of the documents required for your application.
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
                Step 5 of 6
              </p>
            </div>

            <span className="text-sm font-medium text-blue-400">
              83%
            </span>

          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">

            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
              style={{ width: "83.33%" }}
            />

          </div>

          {/* Steps */}
          <div className="hidden md:grid grid-cols-6 gap-2 mt-5">

            <Step label="Personal" completed />

            <Step label="Passport" completed />

            <Step label="Address" completed />

            <Step label="Security" completed />

            <Step label="Documents" active />

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
                  05
                </span>
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Required Documents
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Upload your documents in JPG, PNG, or PDF format.
                </p>
              </div>

            </div>

          </div>

          {/* Upload Areas */}
          <div className="p-6 md:p-8 space-y-5">

            {/* Passport */}
            <DocumentUpload
              name="passport"
              title="Passport"
              description="Upload a clear copy of your passport."
              accept=".jpg,.jpeg,.png,.pdf"
              required
              file={files.passport}
              existingFile={application.documents?.passport}
              onChange={handleChange}
            />

            {/* Photo */}
            <DocumentUpload
              name="photo"
              title="Photograph"
              description="Upload a recent passport-style photograph."
              accept=".jpg,.jpeg,.png"
              required
              file={files.photo}
              existingFile={application.documents?.photo}
              onChange={handleChange}
            />

            {/* Additional Document */}
            <DocumentUpload
              name="additionalDocument"
              title="Additional Document"
              description="Upload any supporting document if required."
              accept=".jpg,.jpeg,.png,.pdf"
              file={files.additionalDocument}
              existingFile={
                application.documents?.additionalDocument
              }
              onChange={handleChange}
            />

          </div>

          {/* Information */}
          <div className="px-6 md:px-8 pb-6">

            <div className="rounded-xl border border-blue-500/10 bg-blue-500/5 p-4">

              <div className="flex items-start gap-3">

                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 text-sm">
                    i
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-blue-300">
                    Document guidelines
                  </p>

                  <p className="text-xs text-slate-500 mt-1 leading-5">
                    Make sure your documents are clear, readable,
                    and contain all required information.
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
                navigate(`/applications/${id}/security`)
              }
              className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition font-medium"
            >
              ← Previous
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                  Uploading...
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
          Your documents are securely handled.
        </div>

      </main>

    </div>
  );
}

function DocumentUpload({
  name,
  title,
  description,
  accept,
  required,
  file,
  existingFile,
  onChange,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 hover:border-slate-700 transition">

      <div className="flex flex-col sm:flex-row sm:items-start gap-4">

        {/* Icon */}
        <div className="w-11 h-11 shrink-0 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
          <span className="text-blue-400 text-lg">
            ↑
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <label className="text-sm font-semibold text-slate-200">
              {title}
            </label>

            {required && (
              <span className="text-xs text-blue-400">
                Required
              </span>
            )}

            {existingFile && !file && (
              <span className="text-xs text-emerald-400">
                ✓ Already uploaded
              </span>
            )}

          </div>

          <p className="text-xs text-slate-500 mt-1 mb-4">
            {description}
          </p>

          <label className="block cursor-pointer">

            <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/60 hover:bg-slate-800/70 hover:border-blue-500/50 transition p-4">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>

                  {file ? (
                    <>
                      <p className="text-sm font-medium text-slate-200">
                        {file.name}
                      </p>

                      <p className="text-xs text-emerald-400 mt-1">
                        New file selected
                      </p>
                    </>
                  ) : existingFile ? (
                    <>
                      <p className="text-sm font-medium text-slate-300">
                        Document already uploaded
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        Choose another file to replace it.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-slate-300">
                        Choose a file
                      </p>

                      <p className="text-xs text-slate-600 mt-1">
                        Click here to browse your files
                      </p>
                    </>
                  )}

                </div>

                <span className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 text-xs font-medium">
                  Browse
                </span>

              </div>

            </div>

            <input
              type="file"
              name={name}
              accept={accept}
              onChange={onChange}
              required={required && !existingFile}
              className="hidden"
            />

          </label>

        </div>

      </div>

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

export default Documents;