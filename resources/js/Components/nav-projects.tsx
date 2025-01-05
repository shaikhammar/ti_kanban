import {
    Folder,
    Forward,
    MoreHorizontal,
    Trash2,
    type LucideIcon,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { Project } from "@/types";
import { useProjectContext } from "./ProjectContext";

export function NavProjects() {
    const projects: Project[] = usePage().props.projects as Project[];
    const { selectProject } = useProjectContext();
    // console.log(projects);
    const { isMobile } = useSidebar();
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map((project) => (
                    <SidebarMenuItem key={project.title}>
                        <SidebarMenuButton asChild>
                            {/* <a href={item.url}>
                                <item.icon /> */}
                            <span
                                onClick={() => selectProject(project)}
                                className="h-auto"
                            >
                                {project.title}
                            </span>
                            {/* </a> */}
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-48 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem>
                                    <Folder className="text-muted-foreground" />
                                    <span>View Project</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Forward className="text-muted-foreground" />
                                    <span>Share Project</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Trash2 className="text-muted-foreground" />
                                    <span>Delete Project</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
                {/* <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <MoreHorizontal className="text-sidebar-foreground/70" />
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem> */}
            </SidebarMenu>
        </SidebarGroup>
    );
}
