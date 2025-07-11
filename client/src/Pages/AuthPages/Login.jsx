import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Atoms/Loading";

const Login = ({ onClose }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const resetAllStates = () => {
    setStep(1);
    setEmail("");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
    setLoginPassword("");
    setName("");
    setLoading(false);
  };

  const closeAllModals = () => {
    setShowForgotPassword(false);
    setShowSignup(false);
    resetAllStates();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //  API call 
      onClose();
    } catch (err) {
      console.error("Login error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      // API call 
      setStep(2);
    } catch (err) {
      console.error("Send OTP error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      // API call
      setStep(3);
    } catch (err) {
      console.error("OTP verification failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      // API call
      closeAllModals();
    } catch (err) {
      console.error("Reset password failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call 
      closeAllModals();
    } catch (err) {
      console.error("Signup failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* LOGIN MODAL */}
      {!showForgotPassword && !showSignup && (
        <div className="fixed inset-0 bg-black/10 z-[99999] flex items-center justify-center overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-96 max-w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              onClick={onClose}
            >
              &times;
            </button>

            <p className="text-4xl font-bold mb-6 text-center heading-font">
              Login
            </p>
            <p className="text-gray-400 inter text-md">
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setShowSignup(true);
                  resetAllStates();
                }}
                className="!no-underline !text-green-600 hover:!text-green-700 transition-all duration-300"
              >
                Register Now
              </button>
            </p>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block mb-1 font-medium text-gray-700 inter">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 inter">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full input"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              {loading ? (
                <Loading width="100%" />
              ) : (
                <button type="submit" className="w-full green-button">
                  Login
                </button>
              )}

              <div className="text-right">
                <button
                  type="button"
                  className="text-green-600 hover:text-green-700 text-sm"
                  onClick={() => {
                    setShowForgotPassword(true);
                    resetAllStates();
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD MODAL */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/20 z-[99999] flex items-center justify-center overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-96 max-w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              onClick={closeAllModals}
            >
              &times;
            </button>

            <p className="text-2xl font-bold mb-4 text-center heading-font">
              Forgot Password
            </p>

            {step === 1 && (
              <>
                <label className="block mb-1 font-medium text-gray-700 inter">
                  Enter your email
                </label>
                <input
                  type="email"
                  className="w-full input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                {loading ? (
                  <Loading width="100%" />
                ) : (
                  <button
                    onClick={handleSendOtp}
                    className="w-full green-button mt-3"
                  >
                    Send OTP
                  </button>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <label className="block mb-2 font-medium text-gray-700 inter text-center">
                  Enter OTP
                </label>
                <div className="flex justify-between gap-2 mb-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-10 input text-center"
                      value={otp[index] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!/^\d?$/.test(value)) return;
                        const newOtp = otp.split("");
                        newOtp[index] = value;
                        setOtp(newOtp.join(""));
                        if (value && index < 5) {
                          const next = document.getElementById(
                            `otp-${index + 1}`
                          );
                          if (next) next.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otp[index] && index > 0) {
                          const prev = document.getElementById(
                            `otp-${index - 1}`
                          );
                          if (prev) prev.focus();
                        }
                      }}
                      id={`otp-${index}`}
                    />
                  ))}
                </div>
                {loading ? (
                  <Loading width="100%" />
                ) : (
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full green-button"
                    disabled={otp.length !== 6}
                  >
                    Verify OTP
                  </button>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <label className="block mb-1 font-medium text-gray-700 inter">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full input mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                />
                <label className="block mb-1 font-medium text-gray-700 inter">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                {loading ? (
                  <Loading width="100%" />
                ) : (
                  <button
                    onClick={handleResetPassword}
                    className="w-full green-button mt-4"
                  >
                    Reset Password
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* SIGNUP MODAL */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/10 z-[99999] flex items-center justify-center overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-96 max-w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              onClick={closeAllModals}
            >
              &times;
            </button>

            <p className="text-3xl font-bold mb-6 text-center heading-font">
              Sign Up
            </p>

            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label className="block mb-1 font-medium text-gray-700 inter">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full input"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 inter">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full input"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 inter">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 inter">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {loading ? (
                <Loading width="100%" />
              ) : (
                <button type="submit" className="w-full green-button">
                  Register
                </button>
              )}
            </form>

            <p className="text-md inter text-gray-400 text-center mt-3">
              Already have an account?{" "}
              <button
                className="text-green-600 hover:text-green-700"
                onClick={() => {
                  setShowSignup(false);
                  resetAllStates();
                }}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
