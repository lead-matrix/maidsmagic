"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MetricsOverview } from "@/components/admin/MetricsOverview";
import { LiveOrderBoard } from "@/components/admin/LiveOrderBoard";
import { LiveChatInbox } from "@/components/admin/LiveChatInbox";
import { AbandonedQuotesConsole } from "@/components/admin/AbandonedQuotesConsole";
import { CleanerDispatcher } from "@/components/admin/CleanerDispatcher";
import { CustomerDatabaseCRM } from "@/components/admin/CustomerDatabaseCRM";
import { ServicesConfiguratorCRM } from "@/components/admin/ServicesConfiguratorCRM";
import {
  INITIAL_BOOKINGS,
  INITIAL_QUOTES,
  INITIAL_CHAT_CONVERSATIONS,
} from "@/lib/store/mock-data";
import { BookingLead, BookingStatus, ChatConversation, ChatMessage, QuoteLead } from "@/lib/types";
import {
  LayoutGrid,
  MessageSquare,
  Tag,
  Users,
  Sparkles,
  Sliders,
  UserCheck,
  CalendarCheck,
} from "lucide-react";

export default function AdminCommandCenterPage() {
  const [activeTab, setActiveTab] = useState<
    "orders" | "chat" | "quotes" | "customers" | "cleaners" | "services"
  >("orders");

  const [bookings, setBookings] = useState<BookingLead[]>(INITIAL_BOOKINGS);
  const [quotes, setQuotes] = useState<QuoteLead[]>(INITIAL_QUOTES);
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CHAT_CONVERSATIONS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync with localStorage
  const loadData = useCallback(() => {
    setIsRefreshing(true);
    if (typeof window !== "undefined") {
      // 1. Custom Bookings
      try {
        const customBookings = JSON.parse(
          localStorage.getItem("maidsmagic_custom_bookings") || "[]"
        );
        if (Array.isArray(customBookings) && customBookings.length > 0) {
          const combined = [...customBookings, ...INITIAL_BOOKINGS];
          const uniqueBookings = Array.from(
            new Map(combined.map((b) => [b.id, b])).values()
          );
          setBookings(uniqueBookings);
        } else {
          setBookings(INITIAL_BOOKINGS);
        }
      } catch {
        setBookings(INITIAL_BOOKINGS);
      }

      // 2. Custom Chat Conversations
      try {
        const customChats = JSON.parse(
          localStorage.getItem("maidsmagic_admin_conversations") || "[]"
        );
        if (Array.isArray(customChats) && customChats.length > 0) {
          const combinedChats = [...customChats, ...INITIAL_CHAT_CONVERSATIONS];
          const uniqueChats = Array.from(
            new Map(combinedChats.map((c) => [c.id, c])).values()
          );
          setConversations(uniqueChats);
        } else {
          setConversations(INITIAL_CHAT_CONVERSATIONS);
        }
      } catch {
        setConversations(INITIAL_CHAT_CONVERSATIONS);
      }
    }

    setTimeout(() => setIsRefreshing(false), 400);
  }, []);

  useEffect(() => {
    loadData();

    const handleBookingCreated = () => loadData();
    const handleChatUpdated = () => loadData();

    window.addEventListener("maidsmagic_booking_created", handleBookingCreated);
    window.addEventListener("maidsmagic_chat_updated", handleChatUpdated);

    return () => {
      window.removeEventListener("maidsmagic_booking_created", handleBookingCreated);
      window.removeEventListener("maidsmagic_chat_updated", handleChatUpdated);
    };
  }, [loadData]);

  // Status Updater
  const handleUpdateStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === bookingId ? { ...b, status: newStatus, updatedAt: new Date().toISOString() } : b
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("maidsmagic_custom_bookings", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Cleaner Assigner
  const handleAssignCleaner = (bookingId: string, cleanerId: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === bookingId ? { ...b, cleanerId, updatedAt: new Date().toISOString() } : b
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("maidsmagic_custom_bookings", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Internal CRM Notes Updater
  const handleUpdateNotes = (bookingId: string, notes: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === bookingId ? { ...b, internalCrmNotes: notes, updatedAt: new Date().toISOString() } : b
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("maidsmagic_custom_bookings", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Add Manual Booking
  const handleAddNewBooking = (newBooking: BookingLead) => {
    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem("maidsmagic_custom_bookings", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Chat Reply Handler
  const handleReplySent = (convId: string, message: ChatMessage) => {
    setConversations((prev) => {
      const updated = prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              lastMessageAt: new Date().toISOString(),
              messages: [...c.messages, message],
            }
          : c
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("maidsmagic_admin_conversations", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Resolve Conversation
  const handleResolveConversation = (convId: string) => {
    setConversations((prev) => {
      const updated = prev.map((c) =>
        c.id === convId ? { ...c, status: "resolved" as const } : c
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("maidsmagic_admin_conversations", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Recovery Action Logger
  const handleRecoverAction = (quoteId: string, type: "email" | "sms") => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quoteId
          ? {
              ...q,
              status: "consultation_scheduled",
              recoveryEmailSent: type === "email" ? true : q.recoveryEmailSent,
              recoverySmsSent: type === "sms" ? true : q.recoverySmsSent,
            }
          : q
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-blue-900 selection:text-white">
      {/* Admin Top Header */}
      <AdminHeader onRefresh={loadData} isRefreshing={isRefreshing} />

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top KPI Metrics Overview */}
        <MetricsOverview bookings={bookings} quotes={quotes} />

        {/* Tab Navigation Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 overflow-x-auto gap-2 pb-px bg-white p-2 rounded-2xl shadow-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* 1. Live Order Board */}
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "orders"
                  ? "bg-blue-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Live Order Board</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === "orders" ? "bg-blue-900 text-white" : "bg-slate-200 text-slate-700"
                }`}
              >
                {bookings.length}
              </span>
            </button>

            {/* 2. Communication Hub */}
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "chat"
                  ? "bg-blue-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Communication Hub</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === "chat" ? "bg-blue-900 text-white" : "bg-amber-100 text-amber-900"
                }`}
              >
                {conversations.length}
              </span>
            </button>

            {/* 3. Inquiries CRM */}
            <button
              type="button"
              onClick={() => setActiveTab("quotes")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "quotes"
                  ? "bg-blue-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Inquiries Pipeline</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === "quotes" ? "bg-blue-900 text-white" : "bg-slate-200 text-slate-700"
                }`}
              >
                {quotes.length}
              </span>
            </button>

            {/* 4. Customer Database CRM */}
            <button
              type="button"
              onClick={() => setActiveTab("customers")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "customers"
                  ? "bg-blue-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Customer CRM</span>
            </button>

            {/* 5. Crew Dispatcher */}
            <button
              type="button"
              onClick={() => setActiveTab("cleaners")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "cleaners"
                  ? "bg-blue-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Crew Dispatcher</span>
            </button>

            {/* 6. Services Configurator */}
            <button
              type="button"
              onClick={() => setActiveTab("services")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "services"
                  ? "bg-blue-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Scope Configurator</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        {activeTab === "orders" && (
          <LiveOrderBoard
            bookings={bookings}
            onUpdateStatus={handleUpdateStatus}
            onAssignCleaner={handleAssignCleaner}
            onUpdateNotes={handleUpdateNotes}
            onAddNewBooking={handleAddNewBooking}
          />
        )}

        {activeTab === "chat" && (
          <LiveChatInbox
            conversations={conversations}
            onReplySent={handleReplySent}
            onResolveConversation={handleResolveConversation}
          />
        )}

        {activeTab === "quotes" && (
          <AbandonedQuotesConsole
            quotes={quotes}
            onRecoverAction={handleRecoverAction}
          />
        )}

        {activeTab === "customers" && <CustomerDatabaseCRM />}

        {activeTab === "cleaners" && <CleanerDispatcher bookings={bookings} />}

        {activeTab === "services" && <ServicesConfiguratorCRM />}
      </main>
    </div>
  );
}
