import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Login successful", result);
        login(result.token);
        navigate("/"); 
      } else {
        console.error("Login failed", result);
        setLoginError(result.message || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
      setLoginError("*Login Failed. Please try again.");
    }
  };

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
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
          <p className="text-red-500 text-sm">*Password is required</p>
        )}
      </div>
      {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
      <button
        type="submit"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Login
      </button>
      <p className="text-sm font-light">
        Don{"'"}t have an account yet?{" "}
        <Link
          to="/sign-up"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
