export async function GET(req: Request) {
  const mrno = new URL(req.url).searchParams.get("mrno");

  const res = await fetch(
    `http://182.188.28.220:3004/api/Surgery/patient-physician-notes?mrno=${mrno}`,
  );

  const data = await res.json();
  return Response.json(data);
}
