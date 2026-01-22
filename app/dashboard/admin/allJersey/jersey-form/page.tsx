import { Suspense } from "react";
import JerseyFormSkeleton from "./components/JerseyFormSkeleton";
import JerseyFormClient from "./components/JerseyFormClient";

export const dynamic = "force-dynamic";

export default function JerseyFormPage() {
  return (
    <Suspense fallback={<JerseyFormSkeleton />}>
      <JerseyFormClient />
    </Suspense>
  );
}
