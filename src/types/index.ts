export type CustomerJourneyType = 'beginner' | 'certified' | 'courses';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Interested'
  | 'Follow-up'
  | 'Booking Pending'
  | 'Confirmed'
  | 'Completed'
  | 'Lost';

export type PaymentStatus = 'Unpaid' | 'Deposit Paid' | 'Fully Paid' | 'Refunded';

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  customerName: string;
  email: string;
  whatsapp: string;
  journeyType: CustomerJourneyType;
  selectedExperienceId?: string;
  selectedExperienceTitle: string;
  certification?: string;
  loggedDives?: string;
  lastDive?: string;
  divingInterests?: string[];
  preferredDestination?: string;
  preferredDate: string;
  enquiryDate?: string;
  requestedDivingDate?: string;
  confirmationDate?: string;
  paymentStatus?: PaymentStatus;
  participants: number;
  accommodation?: string;
  footSize?: string;
  additionalRequests?: string;
  status: LeadStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
  followUpDate?: string;
  notes?: LeadNote[];
  estimatedValue?: number;
  questionnaireAnswers?: Record<string, any>;
}

export interface DivingExperience {
  id: string;
  title: string;
  category: 'beginner' | 'certified' | 'course' | 'specialty' | 'refresher';
  shortDesc: string;
  description: string;
  duration: string;
  priceThb: number | null; // null = request quotation
  priceNote?: string;
  maxDepth?: string;
  prerequisites: string;
  minAge?: string;
  highlights: string[];
  included: string[];
  imageUrl: string;
  active: boolean;
  recommendedFor?: string;
}

export interface Destination {
  id: string;
  name: string;
  thaiName?: string;
  description: string;
  imageUrl: string;
  depthRange: string;
  tripDuration: string;
  requirements: string;
  marineLife: string[];
  diveOptions: string[];
  suitableFor: string;
  marineParkFee?: string;
}

export interface BusinessSettings {
  whatsappNumber: string;
  formattedPhone: string;
  email: string;
  address: string;
  managerName: string;
  tatLicense: string;
  ssiCenterId: string;
  defaultCurrency: string;
}

export type SupportedLanguage = 'en' | 'ru' | 'he';
