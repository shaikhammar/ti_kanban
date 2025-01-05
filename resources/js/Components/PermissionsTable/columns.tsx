import { Permission } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
    MoreHorizontal,
    PencilIcon,
    Trash,
    Trash2,
    Trash2Icon,
} from "lucide-react";
import { Link, router, useForm } from "@inertiajs/react";
import Modal from "../Modal";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import InputError from "../InputError";
import SecondaryButton from "../SecondaryButton";
import DangerButton from "../DangerButton";
import { FormEventHandler, useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Permission>[] = [
    {
        id: "id",
        accessorKey: "id",
        header: "#",
    },
    {
        id: "name",
        accessorKey: "name",
        header: "Permission Name",
    },
    {
        id: "created_at",
        accessorKey: "created_at",
        header: "Created At",
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
            // const payment = row.original;
            const [
                confirmingPermissionDeletion,
                setConfirmingPermissionDeletion,
            ] = useState(false);
            const {
                data,
                setData,
                delete: destroy,
                processing,
                errors,
                clearErrors,
            } = useForm();

            const confirmPermissionDeletion = () => {
                setConfirmingPermissionDeletion(true);
            };

            const deletePermission: FormEventHandler = (e) => {
                e.preventDefault();

                destroy(route("permissions.destroy", row.getValue("id")), {
                    preserveScroll: true,
                    onSuccess: () => closeModal(),
                    onError: () => "Error",
                });
            };

            const closeModal = () => {
                setConfirmingPermissionDeletion(false);
            };

            return (
                <div className="flex flex-row gap-4">
                    <Button size="sm" asChild>
                        <Link
                            href={route("permissions.edit", [
                                row.getValue("id"),
                            ])}
                        >
                            <PencilIcon className="h-6 w-6" />
                        </Link>
                    </Button>
                    <Button
                        size="sm"
                        variant={"destructive"}
                        onClick={confirmPermissionDeletion}
                    >
                        <Trash2Icon className="h-6 w-6" />
                    </Button>
                    <Modal
                        show={confirmingPermissionDeletion}
                        onClose={closeModal}
                    >
                        <form onSubmit={deletePermission} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Are you sure you want to delete this permission?
                            </h2>
                            <div className="mt-6"></div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>
                                    Cancel
                                </SecondaryButton>

                                <DangerButton
                                    className="ms-3"
                                    disabled={processing}
                                >
                                    Delete Permission
                                </DangerButton>
                            </div>
                        </form>
                    </Modal>
                </div>
                // <DropdownMenu>
                //     <DropdownMenuTrigger asChild>
                //         <Button variant="ghost" className="h-8 w-8 p-0">
                //             <span className="sr-only">Open menu</span>
                //             <MoreHorizontal />
                //         </Button>
                //     </DropdownMenuTrigger>
                //     <DropdownMenuContent align="end">
                //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
                //         <DropdownMenuItem
                //             onClick={() =>
                //                 navigator.clipboard.writeText(row.id)
                //             }
                //         >
                //             Copy permission ID
                //         </DropdownMenuItem>
                //         <DropdownMenuSeparator />
                //         <DropdownMenuItem>View customer</DropdownMenuItem>
                //         <DropdownMenuItem>
                //             View payment details
                //         </DropdownMenuItem>
                //     </DropdownMenuContent>
                // </DropdownMenu>
            );
        },
    },
];
