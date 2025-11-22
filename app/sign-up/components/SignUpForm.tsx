import { signUpUsers } from "@/app/actions/auth/signUpUsers";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const photoURL = formData.get("photo") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signUpUsers({ name, email, password, photoURL });

    if (res.success) {
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (loginRes?.ok) {
        // const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        // // after login -> sending cart localstorage data to db 
        // if(localCart.length > 0){
        //   await fetch("/api/cart/sync",{
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ cartItems: localCart }),
        //   })
        // }

        // localStorage.removeItem("cart");
        alert("Registration successful!");
        // redirect user
        window.location.href = "/";
      } else {
        alert("Registered but login failed");
      }
      form.reset();
    } else {
      alert("User already exists or registration failed.");
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

        <button type="submit" className="btn w-full mt-5">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
