
export default async function JerseyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/jersey-details/${id}`);
  const data = await res.json();
  console.log(data);

  return (
    <div className="p-10">
      <h2>{id}</h2>
    </div>
  );
}
