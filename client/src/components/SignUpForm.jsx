import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
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
