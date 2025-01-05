import { Medal } from "lucide-react";
import { ReactNode } from "react";

import { Button } from "@/Components/ui/button";

import WelcomeLayout from "@/Layouts/WelcomeLayout";
import { Head, Link } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex items-center justify-center flex-col">
                <div className="font-calsans flex items-center justify-center flex-col">
                    <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
                        <Medal className="h-6 w-6 mr-2" />
                        No 1 Task management
                    </div>
                    <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
                        Taskify helps teams move
                    </h1>
                    <div
                        className="text-3xl md:text-6xl bg-gradient-to-r 
                    from-fuchsia-600 to-pink-600 text-white 
                    px-4 p-2 rounded-md pb-4 w-fit"
                    >
                        work forward.
                    </div>
                </div>
                <div className="font-poppins text-sm md:text-xl text-neutral-400 mt-4 max-w-xl md:max-w-2xl text-center mx-auto">
                    Collaborate, manage projects, and reach new productivity
                    peaks. From high rises to home offices, the way your team
                    works is unique - accomplish it all with Taskify.
                </div>
                <Button variant="default" className="mt-6" size="lg" asChild>
                    <Link href="/register">Get Taskify for free</Link>
                </Button>
            </div>
        </>
    );
}

Welcome.layout = (page: ReactNode) => <WelcomeLayout>{page}</WelcomeLayout>;
