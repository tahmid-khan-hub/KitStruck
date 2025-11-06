"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Lottie from "react-lottie-player";
import SignInLottie from "@/public/sign-up.json";

const SignUpPage = () => {
  return (
    <div className="max-w-[1350px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="min-h-screen flex w-full items-center justify-center p-8 mb-11"
      >
        <div className="card w-full max-w-md bg-base-200 shadow-xl p-8 space-y-6">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center pt-4">Welcome To Kitstruck</h2>
          <p className="text-center">Sign up now and gear up with your favorite jerseys, fast delivery and exclusive fan offers.</p>
          {/* Lottie */}
          <div>
            <Lottie
              play
              loop
              animationData={SignInLottie}
              className="w-[250px] max-w-md mx-auto"
            />
          </div>
          {/* Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Name"
              className="input input-bordered w-full mb-6"
              required
            />
            <input
              type="text"
              placeholder="Enter your PhotoURL"
              className="input input-bordered w-full mb-6"
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full mb-6"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />

            <button type="submit" className="btn w-full mt-5">
              Sign up
            </button>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Login */}
          <button type="button" className="btn btn-outline w-full">
            <svg
              aria-label="Google logo"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Sign up with Google
          </button>

          {/* link of sign up page */}
          <p className="mb-4 mt-1 ">
            Already have an account? Please Sign-in{" "}
            <Link className="text-blue-500" href={"/sign-in"}>
              here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
