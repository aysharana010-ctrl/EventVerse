import React from "react";
import "./register.css"; 

function Register() {
  return (
    <>
      {/* 🔵 NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          🎓 <span>EventVerse</span>
        </div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Clubs</li>
          <li>Events</li>
        </ul>

        <button className="login-btn">Login</button>
      </nav>

      {/* 🔵 MAIN CONTAINER */}
      <div className="container">
        {/* LEFT SIDE */}
        <div className="left">
          <h1>
            Join <span>EventVerse</span>
          </h1>
          <p>Register Now and Experience College Life Like Never Before!</p>

          <ul>
            <li>✔ Join Clubs</li>
            <li>✔ Register for Events</li>
            <li>✔ Get Certificates</li>
            <li>✔ Stay Updated</li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          <h2>Student Registration</h2>
          <p>Fill in the details to create your account</p>

          <form>
            <div className="row">
              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Roll Number" />
            </div>

            <div className="row">
              <input type="email" placeholder="Email Address" />
              <input type="text" placeholder="Phone Number" />
            </div>

            <div className="row">
              <select>
                <option>Select Department</option>
                <option>CSE</option>
                <option>IT</option>
                <option>ECE</option>
              </select>

              <select>
                <option>Select Year</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>

            <div className="row">
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
            </div>

            <div className="checkbox">
              <input type="checkbox" />
              <label>
                I agree to the Terms and Conditions and Privacy Policy
              </label>
            </div>

            <button type="submit">Register Now</button>

            <p className="login-text">
              Already have an account? <span>Login here</span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register; 