import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import { Navigate } from "react-router-dom";
import { supabase } from "../../helper/supaBaseClient";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { session } = useSession();
  if (session) {
    return <Navigate to="/" />;
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { fullName: formData.fullName },
      },
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Account created successfully");
    }
  };
  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <h1 className="signin-title">Create Account</h1>
          <p className="signin-subtitle">Join us today</p>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="signin-input-group">
            <label className="signin-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="signin-input"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="signin-input-group">
            <label className="signin-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="signin-input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="signin-input-group">
            <label className="signin-label">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="signin-input"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="signin-input-group">
            <label className="signin-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="signin-input"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="signin-options">
            <label className="signin-checkbox">
              <input type="checkbox" className="signin-checkbox-input" />
              <span className="signin-checkbox-text">
                I agree to the Terms & Conditions
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="signin-button"
            disabled={
              !formData.fullName ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword
            }
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </form>

        <div className="signin-divider">
          <span className="signin-divider-text">or</span>
        </div>

        <div className="signin-social-buttons">
          <button className="signin-social-button">
            <span className="signin-social-icon">📧</span>
            Continue with Google
          </button>
          <button className="signin-social-button">
            <span className="signin-social-icon">📘</span>
            Continue with Facebook
          </button>
        </div>

        <div className="signin-footer">
          <p className="signin-footer-text">
            Already have an account?{" "}
            <a href="/signin" className="signin-link">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
