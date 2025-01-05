import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useFlash } from "@/hooks/use-flash";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/PermissionsTable/data-table";
import { columns } from "@/Components/PermissionsTable/columns";
import { PageProps, Permission } from "@/types";

export default function Index() {
    useFlash();
    type permissionsPageProps = PageProps<{
        permissions: {
            data: Permission[];
            links: {
                next: string;
                prev: string;
            };
            meta: {
                current_page: number;
                first_page_url: string;
                from: number;
                last_page: number;
                last_page_url: string;
                next_page_url: string;
                path: string;
                per_page: number;
                prev_page_url: string;
                to: number;
                total: number;
            };
        };
    }>;

    const { permissions } = usePage<permissionsPageProps>().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Permissions
                    </h2>
                    <Button size="sm" asChild>
                        <Link href={route("permissions.create")}>Create</Link>
                    </Button>
                </div>
            }
        >
            <Head title="Permissions" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <DataTable
                                data={permissions.data}
                                columns={columns}
                                pageCount={permissions.meta.last_page}
                                paginationState={{
                                    pageIndex:
                                        permissions.meta.current_page - 1,
                                    pageSize: permissions.meta.per_page,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
