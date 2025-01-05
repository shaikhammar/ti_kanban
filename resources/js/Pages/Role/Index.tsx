import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useFlash } from "@/hooks/use-flash";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/RolesTable/data-table";
import { columns } from "@/Components/RolesTable/columns";
import { PageProps, Role } from "@/types";

export default function Index() {
    useFlash();
    type rolesPageProps = PageProps<{
        roles: {
            data: Role[];
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

    const { roles } = usePage<rolesPageProps>().props;

    console.log(roles);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Roles
                    </h2>
                    <Button size="sm" asChild>
                        <Link href={route("roles.create")}>Create</Link>
                    </Button>
                </div>
            }
        >
            <Head title="Roles" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <DataTable
                                data={roles.data}
                                columns={columns}
                                pageCount={roles.meta.last_page}
                                paginationState={{
                                    pageIndex: roles.meta.current_page - 1,
                                    pageSize: roles.meta.per_page,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
