import { z } from "zod";

export const chatMessageSchema = z.object({
  conversationId: z.string().optional(),
  visitorId: z.string().min(1),
  visitorName: z.string().min(1).default("Riverside Homeowner"),
  visitorEmail: z.string().email().optional().or(z.literal("")),
  visitorPhone: z.string().optional().or(z.literal("")),
  message: z.string().min(1, "Message cannot be empty").max(1500),
  senderType: z.enum(["visitor", "agent", "system"]).default("visitor"),
});

export type ChatMessageValues = z.infer<typeof chatMessageSchema>;
