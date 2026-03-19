"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Globe, ShieldCheck, Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Here is what&apos;s happening with your services today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Servers", value: "0", icon: Server, color: "text-blue-400" },
          { title: "Active Domains", value: "0", icon: Globe, color: "text-emerald-400" },
          { title: "Security Status", value: "Locked", icon: ShieldCheck, color: "text-purple-400" },
          { title: "Uptime", value: "100%", icon: Activity, color: "text-orange-400" },
        ].map((stat) => (
          <Card key={stat.title} className="border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions across the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed border-border">
              <span className="text-sm text-muted-foreground italic text-center px-8">
                No recent activity. Start by deploying a server or registering a domain.
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>Critical updates regarding your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10 flex items-start gap-3">
                <div className="bg-blue-500/10 p-2 rounded">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium italic">Complete your profile</p>
                  <p className="text-xs text-muted-foreground">Add your billing details to facilitate automated invoicing via our Laravel channel.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
