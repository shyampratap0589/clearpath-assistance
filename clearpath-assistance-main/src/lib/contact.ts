export const PHONE_DISPLAY = "+91 76910 17771";
export const TEL = "tel:+917691017771";
export const EMAIL = "ranvijay1104@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;
export const WA_BASE = "https://wa.me/917691017771";
export const waLink = (text?: string) => (text ? `${WA_BASE}?text=${encodeURIComponent(text)}` : WA_BASE);

export const STATES = [
  "Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir",
  "Jharkhand","Karnataka","Kerala","Ladakh","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal",
];

export const isPhone = (v: string) => /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ""));
