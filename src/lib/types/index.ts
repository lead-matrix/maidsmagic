export type CleaningFrequency = 'one_time' | 'weekly' | 'bi_weekly' | 'monthly';

export type BookingStatus = 'pending' | 'confirmed' | 'dispatched' | 'in_progress' | 'completed' | 'cancelled';

export type QuoteStatus = 'calculated' | 'lead_captured' | 'contacted' | 'converted' | 'abandoned';

export type ChatSenderType = 'visitor' | 'agent' | 'system';

export type ConversationStatus = 'open' | 'active' | 'resolved' | 'archived';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  basePrice: number;
  pricePerSqft: number;
  pricePerBed: number;
  pricePerBath: number;
  estimatedHoursBase: number;
  iconName: string;
  isActive: boolean;
}

export interface AddOnItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  estimatedMinutes: number;
  iconName: string;
  isActive: boolean;
}

export interface CleanerSpecialist {
  id: string;
  fullName: string;
  teamName: string;
  phone: string;
  email: string;
  avatarUrl: string;
  rating: number;
  completedJobs: number;
  assignedZipCodes: string[];
  isActive: boolean;
}

export interface BookingLead {
  id: string;
  bookingReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceTitle: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  halfBathrooms: number;
  addOns: { slug: string; name: string; price: number }[];
  frequency: CleaningFrequency;
  frequencyDiscountPercent: number;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  serviceDate: string; // YYYY-MM-DD
  serviceTimeSlot: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood?: string;
  entryInstructions?: string;
  specialNotes?: string;
  status: BookingStatus;
  cleanerId?: string;
  assignedCleaner?: CleanerSpecialist;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteLead {
  id: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  serviceType: string;
  frequency: CleaningFrequency;
  addOns: string[];
  estimatedPrice: number;
  zipCode?: string;
  neighborhood?: string;
  status: QuoteStatus;
  recoveryEmailSent?: boolean;
  recoverySmsSent?: boolean;
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  neighborhood: string;
  serviceType: string;
  verifiedSourceUrl: string;
  avatarUrl?: string;
  isFeatured?: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderType: ChatSenderType;
  senderName: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  visitorId: string;
  visitorName: string;
  visitorEmail?: string;
  visitorPhone?: string;
  status: ConversationStatus;
  lastMessageAt: string;
  createdAt: string;
  messages: ChatMessage[];
}
