const SignUpFormSkeleton = () => {
  return (
    <div className="max-w-337.5 mx-auto">
      <div className="min-h-screen flex w-full items-center justify-center p-8 mb-11">
        <div className="card w-full max-w-md bg-base-200 shadow-xl p-8 space-y-6 animate-pulse">

          {/* Title */}
          <div className="flex justify-center pt-4">
            <div className="h-8 w-64 rounded bg-gray-300" />
          </div>

          {/* Subtitle */}
          <div className="space-y-2 flex flex-col items-center">
            <div className="h-4 w-72 rounded bg-gray-200" />
            <div className="h-4 w-56 rounded bg-gray-200" />
          </div>

          {/* Lottie animation area */}
          <div className="w-62.5 h-45 mx-auto rounded-xl bg-gray-200" />

          {/* Name input */}
          <div className="h-12 w-full rounded-md bg-gray-200" />

          {/* Photo URL input */}
          <div className="space-y-1">
            <div className="h-12 w-full rounded-md bg-gray-200" />
            {/* (Photo is optional) hint */}
            <div className="h-3 w-28 rounded bg-gray-200" />
          </div>

          {/* Email input */}
          <div className="h-12 w-full rounded-md bg-gray-200" />

          {/* Password input with eye icon */}
          <div className="space-y-1">
            <div className="relative">
              <div className="h-12 w-full rounded-md bg-gray-200" />
              <div className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-gray-300" />
            </div>
            {/* Password hint text */}
            <div className="space-y-1 pt-1">
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-4/5 rounded bg-gray-200" />
              <div className="h-3 w-3/5 rounded bg-gray-200" />
            </div>
          </div>

          {/* Sign Up button */}
          <div className="h-12 w-full rounded-md bg-blue-200" />

          {/* OR Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-300" />
            <div className="h-4 w-6 rounded bg-gray-200" />
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Sign up with Google button */}
          <div className="h-12 w-full rounded-lg bg-gray-200 border border-gray-300" />

          {/* Sign in link */}
          <div className="h-4 w-64 rounded bg-gray-200" />

        </div>
      </div>
    </div>
  );
};

export default SignUpFormSkeleton;
