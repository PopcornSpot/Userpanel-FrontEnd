//ForgotPassword
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ResetImage from "../assets/LoginImagebg.jpg"



const initialState = {
  email: "",
  password: "",
  conformPassword: ""
};


const ForgotPassword = () => {

  const [formData, setFormData] = useState(initialState);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .put("https://popcornspotbackend-production.up.railway.app/user/resetpassword", formData,
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.Message);
          setFormData(initialState);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className={`w-full h-screen flex items-center justify-center bg-gray-200`}>
      <div className="w-[60%] sm:max-lg:w-[45%]  lg:max-xl:[50%] xl:max-2xl: h-full max-sm:hidden">
        <img src={ResetImage} alt="Background" className="w-full h-full object-cover" />
      </div>
      <div className={`w-[100%] sm:max-lg:w-[55%]  lg:max-xl:[50%] h-screen flex flex-col items-center bg-gray-50 justify-center gap-0`}>
        <h1 className={`text-2xl font-bold text-center mb-4`}>Reset Password</h1>
        <form
          onSubmit={handleOnSubmit}
          className="w-[370px] sm:w-[400px] max-w-full bg-gray-800 rounded-lg flex flex-col justify-center items-center p-6 gap-6 shadow-md"
        >
          <div className="w-full">
            <label className="block text-gray-100 text-sm font-medium mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              placeholder="Enter your registered email"
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-100 text-sm font-medium mb-2">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              placeholder="Enter new password"
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-100 text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              name="conformPassword"
              value={formData.conformPassword}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 font-medium text-sm rounded-lg hover:bg-orange-500 transition duration-200"
          >
            Submit
          </button>
          <p className={`text-center text-gray-200 mt-4`}>
            <Link to={"/login"} >
              Remember your password? <span className={`text-orange-400 underline`}>Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
