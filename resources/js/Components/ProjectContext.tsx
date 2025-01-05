import { Project } from "@/types";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ProjectContextType {
    selectedProject: Project | null;
    selectProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    const selectProject = (project: Project) => {
        setSelectedProject(project);
    };

    return (
        <ProjectContext.Provider value={{ selectedProject, selectProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = (): ProjectContextType => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error(
            "useProjectContext must be used within a ProjectProvider"
        );
    }
    return context;
};
