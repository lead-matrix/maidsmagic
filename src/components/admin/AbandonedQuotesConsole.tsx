"use client";

import { useState } from "react";
import { QuoteLead } from "@/lib/types";
import { sendQuoteRecoveryAction } from "@/actions/quote-actions";
import {
  DollarSign,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Tag,
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

  const totalEstimatedLost = quotes.reduce((sum, q) => sum + q.estimatedPrice, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Recoverable Pipeline
            </span>
            <p className="text-2xl font-bold font-mono text-amber-900 mt-1">
              ${totalEstimatedLost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-[11px] text-amber-800">
              {quotes.length} Uncompleted Riverside Quotes
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-800">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Avg Abandoned Cart
            </span>
            <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ${quotes.length > 0 ? (totalEstimatedLost / quotes.length).toFixed(2) : "0.00"}
            </p>
            <span className="text-[11px] text-slate-500">Includes Deep Clean & Add-ons</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
            <Tag className="w-6 h-6 text-emerald-700" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Promo Recovery Code
            </span>
            <p className="text-xl font-bold font-mono text-emerald-800 mt-1">
              RIVERSIDE10
            </p>
            <span className="text-[11px] text-emerald-600 font-medium">10% Off Instant Discount</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700">
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {activeActionMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in-50 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{activeActionMsg}</span>
        </div>
      )}

      {/* Leads Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Abandoned Quote Leads</h3>
            <p className="text-[11px] text-slate-500">One-click recovery outreach to close high-intent homeowners</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Lead Contact</th>
                <th className="p-4">Specs & Service</th>
                <th className="p-4">Neighborhood</th>
                <th className="p-4">Estimated Value</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Recovery Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">
                      {q.customerName || "Anonymous Riverside Visitor"}
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
                  <td className="p-4 font-mono font-bold text-emerald-800 text-sm">
                    ${q.estimatedPrice.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        q.status === "abandoned"
                          ? "bg-amber-100 text-amber-800"
                          : q.status === "lead_captured"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {q.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleSendRecovery(q.id, "sms")}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs flex items-center gap-1 transition-colors border border-emerald-200"
                        title="Send 10% Discount SMS"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Send SMS</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendRecovery(q.id, "email")}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1 transition-colors"
                        title="Send 10% Discount Email"
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
