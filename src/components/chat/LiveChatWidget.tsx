"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, Phone, User, Check, Bot } from "lucide-react";
import { sendChatMessageAction } from "@/actions/chat-actions";
import { RIVERSIDE_COMPANY_INFO } from "@/lib/constants/riverside-data";

interface ChatMessageState {
  id: string;
  senderType: "visitor" | "agent" | "system";
  senderName: string;
  message: string;
  createdAt: string;
}

const QUICK_PROMPTS = [
  "Can you clean today in Riverside?",
  "Do I need to be home during the clean?",
  "Are your cleaning products pet-safe?",
  "What is included in Move-Out clean?",
];

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageState[]>([
    {
      id: "welcome-1",
      senderType: "agent",
      senderName: "MaidsMagic Concierge",
      message: "Hello! Welcome to MaidsMagic Riverside. How can our white-glove team assist you today?",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [hasProvidedContact, setHasProvidedContact] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate or load visitorId & conversationId
    if (typeof window !== "undefined") {
      let storedConv = localStorage.getItem("maidsmagic_conv_id");
      if (!storedConv) {
        storedConv = `conv-vis-${Date.now()}`;
        localStorage.setItem("maidsmagic_conv_id", storedConv);
      }
      setConversationId(storedConv);

      // Load saved chat messages
      const savedMessages = localStorage.getItem("maidsmagic_chat_history");
      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        } catch {
          // ignore
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const saveToStorage = (updated: ChatMessageState[]) => {
    setMessages(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("maidsmagic_chat_history", JSON.stringify(updated));

      // Also sync conversation to global admin inbox store
      try {
        const storedInbox = JSON.parse(localStorage.getItem("maidsmagic_admin_conversations") || "[]");
        const existingConvIndex = storedInbox.findIndex((c: any) => c.id === conversationId);
        const convPayload = {
          id: conversationId,
          visitorId: "vis-local",
          visitorName: visitorName || "Riverside Visitor",
          visitorPhone: visitorPhone || "(951) 697-9000",
          visitorEmail: "",
          status: "open",
          lastMessageAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          messages: updated,
        };

        if (existingConvIndex >= 0) {
          storedInbox[existingConvIndex] = convPayload;
        } else {
          storedInbox.unshift(convPayload);
        }
        localStorage.setItem("maidsmagic_admin_conversations", JSON.stringify(storedInbox));
        window.dispatchEvent(new Event("maidsmagic_chat_updated"));
      } catch {
        // ignore
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMessage: ChatMessageState = {
      id: `msg-${Date.now()}`,
      senderType: "visitor",
      senderName: visitorName || "You",
      message: text,
      createdAt: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    saveToStorage(newMessages);
    setInputText("");

    // Trigger Server Action to sync with backend database
    try {
      await sendChatMessageAction({
        conversationId,
        visitorId: "vis-local",
        visitorName: visitorName || "Riverside Visitor",
        visitorPhone,
        message: text,
        senderType: "visitor",
      });
    } catch {
      // ignore
    }

    // Simulate intelligent concierge typing response
    setIsTyping(true);
    setTimeout(() => {
      let replyText = "Thank you for reaching out! Our Riverside dispatch manager is reviewing your inquiry and can dispatch a crew promptly. You can also calculate an instant quote using our 3-step engine or call us at (951) 697-9000.";

      if (text.toLowerCase().includes("today") || text.toLowerCase().includes("urgent")) {
        replyText = "Yes! We have Same-Day / Urgent crews active in Riverside today (Canyon Crest, Orangecrest, Wood Streets). Call (951) 697-9000 or select 'Urgent / Same-Day' in our quote builder!";
      } else if (text.toLowerCase().includes("home") || text.toLowerCase().includes("there")) {
        replyText = "You do not need to be home! Many Riverside clients provide lockbox or gate codes in Step 3 of our quote builder. We send photo verification upon completion.";
      } else if (text.toLowerCase().includes("pet") || text.toLowerCase().includes("dog") || text.toLowerCase().includes("cat")) {
        replyText = "All of our products are 100% pet-safe, non-toxic, and hypoallergenic! We also offer a dedicated Pet Hair Detail add-on with electrostatic fur extraction.";
      }

      const botReply: ChatMessageState = {
        id: `msg-${Date.now() + 1}`,
        senderType: "agent",
        senderName: "MaidsMagic Concierge",
        message: replyText,
        createdAt: new Date().toISOString(),
      };

      setIsTyping(false);
      saveToStorage([...newMessages, botReply]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative p-4 rounded-full bg-gradient-to-tr from-emerald-900 via-emerald-800 to-emerald-700 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all group border-2 border-amber-400/80 ring-4 ring-emerald-950/20"
            aria-label="Open Live Chat"
          >
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold text-slate-950 items-center justify-center">
                1
              </span>
            </span>
          </button>
        )}
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[580px] h-[520px] rounded-3xl bg-white shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-950 to-slate-900 text-white flex items-center justify-between border-b border-emerald-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300 font-serif font-bold text-sm border border-emerald-600/40">
                MM
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Riverside Concierge</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-emerald-200">Online • 1405 Spruce St Riverside</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Contact Capture Strip */}
          {!hasProvidedContact && (
            <div className="p-3 bg-amber-50 border-b border-amber-200/80 flex items-center justify-between gap-2 text-xs">
              <span className="text-amber-900 font-medium truncate">
                Leave your name for priority callback:
              </span>
              <button
                type="button"
                onClick={() => {
                  const name = prompt("Enter your name:");
                  if (name) {
                    setVisitorName(name);
                    const phone = prompt("Enter your phone number (optional):") || "";
                    setVisitorPhone(phone);
                    setHasProvidedContact(true);
                  }
                }}
                className="px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] shrink-0"
              >
                Add Name
              </button>
            </div>
          )}

          {/* Message History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
            {messages.map((msg) => {
              const isMe = msg.senderType === "visitor";

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] text-slate-400 mb-1 px-1">
                    {msg.senderName}
                  </span>
                  <div
                    className={`max-w-[82%] p-3 rounded-2xl leading-relaxed ${
                      isMe
                        ? "bg-emerald-800 text-white rounded-br-xs shadow-xs"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-2xl border border-slate-200 w-16">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {QUICK_PROMPTS.map((promptText, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(promptText)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 text-slate-600 border border-slate-200 shrink-0 transition-colors"
              >
                {promptText}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about Riverside cleans..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-100 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
