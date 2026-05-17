const SignInFormSkeleton = () => {
  return (
    <div className="max-w-337.5 mx-auto">
      <div className="min-h-screen flex w-full items-center justify-center p-8 mb-11">
        <div className="card w-full max-w-md bg-base-200 shadow-xl p-8 space-y-6 animate-pulse">

          {/* Title */}
          <div className="space-y-2 pt-4 flex flex-col items-center">
            <div className="h-7 w-56 rounded bg-gray-300" />
            <div className="h-7 w-32 rounded bg-gray-300" />
          </div>

          {/* Subtitle */}
          <div className="space-y-2 flex flex-col items-center">
            <div className="h-4 w-72 rounded bg-gray-200" />
            <div className="h-4 w-48 rounded bg-gray-200" />
          </div>

          {/* Lottie animation area */}
          <div className="w-62.5 h-45 mx-auto rounded-xl bg-gray-200" />

          {/* Email input */}
          <div className="h-12 w-full rounded-md bg-gray-200" />

          {/* Password input with eye icon */}
          <div className="relative">
            <div className="h-12 w-full rounded-md bg-gray-200" />
            <div className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-gray-300" />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <div className="h-4 w-28 rounded bg-gray-200" />
          </div>

          {/* Sign In button */}
          <div className="h-12 w-full rounded-md bg-blue-200" />

          {/* OR Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-300" />
            <div className="h-4 w-6 rounded bg-gray-200" />
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Continue with Google button */}
          <div className="h-12 w-full rounded-lg bg-gray-200 border border-gray-300" />

          {/* Sign up link */}
          <div className="h-4 w-56 rounded bg-gray-200" />

        </div>
      </div>
    </div>
  );
};

export default SignInFormSkeleton;
