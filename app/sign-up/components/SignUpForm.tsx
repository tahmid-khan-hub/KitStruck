import { signUpUsers } from "@/app/actions/auth/signUpUsers";
import { FormEvent } from "react";

const SignUpForm = () => {
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const photoURL = formData.get("photo") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const res = await signUpUsers({ name, email, password, photoURL });

        if(res){
            alert("Registration successful!");
            form.reset();
        }else{
            alert("User already exists or registration failed.");
        }
    }
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
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="input input-bordered w-full mb-6"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn w-full mt-5">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
