import { Jersey } from "@/types/jersey";
import JerseyDetailsContainer from "./components/JerseyDetails/JerseyDetailsContainer";
import Lottie from "react-lottie-player";
import noMyOrders from "@/public/No Item Found.json"

async function getJersey(id: string): Promise<Jersey | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jersey-details/${id}`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) return null;

    return data.data as Jersey;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

export default async function JerseyDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params; 

  const jersey: Jersey | null = await getJersey(id);

  if (!jersey) {
    return <div className="flex flex-col items-center justify-center py-10">
      <Lottie
        animationData={noMyOrders}
        loop={true}
        className="w-64 h-64"
      />
      <p className="text-gray-500 text-lg mt-4">Jersey not found</p>
    </div>;
  }

  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-3 p-8 py-12 min-h-screen">
      <JerseyDetailsContainer jersey={jersey}></JerseyDetailsContainer>
    </div>
  );
}
