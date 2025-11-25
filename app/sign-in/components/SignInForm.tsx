import { signInUsers } from "@/app/actions/auth/signInUsers";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const SignInForm = () => {
  const {successToast, errorToast} = UseSweetAlert();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signInUsers({ email, password });

    if (res.success) {
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (loginRes?.ok) {
        successToast("Sign in successful!");
        // redirect user
        window.location.href = "/";
      } else {
        errorToast("sign In failed.");
      }
      form.reset();
    } else {
      errorToast("Something went wrong. Please try again.");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            className="input input-bordered w-full pr-10"
            required
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="text-right">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
        <button type="submit" className="btn w-full">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
