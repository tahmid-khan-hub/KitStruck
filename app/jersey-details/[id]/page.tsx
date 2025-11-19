import { Jersey } from "@/types/jersey";

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
    return <div className="p-6 text-red-500">Jersey not found.</div>;
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">{jersey.name}</h1>
    </div>
  );
}
