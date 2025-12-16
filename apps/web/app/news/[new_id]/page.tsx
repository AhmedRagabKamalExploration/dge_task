export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ new_id: string }>;
}) {
  const { new_id } = await params;
  return <div>NewsDetailPage {new_id}</div>;
}
