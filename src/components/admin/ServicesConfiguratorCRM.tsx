"use client";

import { useState } from "react";
import { ServiceItem, AddOnItem } from "@/lib/types";
import { SERVICES_CATALOG, ADDONS_CATALOG } from "@/lib/constants/riverside-data";
import { Sparkles, Check, Plus, Edit2, Shield, Eye, EyeOff, Layers, CheckCircle2 } from "lucide-react";

export function ServicesConfiguratorCRM() {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_CATALOG);
  const [addOns, setAddOns] = useState<AddOnItem[]>(ADDONS_CATALOG);
  const [activeTab, setActiveTab] = useState<"services" | "addons">("services");

  // Toggle Service Active Status
  const toggleServiceActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  // Toggle AddOn Active Status
  const toggleAddOnActive = (id: string) => {
    setAddOns((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Tabs */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Services & Scope Configurator</h3>
          <p className="text-[11px] text-slate-500">
            Control which cleaning packages & focus add-ons appear on the public booking engine
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "services"
                ? "bg-white text-blue-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Cleaning Packages ({services.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("addons")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "addons"
                ? "bg-white text-blue-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Focus Add-Ons ({addOns.length})
          </button>
        </div>
      </div>

      {/* Services List */}
      {activeTab === "services" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                service.isActive
                  ? "bg-white border-slate-200 shadow-xs hover:shadow-md"
                  : "bg-slate-50 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900 leading-tight">
                      {service.title}
                    </h4>
                    {service.badgeText && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                        {service.badgeText}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-blue-700 mt-0.5">
                    {service.tagline}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleServiceActive(service.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1 ${
                    service.isActive
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                      : "bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200"
                  }`}
                >
                  {service.isActive ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live on Site</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {service.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Included Cleaning Inclusions ({service.inclusions.length})
                </span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {service.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Base Time: ~{service.estimatedHoursBase} hours</span>
                <span className="text-blue-700 font-semibold font-mono">ID: {service.slug}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add-Ons List */}
      {activeTab === "addons" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {addOns.map((addon) => (
            <div
              key={addon.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                addon.isActive
                  ? "bg-white border-slate-200 shadow-xs"
                  : "bg-slate-50 border-slate-200 opacity-60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {addon.badgeText || "Focus Add-On"}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleAddOnActive(addon.id)}
                    className="text-slate-400 hover:text-slate-600"
                    title="Toggle active"
                  >
                    {addon.isActive ? (
                      <Eye className="w-4 h-4 text-blue-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{addon.name}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {addon.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>+~{addon.estimatedMinutes} mins detail</span>
                <span className="font-semibold text-blue-700 font-mono">Active</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
