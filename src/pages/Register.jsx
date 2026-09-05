import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/register",
        formData
      );

      console.log(response.data);

      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>
      </div>

      {/* Register Container */}
      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-indigo-500/30 mb-4">
            <span className="text-xl font-bold text-white">
              VX
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            VisaXpert
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            AI-powered visa application platform
          </p>

        </div>

        {/* Register Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur"
        >

          {/* Heading */}
          <div className="mb-7">

            <h2 className="text-2xl font-semibold text-white">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Get started with your visa application
            </p>

          </div>

          {/* Name */}
          <div className="mb-5">

            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Full name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

          </div>

          {/* Email */}
          <div className="mb-5">

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

          </div>

          {/* Password */}
          <div className="mb-7">

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:from-blue-500 hover:to-indigo-500 hover:shadow-indigo-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Create Account
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center">

            <p className="text-sm text-slate-400">
              Already have an account?

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="ml-1 font-medium text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Sign in
              </button>
            </p>

          </div>

        </form>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Secure visa applications powered by VisaXpert
        </p>

      </div>
    </div>
  );
}

export default Register;