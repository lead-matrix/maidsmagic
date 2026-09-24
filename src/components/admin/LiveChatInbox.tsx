"use client";

import { useState } from "react";
import { ChatConversation, ChatMessage } from "@/lib/types";
import { sendAdminReplyAction } from "@/actions/chat-actions";
import {
  MessageSquare,
  Send,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
  Bot,
  Shield,
} from "lucide-react";

interface LiveChatInboxProps {
  conversations: ChatConversation[];
  onReplySent: (convId: string, message: ChatMessage) => void;
  onResolveConversation: (convId: string) => void;
}

export function LiveChatInbox({
  conversations,
  onReplySent,
  onResolveConversation,
}: LiveChatInboxProps) {
  const [activeConvId, setActiveConvId] = useState<string>(
    conversations[0]?.id || ""
  );
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const activeConv =
    conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConv) return;

    setIsSending(true);
    const text = replyText.trim();
    setReplyText("");

    try {
      const res = await sendAdminReplyAction(activeConv.id, text);
      if (res.success && res.message) {
        onReplySent(activeConv.id, res.message);
      }
    } catch (err) {
      console.error("Failed to send admin reply:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">
      {/* Left Sidebar: Conversations List */}
      <div className="lg:col-span-4 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Inquiry Conversations</h3>
            <p className="text-[11px] text-slate-500">Live visitor messages from website widget</p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            {conversations.length} Active
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs italic">
              No conversations yet. Open the website chat widget to initiate one.
            </div>
          ) : (
            conversations.map((conv) => {
              const isSelected = conv.id === activeConv?.id;
              const lastMsg = conv.messages[conv.messages.length - 1];

              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full p-4 text-left transition-colors flex items-start gap-3 ${
                    isSelected
                      ? "bg-emerald-50/80 border-l-4 border-emerald-700"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                    {conv.visitorName.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {conv.visitorName}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {new Date(conv.lastMessageAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 truncate leading-snug">
                      {lastMsg ? lastMsg.message : "New conversation"}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          conv.status === "open"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {conv.status}
                      </span>
                      {conv.visitorPhone && (
                        <span className="text-[10px] text-slate-400 truncate">
                          {conv.visitorPhone}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Active Thread & Reply Box */}
      <div className="lg:col-span-8 flex flex-col h-full justify-between">
        {activeConv ? (
          <>
            {/* Header of Active Thread */}
            <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                  {activeConv.visitorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {activeConv.visitorName}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    {activeConv.visitorPhone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-emerald-700" />
                        <span>{activeConv.visitorPhone}</span>
                      </span>
                    )}
                    {activeConv.visitorEmail && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-emerald-700" />
                        <span>{activeConv.visitorEmail}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onResolveConversation(activeConv.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Mark Resolved</span>
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30 text-xs min-h-[350px] max-h-[460px]">
              {activeConv.messages.map((msg) => {
                const isAdmin = msg.senderType === "agent";

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isAdmin ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-bold text-slate-500">
                        {msg.senderName}
                      </span>
                      <span className="text-[9px] text-slate-400">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isAdmin
                          ? "bg-emerald-800 text-white rounded-br-xs shadow-xs"
                          : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Input Form */}
            <form
              onSubmit={handleSendReply}
              className="p-4 border-t border-slate-200 bg-white flex items-center gap-3"
            >
              <input
                type="text"
                placeholder={`Reply to ${activeConv.visitorName}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              <button
                type="submit"
                disabled={!replyText.trim() || isSending}
                className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Reply</span>
              </button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full p-8 text-slate-400 text-sm">
            Select a conversation from the left to begin replying.
          </div>
        )}
      </div>
    </div>
  );
}
