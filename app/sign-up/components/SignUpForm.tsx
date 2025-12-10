import { signUpUsers } from "@/app/actions/auth/signUpUsers";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type SignUpFormProps = {
  callbackUrl: string;
};

const SignUpForm = ({ callbackUrl }: SignUpFormProps) => {
  const {successToast, errorToast} = UseSweetAlert();
  const [showPassword, setShowPassword] = useState(false);

  // password pattern
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const photoURL = formData.get("photo") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!passwordPattern.test(password)) {
      errorToast(
        "Password must be at least 8 characters and include: 1 uppercase letter, 1 lowercase letter and 1 special character."
      );
      return;
    }

    const res = await signUpUsers({ name, email, password, photoURL });

    if (res.success) {
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl
      });

      if (loginRes?.ok) {
        successToast("Registration successful!");
        // redirect user
        window.location.href = loginRes.url || callbackUrl;
      } else {
        errorToast("Registered but login failed");
      }
      form.reset();
    } else {
      errorToast("User already exists or registration failed.");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Enter your Name"
          className="input input-bordered w-full mb-6"
          required
        />
        <input
          type="text"
          name="photo"
          placeholder="Enter your PhotoURL"
          className="input input-bordered w-full mb-6"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="input input-bordered w-full mb-6"
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

        <button type="submit" className="btns w-full mt-5">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
