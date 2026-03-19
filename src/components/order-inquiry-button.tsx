"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, Send, X } from "lucide-react";

interface Props {
  product: string;
  details: Record<string, string | number | undefined>;
  label?: string;
  className?: string;
  disabled?: boolean;
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 bg-background border border-brand-green/30 shadow-lg rounded-xl px-5 py-3.5 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <CheckCircle className="h-5 w-5 text-brand-green shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="text-muted-foreground hover:text-foreground ml-2">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function OrderInquiryButton({ product, details, label, className, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const handleSend = async () => {
    if (!form.name || !form.email) { setError("Name and email are required"); return; }
    setSending(true); setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, product, details }),
      });
      if (!res.ok) throw new Error();
      setOpen(false);
      setForm({ name: "", email: "", phone: "", company: "" });
      setToast(true);
    } catch {
      setError("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const modal = open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => !sending && setOpen(false)}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-background border border-border/60 rounded-2xl w-full max-w-md p-6 shadow-xl animate-in zoom-in-95 fade-in duration-200" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>

        <h3 className="text-lg font-bold mb-1">Complete Your Inquiry</h3>
        <p className="text-xs text-muted-foreground mb-5">
          We&apos;ll send your <strong>{product}</strong> order details to our team. They&apos;ll get back to you within 24 hours.
        </p>
        <div className="flex flex-col gap-3">
          <Input placeholder="Full Name *" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <Input placeholder="Email Address *" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          <Input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
          <Input placeholder="Company (optional)" value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} />
        </div>

        {Object.keys(details).length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-muted/60 border border-border/60">
            <p className="text-[11px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Order Summary</p>
            {Object.entries(details).filter(([, v]) => v !== undefined && v !== "").map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs py-0.5">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-xs text-destructive mt-3">{error}</p>}

        <div className="flex gap-3 mt-5">
          <Button variant="outline" className="flex-1 rounded-full" onClick={() => setOpen(false)} disabled={sending}>
            Cancel
          </Button>
          <Button className="flex-1 rounded-full bg-brand-green hover:bg-brand-green/80 text-white" onClick={handleSend} disabled={sending}>
            {sending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending…</> : "Send Inquiry"}
          </Button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <Button
        className={className || "w-full h-12 text-base font-semibold rounded-full bg-brand-green hover:bg-brand-green/80 text-white"}
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        <Send className="w-4 h-4 mr-2" />
        {label || "Request Order"}
      </Button>

      {typeof window !== "undefined" && modal && createPortal(modal, document.body)}
      {typeof window !== "undefined" && toast && createPortal(
        <Toast message="Inquiry sent! Our team will contact you shortly." onClose={() => setToast(false)} />,
        document.body
      )}
    </>
  );
}
