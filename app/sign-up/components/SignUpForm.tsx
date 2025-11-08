const SignUpForm = () => {
  return (
    <div>
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
    </div>
  );
};

export default SignUpForm;
