import JerseyDetailsPage from "@/app/components/JerseyDetailsPage/JerseyDetailsPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <JerseyDetailsPage id={id} />;
}
