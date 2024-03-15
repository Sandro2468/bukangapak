"use client";

import Link from "next/link";
import { useState } from "react";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
    console.log(formData);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register");
      }
      window.location.href = "/login";
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white-50">
      <div className="w-80 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-red-500 mb-6">Register</h2>
        <form method="POST" onSubmit={handleSubmit} className="text-black">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">
              Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold">
              Username
            </label>
            <input
              required
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-bold py-3 rounded-lg hover:bg-pink-600"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/login" legacyBehavior>
            <a className="text-pink-500 hover:text-pink-600 font-semibold">
              Log In
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
