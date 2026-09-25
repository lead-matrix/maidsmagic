export type CleaningFrequency = 'one_time' | 'weekly' | 'bi_weekly' | 'monthly';

export type BookingStatus = 'pending' | 'confirmed' | 'dispatched' | 'in_progress' | 'completed' | 'cancelled';

export type QuoteStatus = 'inquiry_received' | 'consultation_scheduled' | 'converted' | 'follow_up_needed' | 'archived';

export type PaymentStatus = 'unpaid' | 'invoiced' | 'paid_card' | 'paid_cash' | 'complimentary';

export type ChatSenderType = 'visitor' | 'agent' | 'system';

export type ConversationStatus = 'open' | 'active' | 'resolved' | 'archived';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  estimatedHoursBase: number;
  iconName: string;
  inclusions: string[];
  badgeText?: string;
  isActive: boolean;
}

export interface AddOnItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  estimatedMinutes: number;
  iconName: string;
  badgeText?: string;
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
  specialty: string;
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
  addOns: { slug: string; name: string }[];
  frequency: CleaningFrequency;
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
  internalCrmNotes?: string;
  paymentStatus?: PaymentStatus;
  priorityTag?: 'Standard' | 'VIP Riverside' | 'Urgent Turnover';
  estimatedHours: number;
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
  zipCode?: string;
  neighborhood?: string;
  status: QuoteStatus;
  leadSource?: string;
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

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  neighborhood: string;
  totalBookings: number;
  frequency: CleaningFrequency;
  notes: string;
  preferredCleaner?: string;
  tags: string[];
}
