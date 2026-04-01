import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Signup</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 px-4 py-3 rounded-xl border"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-xl border"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-xl border"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700">
          Signup
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;