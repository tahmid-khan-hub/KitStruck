import { Suspense } from "react";
import SignInFormSkeleton from "./components/SignInFormSkeleton";
import SignInPageClient from "./components/SignInPageClient";

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFormSkeleton />}>
      <SignInPageClient />
    </Suspense>
  )
}