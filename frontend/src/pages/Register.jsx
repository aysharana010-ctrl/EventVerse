import React from "react";

const inputClass =
  "w-full p-3 rounded-lg border border-gray-300 mt-1 outline-none focus:border-blue-600 transition-colors bg-white";

function Register() {
  return (
    <>
      {/* MAIN CONTAINER */}
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-10 p-12 bg-white rounded-2xl">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-semibold leading-tight">
            Join <span className="text-blue-600">EventVerse</span>
          </h1>
          <p className="my-4 text-gray-600">
            Register Now and Experience College Life Like Never Before!
          </p>

          <ul className="list-none">
            <li className="my-2.5">✔ Join Clubs</li>
            <li className="my-2.5">✔ Register for Events</li>
            <li className="my-2.5">✔ Get Certificates</li>
            <li className="my-2.5">✔ Stay Updated</li>
          </ul>
        </div>

        {/* RIGHT SIDE - FORM BOX */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2.5">Student Registration</h2>
          <p className="text-gray-600 mb-4">Fill in the details to create your account</p>

          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className={inputClass} />
              <input type="text" placeholder="Roll Number" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="email" placeholder="Email Address" className={inputClass} />
              <input type="text" placeholder="Phone Number" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className={inputClass}>
                <option>Select Department</option>
                <option>CSE</option>
                <option>IT</option>
                <option>ECE</option>
              </select>

              <select className={inputClass}>
                <option>Select Year</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="password" placeholder="Password" className={inputClass} />
              <input type="password" placeholder="Confirm Password" className={inputClass} />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="w-4 h-4" />
              <label>I agree to the Terms and Conditions and Privacy Policy</label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-950 text-white mt-4 cursor-pointer hover:opacity-90 transition-opacity"
            >
              Register Now
            </button>

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Login here
              </span>
            </p>
          </form>
        </div>

      </div>
    </>
  );
}

export default Register;
