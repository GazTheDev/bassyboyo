"use client";

import { useState } from "react";
import { Calculator, ArrowRightLeft, Coins, Globe } from "lucide-react";

type Currency = "GBP" | "EUR" | "USD";

export default function WageCalculatorPage() {
  const [amount, setAmount] = useState<number | "">("");
  const [frequency, setFrequency] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const [currency, setCurrency] = useState<Currency>("GBP");

  // Calculation Logic
  const getValues = () => {
    const val = Number(amount);
    if (!val) return { weekly: 0, monthly: 0, yearly: 0 };

    if (frequency === "weekly") {
      return { weekly: val, monthly: val * 4.33, yearly: val * 52 };
    } else if (frequency === "monthly") {
      return { weekly: val / 4.33, monthly: val, yearly: val * 12 };
    } else {
      return { weekly: val / 52, monthly: val / 12, yearly: val };
    }
  };

  const results = getValues();

  // Helper to format currency
  const fmt = (n: number) => 
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(n);

  // Get current symbol for input
  const getSymbol = () => {
    switch (currency) {
      case "EUR": return "€";
      case "USD": return "$";
      default: return "£";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#064E3B] rounded-full mb-4 shadow-lg text-[#F97316]">
            <Calculator size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-[#064E3B]">Wage Converter</h1>
          <p className="text-gray-600 mt-2">
            Translating "Per Annum" to "Per Week" so you don't blow your budget.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          
          {/* Controls Bar (New) */}
          <div className="bg-[#043d2e] p-4 flex justify-end border-b border-white/10">
            <div className="flex items-center gap-2 bg-black/20 rounded-lg p-1">
              <button 
                onClick={() => setCurrency("GBP")}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${currency === "GBP" ? "bg-[#F97316] text-white" : "text-white/60 hover:text-white"}`}
              >
                GBP (£)
              </button>
              <button 
                onClick={() => setCurrency("EUR")}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${currency === "EUR" ? "bg-[#F97316] text-white" : "text-white/60 hover:text-white"}`}
              >
                EUR (€)
              </button>
              <button 
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${currency === "USD" ? "bg-[#F97316] text-white" : "text-white/60 hover:text-white"}`}
              >
                USD ($)
              </button>
            </div>
          </div>

          {/* Input Section */}
          <div className="p-8 bg-[#064E3B] text-white relative">
            <label className="block text-sm font-bold opacity-80 mb-2">Enter Wage Amount</label>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">
                  {getSymbol()}
                </span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#F97316] text-2xl font-mono font-bold"
                  placeholder="0"
                />
              </div>
              <div className="relative w-1/3">
                <select 
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as any)}
                  className="w-full h-full rounded-xl bg-[#F97316] text-white font-bold px-4 appearance-none focus:outline-none cursor-pointer text-center"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/80">
                  <ArrowRightLeft size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-8 space-y-6">
            <ResultRow 
              label="Weekly Wage" 
              value={results.weekly} 
              fmt={fmt}
              active={frequency === "weekly"} 
            />
            <ResultRow 
              label="Monthly Wage" 
              value={results.monthly} 
              fmt={fmt}
              active={frequency === "monthly"} 
            />
            <ResultRow 
              label="Annual Salary" 
              value={results.yearly} 
              fmt={fmt}
              active={frequency === "yearly"} 
            />
          </div>

          {/* Footer Tip */}
          <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <Coins size={14} /> Tip: FM usually calculates 1 month as 4.33 weeks.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}

function ResultRow({ label, value, active, fmt }: { label: string, value: number, active: boolean, fmt: (n: number) => string }) {
  return (
    <div className={`flex justify-between items-center p-4 rounded-xl transition-all ${active ? 'bg-orange-50 border border-[#F97316]/30' : 'border border-gray-100'}`}>
      <span className={`text-sm font-bold uppercase tracking-wider ${active ? 'text-[#F97316]' : 'text-gray-400'}`}>
        {label}
      </span>
      <span className={`text-2xl font-mono font-bold ${active ? 'text-gray-900' : 'text-gray-500'}`}>
        {fmt(value)}
      </span>
    </div>
  );
}