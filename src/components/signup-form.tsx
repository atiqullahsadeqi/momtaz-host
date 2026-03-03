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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Mail, RefreshCcw } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [organization, setOrganization] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [resendCountdown])

  const handleResendEmail = async () => {
    if (resendCountdown > 0 || isResending) return

    setIsResending(true)
    try {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: "/dashboard",
      })

      if (error) {
        toast.error(error.message || "Failed to resend verification email.")
        return
      }

      toast.success("Verification email resent!")
      setResendCountdown(60)
    } catch (err) {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsResending(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }

    setIsLoading(true)

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (authClient.signUp.email as any)({
        email,
        password,
        name,
        phoneNumber, // Custom field
        organization, // Custom field
        callbackURL: "/dashboard",
      })

      if (error) {
        toast.error(error.message || "Failed to create account.")
        return
      }

      setIsEmailSent(true)
      toast.success("Account created! Please check your email to verify.")
    } catch (err) {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Verify your email</CardTitle>
            <CardDescription>
              We've sent a verification link to <span className="font-medium text-foreground">{email}</span>.
              Please click the link in the email to activate your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResendEmail}
              disabled={resendCountdown > 0 || isResending}
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : resendCountdown > 0 ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Resend in {resendCountdown}s
                </>
              ) : (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Didn't receive email? Resend
                </>
              )}
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setIsEmailSent(false)}>
              Back to Sign Up
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-2">
              Check your spam folder if you don't see it in your inbox.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>
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
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+93..."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="org">Organization Name</FieldLabel>
                  <Input
                    id="org"
                    type="text"
                    placeholder="Compnay Name Ltd"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    required
                  />
                </Field>
              </Field>
              <Field className="grid grid-cols-2 gap-4 border-t border-border/10 pt-4 mt-2">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Field>
              </Field>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              <Field>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
