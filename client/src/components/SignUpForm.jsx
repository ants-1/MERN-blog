import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Sign Up successful", result);
        login(result.token);
        navigate("/");
      } else {
        console.log("Error Signing Up", result);
        setSignUpError(result.message || "Sign up Failed");
      }
    } catch (error) {
      console.log("An error occurred", error);
      setSignUpError("*Sign up Failed. Please try again.");
    }
  };

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      action="http://localhost:3000/api/sign-up"
    >
      <div>
        <label htmlFor="username" className="block mb-2 font-medium">
          Username:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          {...register("username", { required: true })}
          className="border border-gray-400 sm:text-sm rounded-lg block w-full p-2.5 mb-2"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-2">*Username is required</p>
        )}

        <label htmlFor="email" className="block mb-2 font-medium">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          className="border border-gray-400 sm:text-sm rounded-lg block w-full p-2.5 mb-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">
            *Email is required and must be valid
          </p>
        )}

        <label htmlFor="password" className="block mb-2 font-medium">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
          className="border border-gray-400 sm:text-sm rounded-lg block w-full p-2.5 mb-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">*Password is required</p>
        )}

        <label htmlFor="confirmPassword" className="block mb-2 font-medium">
          Confirm Password:
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="border border-gray-400 sm:text-sm rounded-lg block w-full p-2.5 mb-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">
            *
            {errors.confirmPassword.message
              ? errors.confirmPassword.message
              : "Confirm Password is required"}
          </p>
        )}
      </div>
      {signUpError && <p className="text-red-500 text-sm">{signUpError}</p>}
      <button
        type="submit"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Sign Up
      </button>
      <p className="text-sm font-light">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}

export default SignUpForm;
