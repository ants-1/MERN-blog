import SignUpForm from "../components/SignUpForm";

function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div className="w-full rounded-lg border border-gray-400 shadow md:mt-0 sm:max-w-md">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold md:text-2xl">Sign Up</h1>
          <p className="">Become a new member!</p>
            <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
