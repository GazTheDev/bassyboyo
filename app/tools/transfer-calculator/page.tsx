"use client";

import { useState } from "react";
import { Scale, Coins, CalendarDays, TrendingDown, Info } from "lucide-react";

export default function TransferCalculatorPage() {
  const [transferFee, setTransferFee] = useState<number | "">("");
  const [contractLength, setContractLength] = useState<number>(5);
  const [weeklyWage, setWeeklyWage] = useState<number | "">("");

  // Calculation Logic
  const calculateCosts = () => {
    const fee = Number(transferFee) || 0;
    const wage = Number(weeklyWage) || 0;
    const years = contractLength || 1;

    // 1. Amortization (The transfer fee spread over contract length)
    const annualAmortization = fee / years;

    // 2. Annual Wage Cost
    const annualWage = wage * 52;

    // 3. Total Annual Cost (The "Book Value" hit for FFP)
    const totalAnnualCost = annualAmortization + annualWage;

    // 4. Total Deal Cost (Over the full contract)
    const totalDealCost = fee + (annualWage * years);

    return {
      annualAmortization,
      annualWage,
      totalAnnualCost,
      totalDealCost
    };
  };

  const results = calculateCosts();

  // Helper to format currency
  const fmt = (n: number) => 
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#064E3B] rounded-full mb-4 shadow-lg text-[#F97316]">
            <Scale size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-[#064E3B]">Transfer Amortization</h1>
          <p className="text-gray-600 mt-2">
            Calculate the true FFP/PSR cost of a signing per season.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* INPUTS COLUMN */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-[#064E3B] mb-6 flex items-center gap-2">
                <Coins size={18} /> Deal Details
              </h3>
              
              <div className="space-y-5">
                {/* Transfer Fee */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Transfer Fee</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">£</span>
                    <input 
                      type="number" 
                      value={transferFee}
                      onChange={(e) => setTransferFee(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F97316] font-mono font-bold"
                      placeholder="e.g. 50000000"
                    />
                  </div>
                </div>

                {/* Contract Length */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Contract Length (Years)</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <select 
                      value={contractLength}
                      onChange={(e) => setContractLength(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F97316] font-bold cursor-pointer appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(y => (
                        <option key={y} value={y}>{y} Years</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Weekly Wage */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Weekly Wage</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">£</span>
                    <input 
                      type="number" 
                      value={weeklyWage}
                      onChange={(e) => setWeeklyWage(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F97316] font-mono font-bold"
                      placeholder="e.g. 100000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-xs text-blue-800 leading-relaxed">
              <div className="flex items-center gap-2 font-bold mb-1">
                <Info size={14} /> How it works
              </div>
              Clubs don't pay the full fee upfront in their accounts. The cost is spread ("amortized") over the length of the contract. 
              <br/><br/>
              <strong>Annual Cost = (Fee ÷ Years) + Annual Wages</strong>
            </div>
          </div>

          {/* RESULTS COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main FFP Result */}
            <div className="bg-[#064E3B] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Scale size={120} />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-sm font-bold text-[#F97316] uppercase tracking-widest mb-1">Total Annual Cost</h2>
                <p className="text-xs text-white/60 mb-6">The actual hit to your FFP/PSR budget per season</p>
                
                <div className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2">
                  {fmt(results.totalAnnualCost)}
                </div>
                <p className="text-sm font-medium opacity-80">per season</p>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-100 text-[#F97316] rounded-lg">
                    <TrendingDown size={20} />
                  </div>
                  <span className="font-bold text-gray-500 text-sm uppercase">Amortization Cost</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{fmt(results.annualAmortization)}<span className="text-sm text-gray-400 font-normal">/yr</span></p>
                <p className="text-xs text-gray-400 mt-1">Transfer fee divided by {contractLength} years</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 text-[#064E3B] rounded-lg">
                    <Coins size={20} />
                  </div>
                  <span className="font-bold text-gray-500 text-sm uppercase">Annual Wages</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{fmt(results.annualWage)}<span className="text-sm text-gray-400 font-normal">/yr</span></p>
                <p className="text-xs text-gray-400 mt-1">Weekly wage × 52 weeks</p>
              </div>

            </div>

            {/* Total Commitment */}
            <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 flex justify-between items-center">
              <div>
                <span className="block font-bold text-gray-900">Total Commitment</span>
                <span className="text-xs text-gray-500">Total cost over full {contractLength} year contract</span>
              </div>
              <div className="text-xl font-bold text-gray-700">
                {fmt(results.totalDealCost)}
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}