import ApplicationLogo from "@/Components/ApplicationLogo";
import { Footer } from "@/Components/Footer";
import { Navbar } from "@/Components/Navbar";
import { Link } from "@inertiajs/react";
import { type ReactNode } from "react";

export default function WelcomeLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen bg-slate-100">
            <Navbar />
            <main className="pt-40 pb-20 bg-slate-100">{children}</main>
            <Footer />
        </div>
    );
}
