import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import { Navigate } from "react-router-dom";
import { supabase } from "../../helper/supaBaseClient";

const SignIn = () => {
  const { session } = useSession();
  if (session) {
    return <Navigate to="/" />;
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Signed in successfully");
    }
  };
  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <h1 className="signin-title">Welcome Back</h1>
          <p className="signin-subtitle">Sign in to your account</p>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              className="signin-input"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="signin-options">
            <label className="signin-checkbox">
              <input type="checkbox" className="signin-checkbox-input" />
              <span className="signin-checkbox-text">Remember me</span>
            </label>
            <a href="#" className="signin-forgot-password">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="signin-button"
            disabled={!formData.email || !formData.password}
          >
            Sign In
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
            Don't have an account?{" "}
            <a href="/signup" className="signin-link">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
