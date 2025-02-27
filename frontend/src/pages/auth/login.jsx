import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { useState } from "react";
import { loginFormControls } from "../../config/index.js";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice/index.js";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        if (user?.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user?.role === "user") {
          navigate("/shop/home");
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "user") {
        navigate("/shop/home");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Login
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
