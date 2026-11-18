import { describe, it, expect, vi, afterEach } from "vitest";
import { GET } from "@/app/api/notes/route";

const history = {
  mrno: "123456789",
  totalNotes: 1,
  totalInvestigations: 1,
  physicianNotes: [{ noteId: "n1", clinicDesc: "IBP NISAR AHMAD", notes: "x" }],
  investigations: [{ investigationName: "CBC", results: [] }],
};

const call = (qs: string) =>
  GET(new Request(`http://localhost:3000/api/notes${qs}`));

describe("GET /api/notes (HMIS clinical history proxy)", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("fetches Patient-Clinical-History for the MRN and returns it as-is", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json(history));
    vi.stubGlobal("fetch", fetchMock);

    const res = await call("?mrno=123456789");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(history);
    expect(fetchMock.mock.calls[0][0]).toBe(
      "http://182.188.28.220:3004/api/Surgery/Patient-Clinical-History?mrno=123456789",
    );
  });

  it("URL-encodes the MRN so it cannot inject extra query parameters", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json(history));
    vi.stubGlobal("fetch", fetchMock);

    await call(`?mrno=${encodeURIComponent("1&x=2")}`);
    expect(fetchMock.mock.calls[0][0]).toMatch(/\?mrno=1%26x%3D2$/);
  });

  it("returns 400 without calling HMIS when mrno is missing", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const res = await call("");
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 502 when HMIS responds with an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("boom", { status: 500 })),
    );
    expect((await call("?mrno=1")).status).toBe(502);
  });

  it("returns 502 when HMIS is unreachable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("ECONNREFUSED")),
    );
    expect((await call("?mrno=1")).status).toBe(502);
  });
});
