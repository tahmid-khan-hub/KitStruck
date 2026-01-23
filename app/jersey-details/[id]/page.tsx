import { Jersey } from "@/types/jersey";
import JerseyDetailsContainer from "./components/JerseyDetails/JerseyDetailsContainer";
import JerseyDetailsLottie from "./components/JerseyDetails/JerseyDetailsLottie";

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

export default async function JerseyDetailsPage({params}: { params: Promise<{ id: string }>; }) {
  const { id } = await params; 
  console.log(id);

  const jersey: Jersey | null = await getJersey(id);

  if (!jersey) return <JerseyDetailsLottie />

  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-3 p-8 py-12 min-h-screen">
      <JerseyDetailsContainer jersey={jersey}></JerseyDetailsContainer>
    </div>
  );
}
