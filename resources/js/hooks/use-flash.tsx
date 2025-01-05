import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { User } from "@/types";

type FlashMessage = {
    success?: string;
    error?: string;
    info?: string;
};

type PageProps = {
    auth: {
        user: User;
    };
    flash?: FlashMessage;
};

export const useFlash = () => {
    const { flash } = usePage<PageProps>().props; // TypeScript support for `flash`
    const [hasShownFlash, setHasShownFlash] = useState(false);

    useEffect(() => {
        if (flash && Object.values(flash).some((message) => message)) {
            setHasShownFlash(false); // Reset when flash changes
        }
    }, [flash]);

    useEffect(() => {
        if (!hasShownFlash) {
            if (flash?.success) {
                toast.success(flash.success);
            }
            if (flash?.error) {
                toast.error(flash.error);
            }
            if (flash?.info) {
                toast(flash.info);
            }

            setHasShownFlash(true); // Mark flash messages as shown
        }
    }, [flash, hasShownFlash]);

    return null; // This hook doesn't return any UI
};
