import { Suspense } from "react";
import PaymentSkeleton from "../SkeletonLoading/PaymentSkeleton";
import PaymentPageClient from "./PaymentPageClient";

export default function PaymentPage() {
    return(
        <Suspense fallback={<PaymentSkeleton />}>
            <PaymentPageClient />
        </Suspense>
    )
}