import React, { useEffect, useState } from "react";
import NavBar from "./NavbarComponent";
import Footer from "./FooterComponent";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  mobileNumber: "",
  gender: "",
  image: null,
};

const fetchUserForUpdate = async (_id, setUser) => {
  try {
    const authToken = localStorage.getItem("token");
    await axios
      .get(`https://popcornspotbackend-production.up.railway.app/user/getdetails/?_id=${_id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        toast.error(res.data.Error);
        setUser(res.data.details);
      })
      .catch((err) => {
        toast.error(err.response.data.Message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

const EditProfile = () => {
  const authToken = localStorage.getItem("token");
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const { _id } = useParams();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
      ...(type === "file" && { fileOriginalName: files[0]?.name || "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });

    try {
      await axios
        .put(
          `https://popcornspotbackend-production.up.railway.app/user/updateuser/?_id=${_id}`,
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.Message);
          navigate("/profile");
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserForUpdate(_id, setFormData);
  }, [_id]);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-full fixed top-0 z-50 bg-white shadow-md">
        <NavBar />
      </div>

      <div className="p-6 mt-24 max-w-3xl mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-orange-400">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-xl font-medium text-gray-300 mb-3">
              Upload Profile Picture
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 transition duration-300"
            />
            {formData.fileOriginalName && (
              <p className="text-lg mt-4 text-white">{formData.fileOriginalName}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="userName"
              className="block text-xl font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="userName"
              required
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-500 p-4 rounded-lg bg-gray-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-xl font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-500 p-4 rounded-lg bg-gray-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="mobileNumber"
              className="block text-xl font-medium text-gray-300 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              required
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your number"
              className="w-full border border-gray-500 p-4 rounded-lg bg-gray-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="gender"
              className="block text-xl font-medium text-gray-300 mb-2"
            >
              Gender
            </label>
            <select
            required
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              className="w-full border border-gray-500 p-4 rounded-lg bg-gray-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            >
              <option value="" className="text-gray-300">
                Select Gender
              </option>
              <option value="Male" className="text-white">
                Male
              </option>
              <option value="Female" className="text-white">
                Female
              </option>
              <option value="Other" className="text-white">
                Other
              </option>
            </select>
          </div>

          <div className="text-center mt-10">
            <button
              type="submit"
              className="bg-orange-500 text-white px-10 py-4 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 text-xl font-bold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default EditProfile;
