import { Link } from "@inertiajs/react";
import { SVGAttributes } from "react";

export default function Logo(props: SVGAttributes<SVGElement>) {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <img src="/logo.svg" alt="Taskify Logo" className="w-14 h-14" />
                <p className="font-calsans text-xl text-neutral-700 pb-1">
                    Taskify
                </p>
            </div>
        </Link>
    );
}
