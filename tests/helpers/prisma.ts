import { vi } from "vitest";

// A fake Prisma client covering the models the API routes use.
// Each method is a vi.fn() so tests can set return values per case.
const model = () => ({
  findMany: vi.fn(),
  findUnique: vi.fn(),
  findFirst: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
});

export const prismaMock = {
  registration: model(),
  appointment: model(),
  consultation: model(),
  admission_Discharge: model(),
  admitted_Location: model(),
  user: model(),
  // Run the transaction callback against the same mock.
  $transaction: vi.fn(async (fn: (tx: unknown) => unknown) => fn(prismaMock)),
};
