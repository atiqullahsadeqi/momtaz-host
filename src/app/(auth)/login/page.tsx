import { LoginForm } from "@/components/login-form";
import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="text-2xl font-bold text-primary">
          <Image
            src="/images/logo.png"
            alt="Momtaz Host Logo"
            width={60}
            height={60}
          />
        </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
        src="https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Image"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          fill
        />
      </div>
    </div>
  )
}
