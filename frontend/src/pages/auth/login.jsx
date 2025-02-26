import React from 'react'
import { Link } from "react-router-dom";
import CommonForm from '../../components/common/form'
import { useState } from 'react';
import {loginFormControls} from '../../config/index.js'

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  function onSubmit(event) {
    event.preventDefault();
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800"> Login</h1>
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
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin
