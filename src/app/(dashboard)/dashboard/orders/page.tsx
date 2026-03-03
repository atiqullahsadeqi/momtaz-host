"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Server, Package, CheckCircle2, Clock, XCircle, Ban,
    ChevronLeft, CalendarDays, Globe, Cpu, Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
    id: string;
    order_type: "dedicated" | "vps" | "shared";
    status: string;
    plan_id: string;
    plan_name: string;
    configuration: Record<string, unknown>;
    domain: string | null;
    domain_type: string | null;
    total_monthly: string;
    setup_fee: string;
    admin_notes: string | null;
    created_at: string;
}

const STATUS_CONFIG: Record<string, { label: string; icon: any; color: string }> = {
    pending: { label: "Pending Review", icon: Clock, color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
    approved: { label: "Approved", icon: CheckCircle2, color: "bg-green-500/10 text-green-400 border-green-500/20" },
    rejected: { label: "Rejected", icon: XCircle, color: "bg-red-500/10 text-red-400 border-red-500/20" },
    cancelled: { label: "Cancelled", icon: Ban, color: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
    pending_payment: { label: "Pending Payment", icon: Clock, color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    processing: { label: "Processing", icon: Loader2, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    active: { label: "Active", icon: CheckCircle2, color: "bg-green-600/10 text-green-500 border-green-600/20" },
    suspended: { label: "Suspended", icon: Ban, color: "bg-yellow-700/10 text-yellow-600 border-yellow-700/20" },
};

const TYPE_CONFIG = {
    dedicated: { label: "Dedicated Server", icon: Server },
    vps: { label: "VPS", icon: Cpu },
    shared: { label: "Shared Hosting", icon: Globe },
};

function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_CONFIG[status] ?? { label: status, icon: Clock, color: "bg-muted/10 text-muted-foreground border-border" };
    const Icon = cfg.icon;
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${cfg.color}`}>
            <Icon className="w-3.5 h-3.5" />
            {cfg.label}
        </span>
    );
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/orders")
            .then(r => r.json())
            .then(data => {
                if (data.success) setOrders(data.orders);
                else if (data.error === "Unauthorized") router.push("/login?callbackURL=/dashboard/orders");
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [router]);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">My Orders</h1>
                    <p className="text-sm text-muted-foreground">Track and manage your orders</p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-24 gap-3 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading orders…</span>
                </div>
            ) : orders.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-20 text-center gap-4">
                        <Package className="w-12 h-12 text-muted-foreground/40" />
                        <div>
                            <p className="font-semibold text-lg">No orders yet</p>
                            <p className="text-sm text-muted-foreground mt-1">Browse our hosting plans to get started.</p>
                        </div>
                        <Button asChild className="mt-2">
                            <Link href="/hosting/dedicated">Browse Plans</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => {
                        const typeCfg = TYPE_CONFIG[order.order_type];
                        const TypeIcon = typeCfg.icon;
                        return (
                            <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
                                <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between gap-4 flex-wrap">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                                    <TypeIcon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{order.plan_name}</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-xs text-muted-foreground">{typeCfg.label}</span>
                                                        {order.domain && (
                                                            <>
                                                                <span className="text-muted-foreground/40">•</span>
                                                                <span className="text-xs text-muted-foreground">{order.domain}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-sm font-semibold">${parseFloat(order.total_monthly).toFixed(2)}/mo</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <CalendarDays className="w-3 h-3" />
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <StatusBadge status={order.status} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
