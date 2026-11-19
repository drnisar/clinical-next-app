import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock } from "../helpers/prisma";
import { jsonRequest, params } from "../helpers/request";

vi.mock("@/lib/prisma", async () => ({
  prisma: (await import("../helpers/prisma")).prismaMock,
}));

import { PATCH } from "@/app/api/consultation/[id]/route";

const note = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Diagnosis" }],
    },
    { type: "paragraph", content: [{ type: "text", text: "Inguinal hernia" }] },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Instructions" }],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "No lifting" }],
            },
          ],
        },
      ],
    },
  ],
};

const patch = (body: unknown) =>
  PATCH(
    jsonRequest("/api/consultation/c1", "PATCH", body),
    params({ id: "c1" }),
  );
const updateData = () =>
  (
    prismaMock.consultation.update.mock.calls[0][0] as {
      data: Record<string, unknown>;
    }
  ).data;

describe("PATCH /api/consultation/[id] with a Clinical Note", () => {
  beforeEach(() => {
    prismaMock.consultation.findUnique.mockResolvedValue({
      consultation_id: "c1",
    });
    prismaMock.consultation.update.mockImplementation(async ({ data }) => ({
      consultation_id: "c1",
      ...data,
    }));
  });

  it("stores the note and overwrites the old fields from it", async () => {
    const res = await patch({ clinical_note: note, history: "stale, ignored" });
    expect(res.status).toBe(200);
    expect(updateData()).toMatchObject({
      clinical_note: note,
      history: null,
      examination: [],
      investigations: [],
      diagnosis: "Inguinal hernia",
      plan: null,
      instructions: [{ instruction: "No lifting" }],
    });
  });

  it("rejects a clinical_note that is not a TipTap document", async () => {
    const res = await patch({ clinical_note: "<p>hi</p>" });
    expect(res.status).toBe(400);
    expect(prismaMock.consultation.update).not.toHaveBeenCalled();
  });

  it("without a note, saves the old fields as before (and leaves the note alone)", async () => {
    await patch({ diagnosis: "Lipoma", status: "COMPLETED" });
    const data = updateData();
    expect(data).toMatchObject({ diagnosis: "Lipoma", status: "COMPLETED" });
    expect(data).not.toHaveProperty("clinical_note");
  });
});
