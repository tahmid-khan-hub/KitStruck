const SignUpFormSkeleton = () => {
  return (
    <div>
      <div className="space-y-4 animate-pulse">
        {/* Name input */}
        <div className="h-12 w-full rounded-md bg-gray-200 mb-6" />

        {/* Photo URL input */}
        <div className="h-12 w-full rounded-md bg-gray-200 mb-6" />

        {/* Email input */}
        <div className="h-12 w-full rounded-md bg-gray-200 mb-6" />

        {/* Password input with icon */}
        <div className="relative">
          <div className="h-12 w-full rounded-md bg-gray-200" />
          <div className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-gray-300" />
        </div>

        {/* Password hint text */}
        <div className="space-y-2 mt-4 mb-6">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-4/5 rounded bg-gray-200" />
        </div>

        {/* Submit button */}
        <div className="h-12 w-full rounded-md bg-gray-300 mt-5" />
      </div>
    </div>
  );
};

export default SignUpFormSkeleton;
