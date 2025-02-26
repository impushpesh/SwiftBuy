import React from 'react'
import { Link } from "react-router-dom";
import CommonForm from '../../components/common/form'
import { useState } from 'react';
import { registerFormControls } from "@/config"

const initialState = {
  userName: "ram",
  email: "fdsfsdf",
  password: "2345",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  function onSubmit(event) {
    event.preventDefault();
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground"> Create Account</h1>
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
    </div>
  )
}

export default AuthRegister
