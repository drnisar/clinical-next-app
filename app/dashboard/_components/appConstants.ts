"use client";

import { useEffect, useState } from "react";
import { StylesConfig, GroupBase, CSSObjectWithLabel } from "react-select";

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
  { label: "REGULAR", value: "REGULAR" },
  { label: "SEHAT CARD", value: "SEHAT CARD" },
  { label: "IBP", value: "IBP" },
  { label: "OPD", value: "OPD" },
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

export const admissionModes = [
  { label: "Emergency", value: "EMERGENCY" },
  { label: "Elective", value: "ELECTIVE" },
  { label: "Sehat Card", value: "SEHAT_CARD" },
  { label: "IBP", value: "IBP" },
];

export const dischargeStatuses = [{ label: "DISCHARGED", value: "DISCHARGED" }];

export const dischargeModes = [
  { label: "NORMAL", value: "NORMAL" },
  { label: "LAMA", value: "LAMA" },
  { label: "DEATH", value: "DEATH" },
  { label: "TRANSFER", value: "TRANSFER" },
  { label: "OTHER", value: "OTHER" },
];

// Helper function to calculate date of birth from age
export const calculateDateOfBirth = (age: string): string => {
  if (!age || isNaN(Number(age))) return "";

  const ageNumber = Number(age);
  if (ageNumber < 0 || ageNumber > 150) return ""; // Reasonable age bounds

  const today = new Date();
  const birthYear = today.getFullYear() - ageNumber;

  // Format as YYYY-MM-DD directly to avoid timezone issues
  return `${birthYear}-01-01`;
};

// Helper function to calculate age from date of birth
export const calculateAge = (dateOfBirth: string): string => {
  if (!dateOfBirth) return "";
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 0 ? age.toString() : "";
};

export const investigationsArray = [
  { label: "CBC", value: "CBC" },
  { label: "LFTs", value: "LFTs" },
  { label: "RFTs", value: "RFTs" },
  { label: "Lipid Profile", value: "Lipid Profile" },
  { label: "TFTs", value: "TFTs" },
  { label: "Blood Sugar", value: "Blood Sugar" },
  { label: "Urine Routine", value: "Urine Routine" },
  { label: "Stool Routine", value: "Stool Routine" },
  { label: "X-Ray", value: "X-Ray" },
  { label: "Ultrasound", value: "Ultrasound" },
  { label: "CT Scan", value: "CT Scan" },
  { label: "MRI", value: "MRI" },
  { label: "ECG", value: "ECG" },
  { label: "Echocardiogram", value: "Echocardiogram" },
  { label: "Endoscopy", value: "Endoscopy" },
  { label: "Colonoscopy", value: "Colonoscopy" },
];

export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Use a consistent format that works on both server and client
  return dateObj.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const examinationTypes = [
  { label: "Vital Signs", value: "vital_signs" },
  { label: "General Examination", value: "general_examination" },
  { label: "Abdomen", value: "abdomen" },
  { label: "Cardiovascular", value: "cardiovascular" },
  { label: "Respiratory", value: "respiratory" },
  { label: "Neurological", value: "neurological" },
  { label: "Musculoskeletal", value: "musculoskeletal" },
  { label: "Skin", value: "skin" },
  { label: "ENT", value: "ent" },
  { label: "Eyes", value: "eyes" },
  { label: "Rectal", value: "rectal" },
  { label: "Gynaecological", value: "gynaecological" },
  { label: "Other", value: "other" },
];

// Custom styles for React Select to match Radix UI size="1" and dark mode
export const react_select_styles: StylesConfig<
  { label: string; value: string },
  boolean,
  GroupBase<{ label: string; value: string }>
> = {
  control: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    minHeight: "28px", // Radix UI size="1" height
    height: "28px",
    fontSize: "12px", // Smaller font size to match size="1"
    border: "1px solid",
    borderColor: state.isFocused
      ? "rgb(59 130 246)" // blue-500 for focus
      : "rgb(209 213 219)", // gray-300 for normal
    borderRadius: "6px",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.1)" : "none",
    backgroundColor: "rgb(255 255 255)", // white in light mode
    "&:hover": {
      borderColor: "rgb(156 163 175)", // gray-400 on hover
    },
    // Dark mode styles
    "@media (prefers-color-scheme: dark)": {
      backgroundColor: "rgb(31 41 55)", // gray-800
      borderColor: state.isFocused
        ? "rgb(59 130 246)" // blue-500
        : "rgb(75 85 99)", // gray-600
      "&:hover": {
        borderColor: "rgb(107 114 128)", // gray-500
      },
    },
  }),
  valueContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: "26px",
    padding: "0 6px",
    fontSize: "12px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
    padding: "0px",
    fontSize: "12px",
    color: "rgb(17 24 39)", // gray-900
    "@media (prefers-color-scheme: dark)": {
      color: "rgb(243 244 246)", // gray-100
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: "26px",
  }),
  dropdownIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: "0 4px",
    color: "rgb(107 114 128)", // gray-500
    "&:hover": {
      color: "rgb(75 85 99)", // gray-600
    },
    "@media (prefers-color-scheme: dark)": {
      color: "rgb(156 163 175)", // gray-400
      "&:hover": {
        color: "rgb(209 213 219)", // gray-300
      },
    },
  }),
  clearIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: "0 4px",
    color: "rgb(107 114 128)", // gray-500
    "&:hover": {
      color: "rgb(75 85 99)", // gray-600
    },
    "@media (prefers-color-scheme: dark)": {
      color: "rgb(156 163 175)", // gray-400
      "&:hover": {
        color: "rgb(209 213 219)", // gray-300
      },
    },
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontSize: "12px",
    color: "rgb(17 24 39)", // gray-900
    "@media (prefers-color-scheme: dark)": {
      color: "rgb(243 244 246)", // gray-100
    },
  }),
  placeholder: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontSize: "12px",
    color: "rgb(156 163 175)", // gray-400
    "@media (prefers-color-scheme: dark)": {
      color: "rgb(107 114 128)", // gray-500
    },
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontSize: "12px",
    backgroundColor: "rgb(255 255 255)", // white
    border: "1px solid rgb(209 213 219)", // gray-300
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "@media (prefers-color-scheme: dark)": {
      backgroundColor: "rgb(31 41 55)", // gray-800
      border: "1px solid rgb(75 85 99)", // gray-600
    },
  }),
  menuList: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: "4px",
    maxHeight: "160px", // Limit height for better UX
  }),
  option: (
    provided: CSSObjectWithLabel,
    state: import("react-select").OptionProps<
      { label: string; value: string },
      boolean,
      GroupBase<{ label: string; value: string }>
    >
  ) => ({
    ...provided,
    fontSize: "12px",
    padding: "6px 8px",
    borderRadius: "4px",
    margin: "1px 0",
    backgroundColor: state.isSelected
      ? "rgb(59 130 246)" // blue-500
      : state.isFocused
      ? "rgb(243 244 246)" // gray-100
      : "transparent",
    color: state.isSelected ? "white" : "rgb(17 24 39)", // gray-900
    "&:hover": {
      backgroundColor: state.isSelected
        ? "rgb(59 130 246)" // blue-500
        : "rgb(243 244 246)", // gray-100
    },
    "@media (prefers-color-scheme: dark)": {
      color: state.isSelected ? "white" : "rgb(243 244 246)", // gray-100
      backgroundColor: state.isSelected
        ? "rgb(59 130 246)" // blue-500
        : state.isFocused
        ? "rgb(55 65 81)" // gray-700
        : "transparent",
      "&:hover": {
        backgroundColor: state.isSelected
          ? "rgb(59 130 246)" // blue-500
          : "rgb(55 65 81)", // gray-700
      },
    },
  }),
  noOptionsMessage: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontSize: "12px",
    color: "rgb(107 114 128)", // gray-500
    "@media (prefers-color-scheme: dark)": {
      color: "rgb(156 163 175)", // gray-400
    },
  }),
};

export const badgeColorForAppointments = (
  type: string | "SEHAT CARD" | "IBP" | "OPD" | "REGULAR"
) => {
  switch (type) {
    case "SEHAT CARD":
      return "green";
    case "IBP":
      return "blue";
    case "OPD":
      return "red";
    case "REGULAR":
      return "yellow";
  }
};

export const datedddDDMMMYY = (
  date: Date | string | null | undefined
): string => {
  if (!date) return "";

  const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const ddd = weekDay[dateObj.getDay()];
  const dd = dateObj.getDate().toString().padStart(2, "0");
  const mmm = dateObj.toLocaleString("default", { month: "short" });
  const yy = dateObj.getFullYear().toString().slice(-2);

  // Use a consistent format that works on both server and client
  return `${ddd} ${dd}-${mmm}-${yy}`;
};
export const dateDDMMMYY = (date: Date | string | null | undefined): string => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const dd = dateObj.getDate().toString().padStart(2, "0");
  const mmm = dateObj.toLocaleString("default", { month: "short" });
  const yy = dateObj.getFullYear().toString().slice(-2);

  // Use a consistent format that works on both server and client
  return `${dd}-${mmm}-${yy}`;
};

export const dateYYYYMMDD = (
  date: Date | string | null | undefined
): string => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const yyyy = dateObj.getFullYear();
  const mm = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const dd = dateObj.getDate().toString().padStart(2, "0");

  // Use a consistent format that works on both server and client
  return `${yyyy}-${mm}-${dd}`;
};

export const BASEURL = (): string => {
  if (process.env.NODE_ENV === "production") {
    return "https://clinical-next-app.vercel.app";
  }
  return "http://localhost:3000";
};

export const DAY_COLOUR = (dateCell: Date) => {
  if (
    !dateCell ||
    (typeof dateCell !== "string" && !(dateCell instanceof Date))
  )
    return undefined;
  const dateObj = typeof dateCell === "string" ? new Date(dateCell) : dateCell;
  if (isNaN(dateObj.getTime())) return undefined;
  const weekday = dateObj.getDay();
  // 0: Sunday, 1: Monday, ..., 6: Saturday
  switch (weekday) {
    case 0:
      return "#ffeaea"; // Sunday
    case 1:
      return "#eaf7ff"; // Monday
    case 2:
      return "#eaffea"; // Tuesday
    case 3:
      return "#fffbea"; // Wednesday
    case 4:
      return "#f0eaff"; // Thursday
    case 5:
      return "#eafff7"; // Friday
    case 6:
      return "#f5eaff"; // Saturday
    default:
      return undefined;
  }
};
