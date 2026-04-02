import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Download, Edit, FileText } from "lucide-react";
import type { TransactionRecord } from "@/types";

export interface TransactionDetailProps {
  transaction: TransactionRecord;
  onBack: () => void;
}

// Generate a mock transaction ID in the format shown in the design
function generateMockId(id: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const patterns = [4, 4, 3, 3];
  let charIndex = 0;

  for (let i = 0; i < patterns.length; i++) {
    if (i > 0) result += "-";
    for (let j = 0; j < patterns[i]; j++) {
      result += chars[(id + charIndex) % chars.length];
      charIndex++;
    }
  }
  return result;
}

// Generate a mock account ID
function generateMockAccountId(accountId: number): string {
  return `ACC_${99000 + accountId}_CORP_01`;
}

// Generate entity name from account ID
function generateEntityName(accountId: number): string {
  const entities = ["CloudStream Digital LLC", "Nexus Financial Services", "Apex Manufacturing Corp", "Vertex Solutions Inc", "Horizon Global Trade", "Stellar Enterprises", "Quantum Systems Ltd", "Prime Logistics Group", "Summit Tech Holdings", "Cascade Innovations"];
  return entities[accountId % entities.length] || "Global Enterprise Solutions";
}

// Generate tax category
function generateTaxCategory(id: number): string {
  const categories = ["Operational Expenses (CapEx)", "Software Licensing", "Professional Services", "Infrastructure Costs", "Marketing & Advertising", "Research & Development", "Employee Benefits", "Travel & Entertainment", "Office Supplies", "Cloud Services"];
  return categories[id % categories.length] || "General Expenses";
}

// Generate amount based on transaction ID
function generateAmount(id: number): string {
  const amounts = [14250.0, 8750.5, 23400.0, 5675.25, 125000.0, 8900.75, 45000.0, 1234.56, 98765.43, 3456.78];
  const amount = amounts[id % amounts.length] || 10000.0;
  return `-$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Generate date
function generateDate(id: number): string {
  const dates = ["Oct 24, 2024 • 14:32 UTC", "Oct 23, 2024 • 09:15 UTC", "Oct 22, 2024 • 16:45 UTC", "Oct 21, 2024 • 11:20 UTC", "Oct 20, 2024 • 13:55 UTC"];
  return dates[id % dates.length] || "Oct 24, 2024 • 14:32 UTC";
}

// Generate internal reference
function generateInternalRef(id: number): string {
  return `TXN-STREAM-2024-${String(id).padStart(3, "0")}-B`;
}

interface AuditStep {
  title: string;
  timestamp: string;
  description: string;
  status: "completed" | "pending";
}

function generateAuditTrail(id: number): AuditStep[] {
  return [
    {
      title: "Transaction Logged",
      timestamp: "Oct 24, 14:32",
      description: `Automatically ingested via Chase Bank API integration. Verified hash: 0x${id.toString(16)}f...a1c`,
      status: "completed",
    },
    {
      title: "Tax Mapping Applied",
      timestamp: "Oct 24, 14:33",
      description: 'Auto-categorized as "Software License" under Section 179 deduction criteria.',
      status: "completed",
    },
    {
      title: "Awaiting Final Reconciliation",
      timestamp: "Pending",
      description: "Required: Digital signature from Finance Director.",
      status: "pending",
    },
  ];
}

export function TransactionDetail({ transaction, onBack }: TransactionDetailProps) {
  const { transactionId, accountId, reference, description } = transaction;
  const containerRef = useRef<HTMLDivElement>(null);
  const [memo, setMemo] = useState("");

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const mockTxId = generateMockId(transactionId);
  const mockAccountId = generateMockAccountId(accountId);
  const entityName = generateEntityName(accountId);
  const taxCategory = generateTaxCategory(transactionId);
  const amount = generateAmount(transactionId);
  const dateStr = generateDate(transactionId);
  const internalRef = generateInternalRef(transactionId);
  const auditTrail = generateAuditTrail(transactionId);
  const budgetUsage = ((transactionId * 13) % 85) + 10;

  return (
    <div ref={containerRef} tabIndex={-1} className="min-h-screen bg-(--ts-surface) focus:outline-none">
      <div className="px-6 md:px-12 lg:px-24 pt-8 pb-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="group flex items-center gap-2 text-(--ts-primary) font-semibold transition-all active:scale-95 hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold tracking-tight">Back to Transactions</span>
          </button>
          <div className="flex gap-3">
            <Button variant="outline" className="h-10 gap-2 border-(--ts-outline-variant) text-(--ts-secondary) bg-(--ts-surface-container-highest) hover:bg-(--ts-surface-dim)">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button className="h-10 gap-2 bg-(--ts-primary) hover:bg-(--ts-primary-container) text-white shadow-lg shadow-(--ts-primary)/20">
              <Edit className="h-4 w-4" />
              Reconcile
            </Button>
          </div>
        </div>
      </div>

      <main className="px-6 md:px-12 lg:px-24 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-xl p-8 shadow-sm border border-(--ts-surface-container-high)">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-(--ts-primary-light) text-(--ts-primary) text-xs font-bold uppercase tracking-wider mb-3">Verified Transaction</span>
                  <h1 className="text-3xl font-bold text-(--ts-neutral) tracking-tight leading-tight">{reference}</h1>
                  <p className="text-(--ts-secondary) mt-2 font-medium">Internal Reference: {internalRef}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-(--ts-neutral) tracking-tighter">{amount}</p>
                  <p className="text-(--ts-secondary) text-sm mt-1">{dateStr}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8 py-8 bg-(--ts-surface) rounded-xl px-8">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.05em] font-bold text-(--ts-secondary)">Transaction ID</p>
                  <p className="text-(--ts-neutral) font-semibold">{mockTxId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.05em] font-bold text-(--ts-secondary)">Account ID</p>
                  <p className="text-(--ts-neutral) font-semibold">{mockAccountId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.05em] font-bold text-(--ts-secondary)">Entity</p>
                  <p className="text-(--ts-neutral) font-semibold">{entityName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.05em] font-bold text-(--ts-secondary)">Tax Category</p>
                  <p className="text-(--ts-neutral) font-semibold">{taxCategory}</p>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <h3 className="text-lg font-bold text-(--ts-neutral)">Complete Reference Description</h3>
                <p className="text-(--ts-secondary) leading-relaxed">{description}</p>
                <p className="text-(--ts-secondary) leading-relaxed">The allocation of this expense is split across the Engineering (70%) and Operations (30%) cost centers. No VAT was applied to this specific invoice as per the cross-border digital services agreement current for the region.</p>
              </div>
            </section>

            <section className="bg-(--ts-surface) rounded-xl p-8 border border-(--ts-surface-container-high)">
              <h3 className="text-lg font-bold text-(--ts-neutral) mb-8">System Audit Trail</h3>
              <div className="space-y-0">
                {auditTrail.map((step, index) => (
                  <div key={index} className="flex gap-6 pb-8 last:pb-0 group">
                    <div className="relative flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ring-4 mt-1 z-10 ${step.status === "completed" ? "bg-(--ts-primary) ring-(--ts-primary-light)" : "bg-(--ts-secondary) ring-(--ts-surface)"}`} />
                      {index < auditTrail.length - 1 && <div className="w-[2px] h-full bg-(--ts-outline-variant)/20 absolute top-5" />}
                    </div>
                    <div className="flex-1 -mt-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className={`text-sm font-bold ${step.status === "completed" ? "text-(--ts-neutral)" : "text-(--ts-secondary)"}`}>{step.title}</h4>
                        <span className="text-[11px] text-(--ts-secondary) font-medium">{step.timestamp}</span>
                      </div>
                      <p className={`text-xs ${step.status === "completed" ? "text-(--ts-secondary)" : "text-(--ts-secondary) italic"}`}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-(--ts-surface-container-high)">
              <div className="p-6">
                <h4 className="text-sm font-bold text-(--ts-neutral) mb-4">Original Document</h4>
                <div className="aspect-3/4 rounded-lg bg-(--ts-surface-container-high) flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-(--ts-outline-variant)/30 group cursor-pointer hover:bg-(--ts-surface-container-highest) transition-colors">
                  <FileText className="h-12 w-12 text-(--ts-secondary) mb-2" />
                  <p className="text-sm font-medium text-(--ts-secondary)">View INVOICE_{transactionId}.pdf</p>
                  <p className="text-[10px] text-(--ts-secondary) mt-1">4.2 MB • Scanned Oct 24</p>
                </div>
              </div>
              <div className="px-6 py-4 bg-(--ts-surface) flex justify-between items-center">
                <span className="text-xs font-bold text-(--ts-secondary)">ATTACHED BY SYSTEM</span>
                <button className="text-(--ts-primary) text-xs font-bold hover:underline">REPLACE</button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-(--ts-surface-container-high)">
              <h4 className="text-sm font-bold text-(--ts-neutral) mb-4">Ledger Impact</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-(--ts-secondary)">Budget Period</span>
                  <span className="text-xs font-bold text-(--ts-neutral)">FY 2024 / Q4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-(--ts-secondary)">Category Limit</span>
                  <span className="text-xs font-bold text-(--ts-neutral)">$500,000.00</span>
                </div>
                <div className="w-full h-1.5 bg-(--ts-surface-container) rounded-full overflow-hidden">
                  <div className="h-full bg-(--ts-primary) rounded-full" style={{ width: `${budgetUsage}%` }} />
                </div>
                <p className="text-[10px] text-(--ts-secondary) leading-tight italic">This transaction represents {(budgetUsage / 20).toFixed(2)}% of your remaining quarterly allocation for Digital Infrastructure.</p>
              </div>
            </div>

            <div className="bg-(--ts-primary-light) rounded-xl p-6">
              <h4 className="text-sm font-bold text-(--ts-primary) mb-4">Quick Reconciliation</h4>
              <div className="space-y-3">
                <label className="block">
                  <span className="text-[10px] uppercase font-bold text-(--ts-primary) mb-1 block">Add Memo</span>
                  <Input value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Internal note..." className="w-full bg-white/50 border-none rounded-lg text-sm p-3 focus:ring-2 focus:ring-(--ts-primary) placeholder:text-(--ts-secondary)/50" />
                </label>
                <Button className="w-full bg-(--ts-primary) hover:bg-(--ts-primary-container) text-white py-3 rounded-lg font-bold text-sm shadow-md active:scale-95 transition-transform">Submit Approval</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
