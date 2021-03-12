export async function createRequest(...args: Parameters<typeof fetch>) {
  const response = await fetch(...args);
  if (!response.ok) throw new Error('Failed to fetch');
  return response;
}
