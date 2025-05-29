import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Background from "../assets/ticket-Image.jpg";
import Logo from "../assets/POPFINAL.png";
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const initialState = {
    userName: '',
    email: '',
    mobileNumber: '',
};

function RegisterFormPage() {
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://popcornspotbackend-production.up.railway.app/user/register", formData);
            toast.success(response.data.Message);
            setFormData(initialState);
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.Message || "Registration failed. Please try again.");
        }
    };

    const handleReset = () => {
        setFormData(initialState);
    };

    return (
        <div className="w-full h-screen flex items-center justify-between bg-gray-50">
            <div className="w-[60%] sm:max-lg:w-[45%]  lg:max-xl:[50%] xl:max-2xl: h-full max-sm:hidden">
                <img src={Background} alt="Background" className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-[40%] h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-200 justify-center px-6">
                <form
                    className="w-[370px] sm:w-[400px] h-[500px] max-w-lg bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg rounded-xl p-8 space-y-6 flex flex-col items-center"
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                >
                    <img src={Logo} alt="Logo" className="w-28 h-auto mb-4" />

                    <div className="w-full relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 text-xl" />
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            placeholder="Enter your name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 text-xl" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="w-full relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 text-xl" />
                        <input
                            type="tel"
                            id="mobileNumber"
                            name="mobileNumber"
                            placeholder="Enter your mobile number"
                            pattern="[0-9]{10}"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-500"
                    >
                        Register
                    </button>

                    <p className="text-gray-200">
                        Already have an account?{' '}
                        <Link to="/login" className="text-orange-500 font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterFormPage;
