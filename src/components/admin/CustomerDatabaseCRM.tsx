"use client";

import { useState } from "react";
import { CustomerProfile } from "@/lib/types";
import { INITIAL_CUSTOMERS } from "@/lib/constants/riverside-data";
import { User, Phone, Mail, MapPin, Tag, Plus, Search, Calendar, FileText, CheckCircle2 } from "lucide-react";

export function CustomerDatabaseCRM() {
  const [customers, setCustomers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCustomer, setActiveCustomer] = useState<CustomerProfile | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Customer Form State
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newNeighborhood, setNewNeighborhood] = useState("Canyon Crest");
  const [newNotes, setNewNotes] = useState("");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const newCust: CustomerProfile = {
      id: `cust-${Date.now()}`,
      name: newName,
      phone: newPhone,
      email: newEmail,
      address: newAddress,
      neighborhood: newNeighborhood,
      totalBookings: 1,
      frequency: "bi_weekly",
      notes: newNotes,
      tags: ["Direct CRM Entry", "Riverside Resident"],
    };

    setCustomers([newCust, ...customers]);
    setShowAddModal(false);
    setNewName("");
    setNewPhone("");
    setNewEmail("");
    setNewAddress("");
    setNewNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search customer name, phone, zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-blue-700 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-slate-500">
            {customers.length} Riverside Profiles
          </span>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Customers CRM Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCustomers.map((cust) => (
          <div
            key={cust.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 font-bold text-sm flex items-center justify-center border border-blue-200">
                    {cust.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 leading-tight">
                      {cust.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>{cust.neighborhood}</span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold">
                  {cust.totalBookings} Cleans
                </span>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-800">{cust.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{cust.email}</span>
                </div>
                <div className="col-span-2 text-slate-500 mt-0.5">
                  <span className="font-semibold text-slate-700">Address: </span>
                  {cust.address}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3">
                {cust.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CRM Internal Notes */}
              {cust.notes && (
                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-800 block mb-0.5">CRM Preference Notes:</span>
                  <p>{cust.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">
                Preferred Specialist: <strong className="text-slate-700">{cust.preferredCleaner || "Any Top Crew"}</strong>
              </span>
              <button
                type="button"
                onClick={() => setActiveCustomer(cust)}
                className="text-blue-700 font-bold hover:underline"
              >
                View History →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Add Riverside Customer Profile
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="(951) 555-0100"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Street Address</label>
                <input
                  type="text"
                  placeholder="4820 Overlook Terrace, Riverside CA"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Riverside Neighborhood</label>
                <select
                  value={newNeighborhood}
                  onChange={(e) => setNewNeighborhood(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                >
                  <option value="Canyon Crest">Canyon Crest</option>
                  <option value="Orangecrest">Orangecrest</option>
                  <option value="The Wood Streets">The Wood Streets</option>
                  <option value="Hawarden Hills">Hawarden Hills</option>
                  <option value="Victoria Avenue">Victoria Avenue</option>
                  <option value="UCR / Box Springs">UCR / Box Springs</option>
                  <option value="Downtown Riverside">Downtown Riverside</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Internal CRM Notes</label>
                <textarea
                  rows={2}
                  placeholder="Preferences, gate code, pets, preferred crew..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-700 text-white font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
