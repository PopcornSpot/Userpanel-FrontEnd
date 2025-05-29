import { MdEmail } from "react-icons/md";
import LoginImage from "../assets/LoginImagebg.jpg"
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/POPFINAL.png"

const initialState = {
  email: "",
  password: "",
  picture: "",
  userName: "",
};


const Login = () => {
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
        .post("https://popcornspotbackend-production.up.railway.app/user/login", formData)
        .then((res) => {
          localStorage.clear();
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.Message);
          setFormData(initialState);
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setFormData(initialState);
  };



  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const user = jwtDecode(token);
    const data = { ...formData, userName: user.name, email: user.email, picture: user.picture };

    try {
      await axios
        .post("https://popcornspotbackend-production.up.railway.app/user/googlelogin", data)
        .then((res) => {
          localStorage.clear();
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.Message);
          setFormData(initialState);
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error);
    }
  };


  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };




  return (

    <div className={`w-full h-screen flex items-center justify-center bg-gray-50`}>
      <div className="w-[60%] sm:max-lg:w-[45%]  lg:max-xl:[50%] xl:max-2xl: h-full max-sm:hidden">
        <img
          className="w-full h-full object-cover"
          src={LoginImage} alt="LoginImage" />
      </div>
      <div className="w-[100%] sm:max-lg:w-[55%] lg:max-xl:[50%] h-screen flex flex-col items-center bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 justify-center gap-0">

        <form
          onSubmit={handleOnSubmit} onReset={handleReset}
          action=""
          className="w-[370px] h-[480px] sm:w-[400px] bg-gray-800 rounded-lg flex flex-col justify-center items-center gap-6">
          <img
            className="w-30 h-12"
            src={logo} alt="" />
          <div className="w-[90%]">
            <GoogleLogin
              text="continue_with"
              logo_alignment="left"
              size="large"
              theme="filled_black"
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          </div>
          <div className="w-[90%] border px-4 flex justify-center items-center bg-white rounded gap-3">
            <MdEmail className="text-red-500 text-xl" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleOnChange}
              className="w-full h-11 outline-none text-base "
              placeholder="Email"
              required
            />
          </div>


          <div className="w-[90%] px-4 border flex justify-center items-center bg-white rounded gap-3">
            <RiLockPasswordFill className="text-red-500 text-xl" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              className="w-full h-11 outline-none text-base "
              placeholder="Password"
              required
            />
          </div>

          <button
            className="w-[90%] h-12 text-lg font-semibold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500  rounded-lg  hover:bg-orange-500 ">
            Login
          </button>




          <div className="w-full flex flex-col items-center gap-5 text-sm text-gray-300 mt-2">
          <Link
            to={"/register"}
          >
            Don’t have an account? <span className="text-orange-400 hover:underline hover:text-orange-400 transition duration-300">Sign Up</span>
          </Link>
          <Link
            to={"/resetpassword"}
            className="hover:underline hover:text-orange-400 transition duration-300"
          >
            Forgot Password?
          </Link>
        </div>
        </form>
        <section>

          <div className="flex justify-center items-center bg-gray-100">
          </div>
        </section>
      </div>
    </div>

  )
}

export default Login;