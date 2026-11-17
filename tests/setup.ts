import { beforeEach, vi } from "vitest";

// Tests never talk to a real database or auth provider.
process.env.NEXTAUTH_SECRET ??= "test-secret";
process.env.DATABASE_URL ??= "mongodb://localhost:27017/test";

// revalidatePath/revalidateTag need a Next.js request context; stub them.
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

// Keep test output readable: routes log errors on purpose in failure paths.
beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "log").mockImplementation(() => {});
});
