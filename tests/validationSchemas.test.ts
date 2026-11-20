import { describe, it, expect } from "vitest";
import {
  registrationSchema,
  appointmentSchema,
  consultationSchema,
} from "@/app/validationSchemas";

const validPatient = {
  first_name: "Ali",
  last_name: "Khan",
  gender: "Male",
  mr_number: "MR001",
  code: "+92",
};

describe("registrationSchema", () => {
  it("accepts a minimal valid patient", () => {
    const r = registrationSchema.safeParse(validPatient);
    expect(r.success).toBe(true);
  });

  it.each(["first_name", "last_name", "gender", "mr_number", "code"])(
    "rejects a missing %s",
    (field) => {
      const { [field]: _omit, ...rest } = validPatient as Record<string, string>;
      expect(registrationSchema.safeParse(rest).success).toBe(false);
    }
  );

  it("rejects names longer than 20 characters", () => {
    const r = registrationSchema.safeParse({
      ...validPatient,
      first_name: "A".repeat(21),
    });
    expect(r.success).toBe(false);
  });

  it("converts a valid date_of_birth to a Date", () => {
    const r = registrationSchema.parse({ ...validPatient, date_of_birth: "1979-09-30" });
    expect(r.date_of_birth).toBeInstanceOf(Date);
    expect((r.date_of_birth as Date).toISOString().slice(0, 10)).toBe("1979-09-30");
  });

  it("turns an invalid or empty date_of_birth into null", () => {
    expect(registrationSchema.parse({ ...validPatient, date_of_birth: "not-a-date" }).date_of_birth).toBeNull();
    expect(registrationSchema.parse({ ...validPatient, date_of_birth: "" }).date_of_birth).toBeNull();
  });
});

describe("appointmentSchema", () => {
  const valid = {
    date_appointment: "2026-12-01",
    plan: "Review after surgery",
    registration_id: "abc123",
    type: "Follow-up",
  };

  it("accepts a valid appointment", () => {
    expect(appointmentSchema.safeParse(valid).success).toBe(true);
  });

  it.each(["date_appointment", "plan", "registration_id", "type"])(
    "rejects a missing %s",
    (field) => {
      const { [field]: _omit, ...rest } = valid as Record<string, string>;
      expect(appointmentSchema.safeParse(rest).success).toBe(false);
    }
  );

  it("rejects a plan longer than 255 characters", () => {
    expect(appointmentSchema.safeParse({ ...valid, plan: "x".repeat(256) }).success).toBe(false);
  });

  it("rejects a date that doesn't parse", () => {
    expect(appointmentSchema.safeParse({ ...valid, date_appointment: "abc" }).success).toBe(false);
  });
});

describe("consultationSchema", () => {
  it("accepts an empty object (all fields optional)", () => {
    expect(consultationSchema.safeParse({}).success).toBe(true);
  });

  it("rejects an empty visit_date string", () => {
    expect(consultationSchema.safeParse({ visit_date: "" }).success).toBe(false);
  });
});
