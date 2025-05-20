"use client";

import { useEffect, useState } from "react";

export const FormattedDateCell = ({
  date,
}: {
  date: Date | null | undefined;
}) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  useEffect(() => {
    if (date) {
      // Using toDateString as in your original code
      setFormattedDate(new Date(date).toLocaleDateString());
    } else {
      setFormattedDate(null);
    }
  }, [date]);
  return formattedDate;
};

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const appointmentTypeOptions = [
  { label: "Regular", value: "regular" },
  { label: "Sehat Card", value: "sehat_card" },
  { label: "IBP", value: "ibp" },
];
export const appointmentStatusOptions = [
  { label: "Waiting", value: "waiting" },
  { label: "Completed", value: "completed" },
  { label: "No Show", value: "no_show" },
  { label: "Postponed", value: "postponed" },
];

export const drugForms = [
  { label: "Tablet", value: "tablet" },
  { label: "Capsule", value: "capsule" },
  { label: "TSF", value: "tsf" },
  { label: "Drops", value: "drops" },
  { label: "Injection", value: "injection" },
  { label: "Suppository", value: "suppository" },
  { label: "Puff", value: "puff" },
];

export const drugsFrequency = [
  { label: "OD", value: "od" },
  { label: "BD", value: "bd" },
  { label: "TDS", value: "tds" },
  { label: "QID", value: "qid" },
  { label: "HS", value: "hs" },
  { label: "PRN", value: "prn" },
  { label: "SOS", value: "sos" },
  { label: "STAT", value: "stat" },
  { label: "ONCE", value: "once" },
  { label: "WEEKLY", value: "weekly" },
  { label: "MONTHLY", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

export const drugRoutes = [
  { label: "Oral", value: "oral" },
  { label: "Intravenous", value: "intravenous" },
  { label: "Intramuscular", value: "intramuscular" },
  { label: "Subcutaneous", value: "subcutaneous" },
  { label: "Topical", value: "topical" },
  { label: "Ophthalmic", value: "ophthalmic" },
  { label: "Otic", value: "otic" },
  { label: "Nasal", value: "nasal" },
  { label: "Rectal", value: "rectal" },
  { label: "Vaginal", value: "vaginal" },
  { label: "Inhalation", value: "inhalation" },
  { label: "Sublingual", value: "sublingual" },
  { label: "Buccal", value: "buccal" },
];

export const intervals = [
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
  { label: "Months", value: "months" },
  { label: "Doses", value: "doses" },
  { label: "Continued", value: "continued" },
];

const translations = [
  {
    en: "od",
    ur: "صبح",
  },
  {
    en: "bd",
    ur: "صبح  شام",
  },
  {
    en: "tds",
    ur: "صبح دوپہر شام",
  },
  {
    en: "qid",
    ur: "دن میں چار مرتبہ",
  },
  {
    en: "hs",
    ur: "رات کو",
  },
  {
    en: "sos",
    ur: "ضرورت کے مطابق",
  },
  {
    en: "prn",
    ur: "ضرورت پڑنے پر",
  },
  {
    en: "stat",
    ur: "فوراً",
  },
  {
    en: "Once",
    ur: "ایک مرتبہ",
  },
  {
    en: "weekly",
    ur: "ہفتہ وار",
  },
  {
    en: "Monthly",
    ur: "ماہانہ",
  },
  {
    en: "days",
    ur: "دن",
  },
  {
    en: "weeks",
    ur: "ہفتے",
  },
  {
    en: "months",
    ur: "مہینے",
  },
  {
    en: "doses",
    ur: "ڈوز",
  },
  {
    en: "continued",
    ur: "جاری",
  },
  {
    en: "oral",
    ur: "خوراک",
  },
  {
    en: "intravenous",
    ur: "وریدی",
  },
  {
    en: "intramuscular",
    ur: "گوشت میں",
  },
  {
    en: "subcutaneous",
    ur: "تحت جلدی",
  },
  {
    en: "topical",
    ur: "جلدی",
  },
  {
    en: "ophthalmic",
    ur: " آنکھ میں ڈالیں",
  },
  {
    en: "otic",
    ur: "کان",
  },
  {
    en: "nasal",
    ur: "ناک",
  },
  {
    en: "rectal",
    ur: "ریکٹل",
  },
  {
    en: "vaginal",
    ur: "فرجی",
  },
  {
    en: "inhalation",
    ur: "سانس",
  },
  {
    en: "sublingual",
    ur: "زبان کے نیچے",
  },
  {
    en: "buccal",
    ur: "منہ کے اندر",
  },
  {
    en: "tablet",
    ur: "گولی",
  },
  {
    en: "capsule",
    ur: "کیپسول",
  },
  {
    en: "tsf",
    ur: "چمچہ",
  },
  {
    en: "drops",
    ur: "قطرے",
  },
  {
    en: "injection",
    ur: "انجیکشن",
  },
  {
    en: "suppository",
    ur: "سپوزیٹری",
  },
  {
    en: "puff",
    ur: "پف",
  },
];

export const translate = (value: string | null): string => {
  if (!value) return "";
  const found = translations.find((t) => t.en === value.toLowerCase());
  return found ? found.ur : value;
};

export const drugsFormForMedsEntry = [
  { label: "Tablet", value: "tablet" },
  { label: "Capsule", value: "capsule" },
  { label: "Syrup", value: "syrup" },
  { label: "Suspension", value: "suspension" },
  { label: "Injection", value: "injection" },
  { label: "Suppository", value: "suppository" },
  { label: "Drops", value: "drops" },
  { label: "Cream", value: "cream" },
  { label: "Ointment", value: "ointment" },
  { label: "Gel", value: "gel" },
  { label: "Lotion", value: "lotion" },
  { label: "Mouthwash", value: "mouthwash" },
  { label: "Ear Drops", value: "ear_drops" },
  { label: "Eye Drops", value: "eye_drops" },
  { label: "Nasal Drops", value: "nasal_drops" },
  { label: "Nebulizer", value: "nebulizer" },
  { label: "Pessary", value: "pessary" },
  { label: "Puff", value: "puff" },
  { label: "Sachet", value: "sachet" },
  { label: "Shampoo", value: "shampoo" },
  { label: "Soap", value: "soap" },
  { label: "Spray", value: "spray" },
];

export const drugUnitsForMedEntry = [
  { label: "mg", value: "mg" },
  { label: "ml", value: "ml" },
  { label: "g", value: "g" },
  { label: "mcg", value: "mcg" },
];
export const mr_type = [
  { label: "K03", value: "K03" },
  { label: "ACE", value: "ACE" },
];

export const mr_intermediate = [
  { label: "0000", value: "0000" },
  { label: "6000", value: "6000" },
  { label: "7000", value: "7000" },
];

export const refineMRN = (MRN: string): string => {
  // Remove leading/trailing whitespace and convert to uppercase for consistent matching
  MRN = MRN.trim().toUpperCase();

  // Pattern 0: Check for ACE followed by 8 digits (e.g., ACE02558146)
  // Make "ACE" mandatory at the start
  const pattern0 = /^ACE\d{8}$/;
  if (pattern0.test(MRN)) {
    return MRN; // Return the original MRN if it matches this specific format
  }

  // Pattern 1: Check for N-NNNN format (e.g., 1-2345)
  const pattern1 = /^[1-9]-\d{4}$/;
  if (pattern1.test(MRN)) {
    const parts = MRN.split("-");
    const first = parts[0];
    const last = parts[1].padStart(4, "0"); // Ensure last part is 4 digits
    return "K03-" + first + "000000" + last;
  }

  // Pattern 2: Check for NNNNNNN format (e.g., 1234567) - Assuming 7 digits
  const pattern2 = /^[1-9]\d{6}$/;
  if (pattern2.test(MRN)) {
    // Pad with leading zeros if necessary to ensure 7 digits before prefixing
    const paddedMRN = MRN.padStart(7, "0");
    return "K03-0000" + paddedMRN;
  }

  // Pattern 3: Check for N-NNN format (e.g., 1-234)
  const pattern3 = /^[1-9]-\d{3}$/;
  if (pattern3.test(MRN)) {
    const parts = MRN.split("-");
    const first = parts[0];
    const last = parts[1].padStart(3, "0"); // Ensure last part is 3 digits
    return "K03-" + first + "0000000" + last;
  }

  // Pattern 4: Check for NNN-NNNN format (e.g., 123-4567)
  const pattern4 = /^\d{3}-\d{4}$/;
  if (pattern4.test(MRN)) {
    const parts = MRN.split("-");
    const first = parts[0].padStart(3, "0"); // Ensure first part is 3 digits
    const last = parts[1].padStart(4, "0"); // Ensure last part is 4 digits
    return "K03-" + first + "0000" + last;
  }

  // Pattern 5: Check for NNN-NNN format (e.g., 123-456)
  const pattern5 = /^\d{3}-\d{3}$/;
  if (pattern5.test(MRN)) {
    const parts = MRN.split("-");
    const first = parts[0].padStart(3, "0"); // Ensure first part is 3 digits
    const last = parts[1].padStart(3, "0"); // Ensure last part is 3 digits
    return "K03-" + first + "00000" + last;
  }

  // New Pattern: Check for K03- followed by 11 digits (e.g., K03-12345678901)
  const patternK03 = /^K03-\d{11}$/;
  if (patternK03.test(MRN)) {
    return MRN; // Return the original MRN if it matches this format
  }

  // If none of the known patterns match, throw an error
  throw new Error(`Invalid or unhandled MRN format: ${MRN}`);
};
// ... rest of the file ...

export const refinePhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  let cleaned = phoneNumber.replace(/\D/g, "");

  // Remove preceding zeros
  cleaned = cleaned.replace(/^0+/, "");

  // Check if the cleaned number is valid
  if (cleaned.length < 10 || cleaned.length > 11) {
    throw new Error("Invalid phone number format");
  }

  return cleaned;
};
