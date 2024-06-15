import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      action=""
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
          type="text"
          name="password"
          id="password"
          {...register("password", { required: true })}
          className="border border-gray-400 sm:text-sm rounded-lg block w-full p-2.5 mb-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">*Password is required</p>
        )}
      </div>
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
