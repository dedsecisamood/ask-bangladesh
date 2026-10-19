export interface Service {
  id: string;
  nameBn: string;
  nameEn: string;
  categorySlug: string;
  agencyBn: string;
  officialUrl: string;
  descriptionBn: string;
  deliveryTime: string;
  fee: string;
}

export interface Category {
  slug: string;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  iconName: string;
  serviceCount: number;
}

export const CATEGORIES: Category[] = [
  {
    slug: "passport",
    nameBn: "পাসপোর্ট ও ইমিগ্রেশন",
    nameEn: "Passports and Immigration",
    descriptionBn: "ই-পাসপোর্ট নতুন আবেদন, রিইস্যু ও স্ট্যাটাস ট্র্যাকিং",
    iconName: "Compass",
    serviceCount: 4,
  },
  {
    slug: "nid",
    nameBn: "জাতীয় পরিচয়পত্র (NID)",
    nameEn: "National Identity Card",
    descriptionBn: "নতুন ভোটার নিবন্ধন, তথ্য সংশোধন ও রিইস্যু",
    iconName: "CreditCard",
    serviceCount: 5,
  },
  {
    slug: "land",
    nameBn: "ভূমি ও রেজিস্ট্রেশন",
    nameEn: "Land and Property",
    descriptionBn: "ই-নামজারি, খতিয়ান বা পরচা এবং ভূমি উন্নয়ন কর পরিশোধ",
    iconName: "MapPin",
    serviceCount: 6,
  },
  {
    slug: "birth-death",
    nameBn: "জন্ম ও মৃত্যু নিবন্ধন",
    nameEn: "Birth and Death Registration",
    descriptionBn: "নতুন জন্ম সনদ আবেদন, জন্ম সনদ যাচাই ও তথ্য সংশোধন",
    iconName: "FileText",
    serviceCount: 3,
  },
  {
    slug: "tax",
    nameBn: "আয়কর ও ভ্যাট",
    nameEn: "Income Tax and VAT",
    descriptionBn: "ই-টিন (e-TIN) খোলা ও অনলাইনে আয়কর রিটার্ন দাখিল",
    iconName: "Receipt",
    serviceCount: 4,
  },
  {
    slug: "driving-license",
    nameBn: "ড্রাইভিং লাইসেন্স ও যানবাহন",
    nameEn: "Driving Licences and Vehicles",
    descriptionBn: "বিআরটিএ লার্নার, স্মার্ট ড্রাইভিং লাইসেন্স ও ফিটনেস",
    iconName: "Car",
    serviceCount: 4,
  },
];

export const SERVICES: Service[] = [
  {
    id: "epassport-reissue",
    nameBn: "ই-পাসপোর্ট রিইস্যু আবেদন",
    nameEn: "e-Passport Reissue Application",
    categorySlug: "passport",
    agencyBn: "ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর",
    officialUrl: "https://www.epassport.gov.bd",
    descriptionBn: "মেয়াদোত্তীর্ণ বা হারানো পাসপোর্ট পুনরায় ইস্যু করার সরকারি পদ্ধতি।",
    deliveryTime: "১৫ থেকে ২১ কর্মদিবস (সাধারণ)",
    fee: "৪,০২৫ টাকা (৫ বছর / ৪৮ পাতা)",
  },
  {
    id: "nid-correction",
    nameBn: "জাতীয় পরিচয়পত্র (NID) সংশোধন",
    nameEn: "NID Card Information Correction",
    categorySlug: "nid",
    agencyBn: "জাতীয় পরিচয় নিবন্ধন অনুবিভাগ",
    officialUrl: "https://services.nidw.gov.bd",
    descriptionBn: "নাম, জন্ম তারিখ, পিতা-মাতার নাম ও ঠিকানা অনলাইনে সংশোধনের আবেদন।",
    deliveryTime: "৭ থেকে ৩০ কর্মদিবস",
    fee: "২৩০ থেকে ৩৪৫ টাকা",
  },
  {
    id: "land-tax-ldtax",
    nameBn: "অনলাইনে ভূমি উন্নয়ন কর (খাজনা) পরিশোধ",
    nameEn: "Land Development Tax Online Payment",
    categorySlug: "land",
    agencyBn: "ভূমি মন্ত্রণালয়",
    officialUrl: "https://ldtax.gov.bd",
    descriptionBn: "ঘরে বসেই হোল্ডিং নম্বর যুক্ত করে বার্ষিক খাজনা পরিশোধ ও দাখিলা সংগ্রহ।",
    deliveryTime: "তাৎক্ষণিক ই-দাখিলা",
    fee: "জমির ধরন ও পরিমাণের ওপর নির্ভরশীল",
  },
  {
    id: "e-namjari",
    nameBn: "অনলাইন ই-নামজারি (Mutation)",
    nameEn: "Online Mutation (e-Namjari)",
    categorySlug: "land",
    agencyBn: "ভূমি মন্ত্রণালয়",
    officialUrl: "https://mutation.land.gov.bd",
    descriptionBn: "জমি ক্রয়ের পর সরকারি রেকর্ডে নিজের নামে নামজারি বা খারিজ করার আবেদন।",
    deliveryTime: "২৮ কর্মদিবস",
    fee: "১,১৭০ টাকা সর্বমোট সরকারি ফি",
  },
];
