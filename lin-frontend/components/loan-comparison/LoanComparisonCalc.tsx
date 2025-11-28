"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { X, Plus } from "lucide-react";
import useEMIcalc from "@/hooks/useEMIcalc";

interface LoanData {
  id: number;
  principal: number;
  rate: number;
  tenure: number;
}

export default function LoanComparisonCalc() {
  const { calculateEMI } = useEMIcalc();

  const [loans, setLoans] = useState<LoanData[]>([
    { id: 1, principal: 62000, rate: 12, tenure: 24 },
    { id: 2, principal: 62000, rate: 12, tenure: 24 },
  ]);

  const handleAddLoan = () => {
    if (loans.length >= 6) return;
    const newId = Math.max(...loans.map((l) => l.id)) + 1;
    setLoans([...loans, { id: newId, principal: 62000, rate: 12, tenure: 24 }]);
  };

  const handleRemoveLoan = (id: number) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  const handleUpdateLoan = (id: number, key: keyof LoanData, value: number) => {
    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === id
          ? loan[key] !== value
            ? { ...loan, [key]: value }
            : loan
          : loan
      )
    );
  };

  // 👇 Compute EMI details dynamically
  const computedLoans = useMemo(() => {
    return loans.map((loan) => {
      const { emi, totalInterest, totalPayment } = calculateEMI(
        loan.principal,
        loan.rate,
        loan.tenure
      );
      return { ...loan, emi, totalInterest, totalPayment };
    });
  }, [loans, calculateEMI]);

  return (
    <section className="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-16">
      <div className="text-center space-y-2 mb-10">
        <span className="text-red-500 font-semibold uppercase tracking-wide">
          Loan Calculator
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">
          Loan comparison <span className="text-red-500">calculator</span>
        </h2>
        <p className="text-gray-500">
          Our instant loan process is designed for speed and convenience
        </p>
      </div>

      <div
        id="loan-comparison-calculator"
        className="flex flex-col justify-center items-center border-2 border-gray-700 space-y-5 rounded-xl"
      >
        {/* Loan Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 rounded-xl w-full">
          {computedLoans.map((loan) => (
            <div
              key={loan.id}
              className="relative border-none rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Loan {loan.id}</h3>
                {computedLoans.length > 2 && (
                  <button
                    onClick={() => handleRemoveLoan(loan.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Principal */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-sm">Loan Amount</label>
                  <Input
                    className="w-24 bg-gray-100 border-0 text-right"
                    type="text"
                    value={`₹ ${loan.principal.toLocaleString()}`}
                    onChange={(e) =>
                      handleUpdateLoan(
                        loan.id,
                        "principal",
                        Number(e.target.value.replace(/[₹ ,]/g, ""))
                      )
                    }
                  />
                </div>
                <Slider
                  defaultValue={[loan.principal]}
                  onValueChange={(v) =>
                    handleUpdateLoan(loan.id, "principal", v[0])
                  }
                  min={5000}
                  max={500000}
                  step={1000}
                />
                <div className="flex justify-between text-xs mt-1 text-gray-500">
                  <span>₹5k</span>
                  <span>₹5,00,000</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-sm">Interest Rate</label>
                  <Input
                    className="w-16 bg-gray-100 border-0 text-right"
                    type="text"
                    value={loan.rate}
                    onChange={(e) =>
                      handleUpdateLoan(loan.id, "rate", Number(e.target.value))
                    }
                  />
                </div>
                <Slider
                  defaultValue={[loan.rate]}
                  onValueChange={(v) => handleUpdateLoan(loan.id, "rate", v[0])}
                  min={8}
                  max={30}
                  step={0.5}
                />
                <div className="flex justify-between text-xs mt-1 text-gray-500">
                  <span>8%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-sm">Tenure (Months)</label>
                  <Input
                    className="w-16 bg-gray-100 border-0 text-right"
                    type="text"
                    value={loan.tenure}
                    onChange={(e) =>
                      handleUpdateLoan(
                        loan.id,
                        "tenure",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
                <Slider
                  defaultValue={[loan.tenure]}
                  onValueChange={(v) =>
                    handleUpdateLoan(loan.id, "tenure", v[0])
                  }
                  min={2}
                  max={36}
                  step={1}
                />
                <div className="flex justify-between text-xs mt-1 text-gray-500">
                  <span>2</span>
                  <span>36</span>
                </div>
              </div>
            </div>
          ))}

          {/* Add Loan Button */}
          {computedLoans.length < 6 && (
            <div className="flex justify-center items-center border-dashed border-2 border-gray-300 rounded-xl min-h-[200px]">
              <Button
                onClick={handleAddLoan}
                variant="outline"
                className="text-red-500 border-red-400 hover:bg-red-50"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Loan
              </Button>
            </div>
          )}
        </div>
        {/* Comparison Table */}
        <div className="my-10 bg-red-500 rounded-xl text-white overflow-x-auto w-11/12">
          <div className="min-w-[600px] p-6">
            <div className="grid grid-cols-[150px_repeat(auto-fit,minmax(100px,1fr))] gap-4 text-center font-medium mb-4">
              <span></span>
              {computedLoans.map((loan) => (
                <span key={loan.id}>Loan {loan.id}</span>
              ))}
            </div>

            <Separator className="bg-white opacity-30 mb-4" />

            <div className="grid grid-cols-[150px_repeat(auto-fit,minmax(100px,1fr))] gap-4 text-center mb-2">
              <span>Monthly EMI</span>
              {computedLoans.map((loan) => (
                <span key={loan.id}>₹{loan.emi.toFixed(0)}</span>
              ))}
            </div>

            <div className="grid grid-cols-[150px_repeat(auto-fit,minmax(100px,1fr))] gap-4 text-center mb-2">
              <span>Total Interest</span>
              {computedLoans.map((loan) => (
                <span key={loan.id}>₹{loan.totalInterest.toFixed(0)}</span>
              ))}
            </div>

            <div className="grid grid-cols-[150px_repeat(auto-fit,minmax(100px,1fr))] gap-4 text-center">
              <span>Total Payable</span>
              {computedLoans.map((loan) => (
                <span key={loan.id}>₹{loan.totalPayment.toFixed(0)}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
