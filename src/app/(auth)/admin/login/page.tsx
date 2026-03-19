"use client"

import { LoginForm } from "@/components/login-form"
import { ShieldAlert } from "lucide-react"

export default function AdminLoginPage() {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 text-foreground">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className="flex flex-col items-center gap-2 self-center font-medium">
                    <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl border border-primary/20">
                        <ShieldAlert className="size-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground mt-2">Momtaz Host Admin</span>
                </div>
                {/* Admin domain login automatically redirects to / meaning the admin dashboard root */}
                <LoginForm
                    isAdminMode={true}
                    callbackUrl="/admin"
                />
            </div>
        </div>
    )
}
