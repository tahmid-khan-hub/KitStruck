import { Suspense } from "react";
import SignUpFormSkeleton from "./components/SignUpFormSkeleton";
import SignUpPageClient from "./components/SignUpPageClient";

export default function SignUpPage() {
  return (
    <Suspense fallback={<SignUpFormSkeleton />}>
      <SignUpPageClient />
    </Suspense>
  )
}