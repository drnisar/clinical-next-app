const HMIS_CLINICAL_HISTORY_URL =
  "http://182.188.28.220:3004/api/Surgery/Patient-Clinical-History";

// Proxies HMIS clinical history (physician notes + lab investigations) for an
// MRN. Response: { mrno, totalNotes, totalInvestigations, physicianNotes,
// investigations }.
export async function GET(req: Request) {
  const mrno = new URL(req.url).searchParams.get("mrno");
  if (!mrno) {
    return Response.json({ error: "mrno is required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${HMIS_CLINICAL_HISTORY_URL}?mrno=${encodeURIComponent(mrno)}`,
      { cache: "no-store" },
    );
    if (!res.ok) {
      return Response.json(
        { error: `HMIS responded with ${res.status}` },
        { status: 502 },
      );
    }
    return Response.json(await res.json());
  } catch (error) {
    console.error("HMIS clinical history fetch failed:", error);
    return Response.json({ error: "HMIS unavailable" }, { status: 502 });
  }
}
