import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "./NavbarComponent";
import Footer from "./FooterComponent";

const initialState = {
  friendName: "",
  mobileNumber: "",
};

const FormInput = ({ type, name, placeholder, value, onChange, required }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="px-5 py-3 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 bg-gray-50 text-gray-800"
    required={required}
  />
);

const AddFriendComponent = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://popcornspotbackend-production.up.railway.app/friend/createfriend", formData,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (res.data.Error === "jwt expired") {
        navigate("/login");
        return null;
      }
      toast.success(res.data.Message);
      setFormData(initialState);
      navigate("/friends");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.Message);
    }
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-100 via-white to-gray-300">
      <div className="w-full fixed top-0 z-50">
        <NavBar />
      </div>
      <div className="flex flex-col justify-center items-center mt-24">
        <form
          onSubmit={handleOnSubmit}
          onReset={handleReset}
          className="flex flex-col gap-6 p-8 mt-8 bg-gray-800 shadow-xl rounded-lg w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-gray-100 text-center">
            Add a New Friend
          </h1>
          <FormInput
            type="text"
            name="friendName"
            placeholder="Enter friend's name"
            value={formData.friendName}
            onChange={handleOnChange}
            required
          />
          <FormInput
            type="text"
            name="mobileNumber"
            placeholder="Enter friend's phone number"
            value={formData.mobileNumber}
            onChange={handleOnChange}
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-600 hover:shadow-2xl transition-all duration-300"
          >
            Add Friend
          </button>
          <button
            type="reset"
            className="w-full px-4 py-3 rounded-lg bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 hover:shadow-2xl transition-all duration-300"
          >
            Reset
          </button>
        </form>
      </div>
      <div className="w-full mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default AddFriendComponent;
