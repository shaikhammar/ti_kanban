import { Link } from "@inertiajs/react";
import Logo from "./Logo";
import { Button } from "./ui/button";

export function Footer() {
    return (
        <div className="fixed bottom-0 w-full px-4 border-t bg-slate-100">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size="sm" variant="link">
                        <Link href="/">Privacy Policy</Link>
                    </Button>
                    <Button size="sm" variant="link">
                        <Link href="/">Terms of Service</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
