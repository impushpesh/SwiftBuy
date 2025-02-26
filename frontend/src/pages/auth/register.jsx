import React from 'react'
import { Link } from "react-router-dom";
import CommonForm from '../../components/common/form'
import { useState } from 'react';
import {registerFormControls} from '../../config/index.js'

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  function onSubmit(event) {
    event.preventDefault();
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800"> Create Account</h1>
        <p className="mt-2"> 
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister
