import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { Loader2, MailCheck } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const { error } = await authClient.requestPasswordReset({
                email,
                redirectTo: "/reset-password",
            })

            if (error) {
                toast.error(error.message || "Failed to send reset link.")
                return
            }

            setIsSent(true)
            toast.success("Reset link sent! Please check your email.")
        } catch (err) {
            toast.error("An unexpected error occurred.")
        } finally {
            setIsLoading(false)
        }
    }

    if (isSent) {
        return (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <MailCheck className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Check your email</CardTitle>
                        <CardDescription>
                            We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Button variant="outline" onClick={() => setIsSent(false)}>
                            Try another email
                        </Button>
                        <Link href="/login" className="text-center text-sm text-primary hover:underline font-medium">
                            Back to Sign In
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Forgot password?</CardTitle>
                    <CardDescription>
                        Enter your email and we'll send you a link to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending link...
                                        </>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </Button>
                                <div className="text-center text-sm mt-4">
                                    Remember your password? <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link>
                                </div>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
