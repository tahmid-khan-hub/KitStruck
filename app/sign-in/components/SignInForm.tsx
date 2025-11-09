import { signInUsers } from "@/app/actions/auth/signInUsers";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";

const SignInForm = () => {
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
        alert("Sign in successful!");
        // redirect user
        window.location.href = "/";
      } else {
        alert("sign in failed");
      }
      form.reset();
    } else {
      alert("Something went wrong. Sign in is not successful");
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
        <input
          type="password"
          name="password"
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
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
