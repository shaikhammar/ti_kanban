import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Permission } from "@/types";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<Permission>({
        id: 0,
        name: "",
        created_at: new Date().toISOString(),
    });
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post("/permissions");
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        New Permissions
                    </h2>
                    <Button size="sm" asChild>
                        <Link href={route("permissions.index")}>Back</Link>
                    </Button>
                </div>
            }
        >
            <Head title="Permissions" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col justify-between">
                                    <label
                                        htmlFor="name"
                                        className="text-md font-medium"
                                    >
                                        Name
                                    </label>
                                    <div className="my-3">
                                        <Input
                                            type="text"
                                            placeholder="Permission Name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        />
                                    </div>
                                    <p className="text-red-600 text-sm">
                                        {errors.name}
                                    </p>
                                    <Button
                                        type="submit"
                                        className="mt-4 px-5 py-4 w-20"
                                        disabled={processing}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
