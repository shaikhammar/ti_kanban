import KanbanBoard from "@/Components/KanbanBoard";
import { useProjectContext } from "@/Components/ProjectContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <KanbanBoard />
                {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
                {/* {projects.map((project) => (
                    <div
                        key={project.id}
                        className="aspect-video rounded-xl bg-muted/50"
                    >
                        {project.columns.length}
                    </div>
                ))} */}
            </div>
        </AuthenticatedLayout>
    );
}
