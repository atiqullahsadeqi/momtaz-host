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

    const Icon = TYPE_ICONS[order.order_type] || Package;
    const total = parseFloat(order.total_monthly || 0) + parseFloat(order.setup_fee || 0);

    return (
        <div className="lg:sticky lg:top-8 space-y-6">
            <div>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium mb-1">Order Summary</p>
                <h1 className="text-3xl font-bold">{formatCurrency(total)}</h1>
                <p className="text-muted-foreground text-sm mt-1">Due today</p>
            </div>

            {/* Plan card */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <p className="font-semibold">{order.plan_name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{order.order_type} Hosting</p>
                    </div>
                </div>

                <div className="divide-y divide-white/5 text-sm">
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

                <div className="flex justify-between pt-2 border-t border-white/8 font-semibold">
                    <span>Total due today</span>
                    <span className="text-indigo-400">{formatCurrency(total)}</span>
                </div>
            </div>

            {/* Trust badges */}
            <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> 30-day money-back guarantee
                </p>
                <p className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Cancel anytime, no lock-in contracts
                </p>
                <p className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> 24/7 dedicated support
                </p>
            </div>
        </div>
    );
}
