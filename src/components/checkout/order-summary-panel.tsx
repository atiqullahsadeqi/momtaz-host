"use client";

import { Server, Globe, Package, Cloud, Layers } from "lucide-react";

const TYPE_ICONS: Record<string, React.ElementType> = {
    dedicated: Server,
    vps: Layers,
    shared: Globe,
    cloud: Cloud,
};

function formatCurrency(val: number | string) {
    return `$${parseFloat(String(val)).toFixed(2)}`;
}

export function OrderSummaryPanel({ order }: { order: any }) {
    if (!order) return null;

    const Icon = (TYPE_ICONS[order.order_type] || Package) as React.ElementType;
    const total = parseFloat(order.total_monthly || 0) + parseFloat(order.setup_fee || 0);

    return (
        <div className="lg:sticky lg:top-8 space-y-6">
            <div>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium mb-1">Order Summary</p>
                <h1 className="text-3xl font-bold">{formatCurrency(total)}</h1>
                <p className="text-muted-foreground text-sm mt-1">Due today</p>
            </div>

            {/* Plan card */}
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                        {/* @ts-expect-error pre-existing type issue */}
                        <Icon className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                        <p className="font-semibold">{order.plan_name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{order.order_type} Hosting</p>
                    </div>
                </div>

                <div className="divide-y divide-border/60 text-sm">
                    <div className="flex justify-between py-2.5">
                        <span className="text-muted-foreground">Monthly fee</span>
                        <span className="font-medium">{formatCurrency(order.total_monthly)}</span>
                    </div>
                    {parseFloat(order.setup_fee) > 0 && (
                        <div className="flex justify-between py-2.5">
                            <span className="text-muted-foreground">One-time setup fee</span>
                            <span className="font-medium">{formatCurrency(order.setup_fee)}</span>
                        </div>
                    )}
                    {order.domain && (
                        <div className="flex justify-between py-2.5">
                            <span className="text-muted-foreground">Domain</span>
                            <span className="font-medium text-right max-w-[180px] truncate">{order.domain}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between pt-2 border-t border-border/60 font-semibold">
                    <span>Total due today</span>
                    <span className="text-brand-green">{formatCurrency(total)}</span>
                </div>
            </div>

            {/* Trust badges */}
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-2.5 text-sm text-muted-foreground">
                {["30-day money-back guarantee", "Cancel anytime, no lock-in contracts", "24/7 dedicated support"].map(t => (
                    <p key={t} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0 text-brand-green text-[10px]">✓</span>
                        {t}
                    </p>
                ))}
            </div>
        </div>
    );
}
