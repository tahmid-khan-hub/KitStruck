"use client"
import Link from "next/link";
const LoginPage = () => {
  return (
    <div className="max-w-[1350px] mx-auto">
      <div className="flex w-full items-center justify-center p-8 mt-12"><div className="card w-full max-w-md bg-base-200 shadow-xl p-8 space-y-6">
        {/* Title */}
        <h2 className="text-3xl mb-11 font-bold text-center">Welcome Back!</h2>
        {/* Form */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            required
          />

          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn w-full">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Login */}
        <button
          type="button"
          className="btn btn-outline w-full"
        >
          <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
          Continue with Google
        </button>

        {/* link of sign up page */}
        <p className="mb-4 mt-1 font-semibold">New to this site? Please Sign-up <Link className="text-blue-500" href={'/sign-up'}>here</Link></p>
      </div></div>
    </div>
  );
};

export default LoginPage;
