const SignInFormSkeleton = () => {
  return (
    <div>
      <div className="space-y-4 animate-pulse">
        {/* Email input */}
        <div className="h-12 w-full rounded-md bg-gray-200" />

        {/* Password input with icon space */}
        <div className="relative">
          <div className="h-12 w-full rounded-md bg-gray-200" />
          <div className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-gray-300" />
        </div>

        {/* Forgot password */}
        <div className="flex justify-end">
          <div className="h-4 w-28 rounded bg-gray-200" />
        </div>

        {/* Submit button */}
        <div className="h-12 w-full rounded-md bg-gray-300" />
      </div>
    </div>
  );
};

export default SignInFormSkeleton;
