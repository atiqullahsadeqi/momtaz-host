// The checkout page is a standalone full-screen page with its own header.
// It should NOT use the dashboard sidebar or the main site header.
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
