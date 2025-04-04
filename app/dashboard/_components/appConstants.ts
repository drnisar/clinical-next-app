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
  { label: "IU", value: "IU" },
  { label: "mg/5 ml", value: "mg/5 ml" },
];

export const admissionModes = [
  { label: "SEHAT CARD", value: "SEHAT CARD" },
  { label: "IBP", value: "IBP" },
  { label: "REGULAR", value: "REGULAR" },
  { label: "EMERGENCY", value: "EMERGENCY" },
];

export const dischargeStatuses = [{ label: "DISCHARGED", value: "DISCHARGED" }];

export const dischargeModes = [
  { label: "NORMAL", value: "NORMAL" },
  { label: "LAMA", value: "LAMA" },
  { label: "DEATH", value: "DEATH" },
  { label: "TRANSFER", value: "TRANSFER" },
  { label: "OTHER", value: "OTHER" },
];
