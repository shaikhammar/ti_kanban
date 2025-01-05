import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { PageProps, Permission, Role } from "@/types";
import { FormEventHandler } from "react";
import { Autocomplete, TextField } from "@mui/material";

type rolesEditPageProps = PageProps<{
    role: Role;
    hasPermissions: Permission[];
    permissions: { data: Permission[] };
}>;

export default function Edit() {
    const { role, hasPermissions, permissions } =
        usePage<rolesEditPageProps>().props;
    console.log(role);
    const { data, setData, patch, processing, errors } = useForm<Role>({
        id: role.id,
        name: role.name,
        permissions: hasPermissions,
        created_at: role.created_at,
    });
    // console.log(rolew);
    const handleSubmit: FormEventHandler = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        patch(route("roles.update", role.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        New Roles
                    </h2>
                    <Button size="sm" asChild>
                        <Link href={route("roles.index")}>Back</Link>
                    </Button>
                </div>
            }
        >
            <Head title="Roles" />
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
                                            placeholder="Role Name"
                                            name="name"
                                            defaultValue={role.name}
                                            value={data.name}
                                            onChange={(e) => {
                                                console.log(e.target.value),
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    );
                                            }}
                                            className="w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        />
                                    </div>
                                    <p className="text-red-600 text-sm">
                                        {errors.name}
                                    </p>
                                    <Autocomplete
                                        disablePortal
                                        multiple
                                        id="tags-standard"
                                        options={permissions.data}
                                        getOptionLabel={(option) => option.name}
                                        sx={{ width: 300 }}
                                        defaultValue={permissions.data}
                                        value={data.permissions}
                                        onChange={(event, newValue) => {
                                            setData("permissions", newValue);
                                            // console.log(event, newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Permissions"
                                            />
                                        )}
                                    />
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
