"use client";

import { useState } from "react";
import { QuoteLead } from "@/lib/types";
import { sendQuoteRecoveryAction } from "@/actions/quote-actions";
import {
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Tag,
  Clock,
  MapPin,
} from "lucide-react";

interface AbandonedQuotesProps {
  quotes: QuoteLead[];
  onRecoverAction: (quoteId: string, type: "email" | "sms") => void;
}

export function AbandonedQuotesConsole({ quotes, onRecoverAction }: AbandonedQuotesProps) {
  const [activeActionMsg, setActiveActionMsg] = useState<string | null>(null);

  const handleSendRecovery = async (quoteId: string, channel: "email" | "sms") => {
    try {
      const res = await sendQuoteRecoveryAction(quoteId, channel);
      if (res.success) {
        onRecoverAction(quoteId, channel);
        setActiveActionMsg(res.message);
        setTimeout(() => setActiveActionMsg(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Active Inquiries
            </span>
            <p className="text-2xl font-bold font-mono text-blue-950 mt-1">
              {quotes.length} Leads
            </p>
            <span className="text-[11px] text-blue-700">
              Direct Riverside Homeowners
            </span>
          </div>
          <div className="p-3 rounded-xl bg-blue-100 text-blue-800">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Primary Service Inquired
            </span>
            <p className="text-lg font-bold text-slate-900 mt-1">
              Luxury Deep Clean
            </p>
            <span className="text-[11px] text-slate-500">Canyon Crest & Orangecrest</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
            <Sparkles className="w-6 h-6 text-blue-700" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Outreach Response
            </span>
            <p className="text-xl font-bold font-mono text-blue-800 mt-1">
              &lt; 15 Mins
            </p>
            <span className="text-[11px] text-blue-600 font-medium">Riverside Concierge Target</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-blue-700">
            <Clock className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {activeActionMsg && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center gap-2 animate-in fade-in-50 duration-200">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{activeActionMsg}</span>
        </div>
      )}

      {/* Leads Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Inquiry & Custom Plan Pipeline</h3>
            <p className="text-[11px] text-slate-500">Fast follow-up outreach for high-intent Riverside homeowners</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Lead Contact</th>
                <th className="p-4">Requested Scope</th>
                <th className="p-4">Riverside Zone</th>
                <th className="p-4">Lead Source</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Outreach Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">
                      {q.customerName || "Riverside Homeowner"}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      {q.customerPhone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{q.customerPhone}</span>
                        </span>
                      )}
                      {q.customerEmail && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{q.customerEmail}</span>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{q.serviceType}</div>
                    <div className="text-[11px] text-slate-500">
                      {q.squareFootage} sq ft • {q.bedrooms} Bed / {q.bathrooms} Bath
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-slate-700">
                      {q.neighborhood || "Riverside"}, {q.zipCode || "92506"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-500">{q.leadSource || "Website Custom Plan"}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        q.status === "inquiry_received"
                          ? "bg-amber-100 text-amber-800"
                          : q.status === "consultation_scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {q.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleSendRecovery(q.id, "sms")}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold text-xs flex items-center gap-1 transition-colors border border-blue-200"
                        title="Send Follow-up SMS"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
                        <span>SMS</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendRecovery(q.id, "email")}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1 transition-colors"
                        title="Send Plan Details Email"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-600" />
                        <span>Email</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
