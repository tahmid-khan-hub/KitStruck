const SignInForm = () => {
  return (
    <div>
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
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
