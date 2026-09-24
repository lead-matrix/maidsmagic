"use server";

import { chatMessageSchema, ChatMessageValues } from "@/lib/validations/chat.schema";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export async function sendChatMessageAction(params: ChatMessageValues) {
  const result = chatMessageSchema.safeParse(params);

  if (!result.success) {
    return {
      success: false,
      message: "Please provide a valid message.",
    };
  }

  const data = result.data;
  const messageId = `msg-${Date.now()}`;
  const conversationId = data.conversationId || `conv-${Date.now()}`;

  const messageRecord = {
    id: messageId,
    conversationId,
    senderType: data.senderType,
    senderName: data.visitorName || "Riverside Visitor",
    message: data.message,
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerClient();
      await supabase.from("chat_messages").insert([
        {
          conversation_id: conversationId,
          sender_type: data.senderType,
          sender_name: data.visitorName,
          message: data.message,
        },
      ]);
    } catch (err) {
      console.warn("Supabase chat message insert error:", err);
    }
  }

  return {
    success: true,
    conversationId,
    message: messageRecord,
  };
}

export async function sendAdminReplyAction(conversationId: string, messageText: string) {
  const messageId = `msg-admin-${Date.now()}`;
  const messageRecord = {
    id: messageId,
    conversationId,
    senderType: "agent" as const,
    senderName: "MaidsMagic Dispatch Concierge",
    message: messageText,
    isRead: true,
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerClient();
      await supabase.from("chat_messages").insert([
        {
          conversation_id: conversationId,
          sender_type: "agent",
          sender_name: "MaidsMagic Dispatch Concierge",
          message: messageText,
        },
      ]);
    } catch (err) {
      console.warn("Supabase admin reply error:", err);
    }
  }

  return {
    success: true,
    message: messageRecord,
  };
}
